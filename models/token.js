import config from '../utils/config.js'

export default {
  get(name = 'access_token') {
    let token = localStorage.getItem(name)
    if (token) {
      let info = JSON.parse(token)
      if (info.exp > new Date().getTime()) return info.val
      else this.delete(name)
    }
    return ''
  },

  set(data) {
    localStorage.setItem('access_token', JSON.stringify({
      val: data.access_token,
      exp: new Date().getTime() + data.expire_in * 1000
    }))
    localStorage.setItem('refresh_token', JSON.stringify({
      val: data.refresh_token,
      exp: new Date().getTime() + data.expire_in * 10000
    }))
  },

  delete(name) {
    if (name) localStorage.removeItem(name)
    else {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

  refresh() {
    return new Promise((resolve, reject) => {
      let token = this.get('refresh_token')
      if (!token) reject()
      $.ajax({
        url: config.baseUrl + '/refresh',
        type: 'POST',
        beforeSend: XMLHttpRequest => XMLHttpRequest.setRequestHeader('token', token),
        data: { is_admin: true },
        success: res => {
          this.set(res.data)
          resolve()
        },
        error: err => {
          if (err.status == 401) {
            this.delete()
            reject()
          }
          else console.log(err)
        }
      })
    })
  }
}

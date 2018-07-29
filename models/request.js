import config from '../utils/config.js'
import token from './token.js'

export default class Request {
  constructor() {
    this.baseRequestUrl = config.baseUrl
    this.token = token
  }

  get(url, data) {
    return this.request('GET', url, data)
  }

  post(url, data) {
    return this.request('POST', url, data)
  }

  put(url, data) {
    return this.request('PUT', url, data)
  }

  delete(url, data) {
    return this.request('DELETE', url, data)
  }

  request(method, url, data, onRefresh = false) {
    layer.load()
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.baseRequestUrl + url,
        type: method,
        data: data,
        beforeSend: XMLHttpRequest => XMLHttpRequest.setRequestHeader('token', this.token.get()),
        success: res => res ? resolve(res.data) : (layer.msg('删除成功') && resolve()),
        error: err => {
          if (err.status == 401) {
            onRefresh
              ? window.location.href = '/login.html'
              : this.token.refresh().then(
                _ => resolve(this.request(method, url, data, true)),
                _ => window.location.href = '/login.html'
              )
          } else {
            layer.msg(err.responseJSON && typeof err.responseJSON.message === 'string' ? err.responseJSON.message : '请求失败，请重试')
            console.log(err.responseJSON || err)
            reject(err.responseJSON || err)
          }
        },
        complete: _ => layer.closeAll('loading')
      })
    })
  }
}

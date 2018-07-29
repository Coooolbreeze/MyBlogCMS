import Request from './request.js'

class Model extends Request {
  constructor() {
    super()
  }

  login(username, password) {
    return this.post('/login', { username, password, is_admin: true })
  }

  getTags() {
    return this.get('/tags?limit=100')
  }

  storeTag(data) {
    return this.post('/tags', data)
  }

  updateTag(id, data) {
    return this.put(`/tags/${id}`, data)
  }

  delTag(id) {
    return this.delete(`/tags/${id}`)
  }

  getPost(id) {
    return this.get(`/posts/${id}`)
  }

  storePost(data) {
    return this.post('/posts', data)
  }

  updatePost(id, data) {
    return this.put(`/posts/${id}`, data)
  }

  delPost(id) {
    return this.delete(`/posts/${id}`)
  }
}

export default new Model()

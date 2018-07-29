import util from '../utils/util.js'
import model from '../models/model.js'
window.util = util
window.model = model

model.token.get() || (window.location.href = '/login.html')

layui.use(['element', 'layer'], function () {
  const element = layui.element

  $('#logout').on('click', _ => {
    model.token.delete()
    window.location.href = '/login.html'
  })

  util.loadLocalHtml('/posts.html', '.layui-body')

  $('#posts').on('click', _ => util.loadLocalHtml('/posts.html', '.layui-body'))
  $('#tags').on('click', _ => util.loadLocalHtml('/tags.html', '.layui-body'))
})

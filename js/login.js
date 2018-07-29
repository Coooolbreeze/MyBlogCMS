import model from '../models/model.js'

layui.use(['layer'], function () {
  const $username = $('#username')
  const $password = $('#password')

  $username.on('input', function () { $(this).next().hide() })
  $password.on('input', function () { $(this).next().hide() })
  $password.on('keyup', event => event.keyCode == 13 && $('#login').trigger('click'))

  $('#login').on('click', function () {
    if (!$username.val()) return $username.next().show().find('div').text('请输入用户名')
    if (!$password.val()) return $password.next().show().find('div').text('请输入密码')

    model.login($username.val(), $password.val()).then(res => {
      model.token.set(res)
      window.location.href = '/index.html'
    }).catch(err => {
      if (err.error_code == 20000) return $username.next().show().find('div').text('该用户不存在')
      if (err.error_code == 20001) return $password.next().show().find('div').text('密码错误')
      $('.error-tips').show().delay(20000).hide(0)
    })
  })
})

export default {
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },

  getHashPage(page) {
    let hash = window.location.hash.substring(1)
    if (hash && hash.match(/!(\S*)=/)[1] === page) return hash.match(/=(\S*)/)[1]
    else return 1
  },

  removeHash() {
    window.location.hash = ''
  },

  loadLocalHtml(url, element) {
    $.ajax({
      url: url,
      type: 'GET',
      success: res => $(element).html(res),
      error: err => console.log(err)
    });
  },

  strToTimestamp(str) {
    str = str.replace(/-/g, '/')
    let date = new Date(str)
    let time = date.getTime()
    return time
  },

  getRandChar(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },

  getNowFormatDate(separator = '-') {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) month = "0" + month
    if (strDate >= 0 && strDate <= 9) strDate = "0" + strDate
    return year + separator + month + separator + strDate
  },

  getBeforeTime(minutes, separator = ':') {
    let date = new Date()
    date.setMinutes(date.getMinutes() + minutes)
    let now =
      (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) + separator +
      (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) + separator +
      (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds())
    return now
  },

  inArray: function (value, array) {
    for (let item in array) {
      if (value === array[item]) return true
    }
    return false
  }
}

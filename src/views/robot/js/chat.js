$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  $('#btnSend').on('click', function () {
    const text = $('#ipt').val().trim()
    if (text.length <= 0) return $('#ipt').val('')
    else {
      $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
      $('#ipt').val('')
      resetui()
      getMsg(text)
    }
  })

  function getMsg(text) {
    $.ajax({
      type: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        if (res.message == 'success') {
          const msg = res.data.info.text
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
          resetui()
          getVoice(msg)
        }
      }
    })
  }
  // 文字转换成语音
  function getVoice(msg) {
    $.ajax({
      type: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: msg
      },
      success: function (res) {
        if (res.status == 200) {
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  // 为文本框绑定keyup事件
  $('#ipt').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#btnSend').click()
    }
  })
})

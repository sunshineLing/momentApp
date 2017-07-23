
var path = require('path')
var express = require('express')

var axios = require('axios')

var app = express()

// 设置代理请求
var apiRoutes = express.Router()

// 2.0 请求歌词数据
apiRoutes.get('/login', function (req, res) {
  var url = 'https://api.gugujiankong.com/account/Login?'

  axios.get(url, {
    params: req.query
  }).then((response) => {
    var ret = response.data
    console.log(ret)
    if (typeof ret === 'string') {
      // 单词开头，一个或多个,括号，需要转义,以括号结束，中间分组不为()的这些字符一个或多个
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      // 如果可以匹配到，就将匹配到的字符串转化为对象
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})



// 使用
app.use('/api', apiRoutes)

app.listen(8100,'127.0.0.1')



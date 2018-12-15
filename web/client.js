var http = require('http')

var req = http.request({
  host: '127.0.0.1',
  port: '7000',
  path: '/index.html'
}, function(res) {
  var body = ''

  res.on('data', function(data) {
    body += data;
  })
  res.on('end', function(){
    console.log('end....', body)
  })
})

req.end()
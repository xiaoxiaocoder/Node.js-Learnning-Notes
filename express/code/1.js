var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('Hello world')
})

var server = app.listen(8081, function(){
  var address = server.address()

  console.log('server running at http://%s:%s', address.address, address.port)
})
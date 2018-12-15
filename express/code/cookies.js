var express = require('express')
var cookieParser = require('cookie-parser')
var util = require('util')

var app = express()
app.use(cookieParser())

app.get('/', function(req, res){
  res.end(util.inspect(req.cookies))
})
app.listen(8081)
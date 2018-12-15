var express = require('express')
var app = express()
var fs = require('fs')

var bodyParser = require('body-parser')
var multer = require('multer')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({dest: '/tmp/'}).array('image'))

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/' + 'index.html')
})

app.post('/upload_file', function(req, res) {
  console.log(req.files[0])

  var des_file = __dirname + '/' + req.files[0].originalname;
  fs.readFile(req.files[0].path, function(err, data) {
    fs.writeFile(des_file, data, function(err) {
      if(err) {
        console.error(err)
      } else {
        res.end(JSON.stringify({
          message: 'File upload successfully',
          filename: req.files[0].originalname
        }))
      }
    })
  })
})

var server = app.listen(8081, function(){
  var { address, port } = server.address()
  console.log('server running at http://%s:%s', address, port)
})
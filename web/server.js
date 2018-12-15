var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname

  console.log('request for '+ pathname + ' received.')

  fs.readFile(pathname.substr(1), function(err, data){
    if(err) {
      // console.error(err)
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.write('Not Found!')
    } else {
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(data.toString())
    }
    res.end()
  })
}).listen(7000)

console.log('server running at http://127.0.0.1:7000')
# Node.js Web模块

## Web 应用架构

![web应用架构](./img/web_architecture.jpg)

- client  客户端, 一般指浏览器, 浏览器可以通过HTTP协议向服务器请求数据.
- Server  服务端, 一般指Web服务器, 可以接收客户端请求, 并向客户端发送响应数据.
- Business  业务层, 通过Web服务器处理应用程序, 如遇数据库交互, 逻辑运算, 调用外部程序等.
- Data  数据层, 一般由数据库组成.

### 使用Node创建Web服务器

server.js

```js
var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname

  console.log('request for '+ pathname + 'received.')

  fs.readFile(pathname.substr(1), function(err, data) {
    if(err) {
      console.error(err)
      res.writeHead(404, {'Content-Type': 'text/html'})
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data.toString())
    }
    res.end()
  })
}).listen(8080)

console.log('server running at http://127.0.0.1:8080')
```

### 使用Node创建Web客户端

client.js

```js
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
    console.log('end......', body)
  })
})

req.end()
```
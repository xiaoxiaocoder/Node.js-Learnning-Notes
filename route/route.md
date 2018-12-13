# Node.js 路由

需要为路由提供请求的URL和其他需要的GET及POST参数, 随后路由需要根据这些数据来执行相应的代码.

因此, 我们需要查看HTTP请求, 从中提取出请求的URL以及GET/POST参数. 

我们需要的所有数据都会包含在request对象中, 该对象作为onRequest() 回调函数的第一个参数传递, 但是为了解析这些数据, 我们需要额外的Node.js模块, 分别是url和querystring模块.

```js
var url = "http://localhost:8080/start?foo=bar&hello=world"

url.parse(url).pathname //  /start
url.parse(url).query  // foo=bar&hello-world
querystring.parse(url.parse(url).query) //  {foo:bar, hello: world}
```

```js
// router.js
fcuntion route(pathname) {
  console.log('About to reoute a request for:' + pathname)
}

exports.route = route
```

```js
// server.js
var http = require('http')
var url = require('url')

function start(route){
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname
    console.log(`Request for ${pathname} received.`)

    route(pathname)
    
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('Hello world')
    res.end()
  }

  http.createServer(onRequest).listen(8000)
}

exports.start = start;
```

```js
// index.js

var server = require('./server')
var router = require('./router')

server.start(router.route)
```
# Node.js GET/POST请求

显示网络资源, 表单提交等

## 获取GET请求内容

GET请求直接被嵌入在路径中, URL是完整的请求路径, 包含了?后面的部分, 因此可以手动解析后面的内容作为GET请求的参数.

node.js中url模块的parse函数提供了该功能.

```js
var http = require('http')
var url = require('url')
var util = require('util')

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
  res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000)
```

## 获取URL参数

可以使用url.parse来解析URL中的参数.

## 获取POST请求内容

POST请求的内容全部都在请求体重, http.serverRequest并没有一个属性内容为请求体, 原因是等待请求体穿肚可能是一件耗时的工作. 如:上传文件, 而且很多时候我们可能并不需要例会请求体的内容, 恶意的POST请求会大大消耗服务器资源, 所以node.js默认不会解析请求体. 需要的时候, 需要手动来做.

```js
var http = require('http')
var querystring = require('querystring')

http.createServer(function(req, res){
  var post = ''

  req.on('data', function(chunk){
    post += chunk
  })

  req.on('end', function(){
    post = querystring.parse(post)
    res.end(util.inspect(post))
  })
}).listen(3000)
```
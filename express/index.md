# Node.js Express 框架

Express是一个简洁而灵活的node.js web应用框架.

Express 框架核心特性:

- 可以设置中间件来响应HTTP请求
- 定义了路由表用来执行不同的HTTP请求动作
- 可以通过向末班传递参数来动态渲染HTML页面

## 安装

```bash
yarn add express
```

几个重要模块:

- body-parser nodejs中间件, 用于处理JSON, Raw, Text和URL编码的数据https://www.jianshu.com/p/ea0122ad1ac0
- cookie-parser 一个解析Cookie的工具, 通过req.cookies可以去到传过来的cookie, 并把他们转换成对象.
- multer nodejs中间件, 用于处理enctype="multipart/form-data"(设置表单的MIME编码)的表单数据. https://blog.csdn.net/charlene0824/article/details/51154059

## started

```js
var express = require('express')
var app = rexpress()

app.get('/', function(req, res) {
  res.send('hello world');
})

var server = app.listen(8081, function() {
  var address = server.address()

  console.log('应用实例, 访问地址为http://%s:%s', address.address, address.port)
})
```

**request**和**response**对象具体介绍:

**Request对象** - request对象表示HTTP请求, 包含了请求查询字符串, 参数, 内容, HTTP头部等属性. 常见的属性有:

1. req.app 当callback为外部文件时, 用req.app访问express的实例
2. req.baseUrl 获取路由但其啊男装的URL路径
3. req.bdoy / req.cookies 获取 请求主体 / Cookies
4. req.fresh / req.stale 判断请求是否还"新鲜" ?????
5. req.hostname / req.ip 获取主机名和IPD地址
6. req.originalUrl 获取原始请求URL
7. req.params 获取路由的parameters
8. req.path   获取请求路径
9. req.protocol 获取协议类型
10. req.query 获取URLD的查询参数
11. req.route 获取当前匹配的路由
12. req.subdomains 获取子域名
13. req.accepts() 检查可接受的请求的文档类型
14. req.acceptCharsets / req.acceptsEncodings / req.acceptsLanguages 返回指定字符集的第一个可接受字符编码
15. req.get() 获取指定的HTTP请求头
16. req.is()  判断请求头Content-Type的MIME类型

**Response 对象** response对象表示HTTP响应, 即在接收到请求时向客户端发送HTTP响应数据. 常见有:

1. res.app 同req.app一样
2. res.append() 追加指定HTTP头
3. res.set()  在res.append()后将重置之前设置的头
4. res.cookie(name, value[,options])  设置Cookie. (options: domain / expires / httponly / maxAge / path / secure / signed)
5. res.clearCookie() 清除Cookie
6. res.download() 传送指定路径的文件
7. res.get()  返回指定的HTTP头
8. res.json() 传送JSON响应
9. res.jsonp()  传递JSONP响应
10. res.location() 只设置响应的Location HTTP头, 不设置状态码或者close response
11. res.redirect() 设置响应的Location HTTP头, 并设置状态码302
12. res.render(view,[locals], callback) 渲染一个view, 同时向callback传递渲染后的字符串, 如果在渲染过程中有错误发生next(err)将会被自动调用. callback将会被传递如一个可能发生的错误及渲染后的页面, 这样就不会自动输出了.
13. res.send() 传送HTTP响应.
14. res.sendFile(path[, optins][, fn]) 传递指定路径的文件 - 会自动根据文件extension 设定Content-Type
15. res.set() 设置HTTP头, 传入object可以一次设置多个头
16. res.status() 设置HTTP状态码
17. res.type() 设置Content-Type的MIME类型.

## 路由

在HTTP请求中, 我们可以通过路由提取请求的URL以及GET/POST参数.

demo2.js

```js
var express = require('express')
var app = express()

app.get('/' function(req, res){
  console.log('主页GET请求')
  res.send('Hello Get')
})

app.post('/', function(req, res) {
  console.log('POST REQUEST')
  res.send('Hello POST')
})

app.get('/del_user', function(req, res){
  console.log('del_user 响应DELETE 请求')
  res.send('删除页面')
})

app.get('/ab*cd', function(req, res){
  console.log('/ab*cd GET REQUEST')
  console.log('regexp match')
})

var server = app.listen(8081, function(){
  var a = server.address()
  console.log('http://%s:%s', s.address(), s.port())
})
```

## 静态文件

Express 提供了内置的中间件express.static 来设置静态文件如: 图片, css, JavaScript等.

你可以使用express.static中间件来设置静态文件路径. 例如, 如果将图片, css, JavaScript文件放在public目录下, 可以这么写:

```js
app.use(express.static('public'))
```

## GET方法

## POST方法

## 文件上传

使用表单提交, POST方法, 表单enctype属性设置为multipart/form-data

```html
<form action="/file_upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="image" size="50" />
  <input type="submit" value="submit">
</form>
```

```js
//server.js
var express = require('express')
var app = express()
var fs = require('fs')

var bodyParser = require('body-parser')
var multer = require('multer')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({dest: '/tmp/'}).array('image'))

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname+'/'+ 'index.html')
})

app.post('file_upload', function(req, res) {
  console.log(req.files[0])

  var des_file = __dirname + '/' + req.files[0].originalname;
  fs.readFile(req.files[0].path, function(err, data) {
    fs.writeFile(dest_file, data, function(err){
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
  let { address, port} = server.address()
  console.log('http://%s:%s', address, port)
})
```

## Cookie 管理

```js
// express_cookie.js
var express = require('express')
var cookieParser = require('cookie-parser')
var util = require('util')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  console.log('cookies', util.inspect(req.cookies))
})

app.listen(8081)
```
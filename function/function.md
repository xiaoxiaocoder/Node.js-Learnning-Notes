# Node.js 函数

在JavaScript中, 一个函数可以作为另一个函数的参数, 我们可以先定义一个函数, 然后传递, 也可以在传递参数的地方直接定义函数. Node.js中函数使用与Javascript类型. 举例:

```js
function say(word) {
  console.log(word)
}

function execute(someFunction, value){
  someFunction(value)
}

execute(say, "hello")
```

## 匿名函数

```js
setTimeout(function(){
  console.log('匿名函数')
}, 0)
```

## 函数传递是如何让HTTP服务器工作的

```js
var http = require('http')
http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('hello world');
  res.end()
}).listen(8000)

```
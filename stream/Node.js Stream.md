# Node.js Stream(流)

Stream是一个抽象接口, Node中有很对对象实现了这个接口. 例如, 对http服务器发起请求的request对象就是一个Stream, 还有stdout(标准输出).

Node.js, Stream有四种流类型:
- Readable  可读操作
- Writeable 可写操作
- Duplx 可读写操作
- Transform 操作被写入数据,然后读出结果

所有的Stream对象都是EventEmitter的实例. 常用的事件有:

- data  当有数据可读时触发
- end 没有更多的数据可读时触发
- error 在接收和写入过程中发生错误时触发
- finish  所有数据已被写入到底层系统时触发

---

## 从流中读取数据

创建input.txt文件. 内容如下:

```
Node.js 学习笔记: https://www.cnblogs.com/dfyg-xiaoxiao/
```

创建main.js文件. 代码如下:

```js
var fs = require('fs')
var data = ''

// create readable stream
var readerStream = fs.createReadStream('input.txt')

// set encoding as utf8
readerStream.setEncoding('UTF8')

// handle stream event -> data, end and error
readerStream.on('data', function(chunk){
  data += chunk
})

readerStream.on('end', function(){
  console.log(data)
})

readerStream.on('error', function(err) {
  console.log(err.stack)
})

console.log('code run end!')
```

执行结果

```
code run end!
Node.js 学习笔记: https://www.cnblogs.com/dfyg-xiaoxiao/
```

## 写入流

创建main.js文件:

```js
// main.js
var fs = require('fs')
var data = 'node.js 学习' + +new Date()

// create a writeable stream and set data in the file
// create file if not exist
var writeStream = fs.createWrtieStream('output.txt')

// set data encoding
writeStream.setEncoding(data, 'UTF8')

// make file end
writeStream.end()

// handle stream event -> end, finish, error
writeStream.on('finish', function(){
  console.log('write finish')
})

writeStream.on('end', function() {
  console.log('write end')
})

writeStream.on('error', function(err) {
  console.log(err.stack)
})

console.log('run end!')
```

执行结果:

```
run end!
write finish
```

## 管道流
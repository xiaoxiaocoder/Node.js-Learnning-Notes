# Node.js 文件系统

Node.js提供一组类似UNIX(POSIX)标准的文件操作API. Node导入文件系统模块(fs)语法如下所示:

```js
var fs = require('fs')
```

## 异步和同步

Node.js 文件系统(fs模块)模块中的方法均有异步和同步版本, 例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()

**异步方法函数最后一个参数为回调函数, 回调函数的第一个参数包含了错误信息.**

**建议使用异步方法, 比起同步, 异步方法性能更高, 速度更快, 且没有阻塞.**

### 实例

input.txt

```txt
Node.js 学习 www.bing.com
文件读取
```

file.js文件

```js
var fs = require('fs')

fs.readFile('input.txt', function(err, data){
  if(err) {
    return console.error(err)
  }
  console.log('async data:', data)
})


var data = fs.readFileSync('input.txt')
console.log('sync data', data)

console.log('finished')
```

## 打开文件

异步方式打开文件

```js
fs.open(path, flags[,mode], callback)
```

- path  文件路径
- flags 文件打开的行为 [r, r+, rs, rs+, w, wx, w+, wx+, a, ax, a+, a+, ax+](http://www.runoob.com/nodejs/nodejs-fs.html)
- mode  设置文件模式(权限), 文件创建默认的权限为0666(可读, 可写)
- callback 回调函数. callback(err, fd)

## 获取文件信息

```js
fs.stat(path, callback)
```

参数说明

- path  文件路径
- callback 回调函数, 带有两个参数如: (err, stats) stats是fs.Stats对象.

fs.stat(path)执行后, 会将stats类的实例返回给器回调函数. 可以通过stats类中提供方法判断文件的相关属性. 例如判断是否为文件:

```js
var fs = require('fs')

fs.stat('pathnaame', function(err, stats) {
  console.log(stats.isFile())
})
```

stats类中的方法有:

方法  | 描述
--- | ---
stats.isFile()  | 是否文件
stats.isDirectory() | 是否目录
stats.isBlockDevice() | 是否块设备
stats.isCharacterDevice() | 是否字符设备 ???
stats.isSymbolicLink()  | 是否软连接
stats.isFIFO()  | 是否FIFO(FIFO是UNIX中一种特殊类型的命令管道)
stats.isSocket()  | 是否Socket

## 写入文件

```js
fs.writeFile(file, data[, options], callback)
```

默认`w`模式, 即如果文件存在, 该方法写入内容会覆盖旧的文件内容.

参数说明:

- file  文件名或文件描述符
- data  要写入文件的数据, 可以是String(字符串)或Buffer(缓冲)对象
- options 该参数时一个对象, 包含{encoding, mode, flag}. 默认编码为utf8, 默认为0666, flag为`w`
- callback  回调函数, 回调函数只包含错误信息参数err, 在写入失败时返回.

## 读取文件

```js
fs.read(fd, buffer, offset, length, position, callback)
```

参数说明:

- fd  通过fs.open()方法返回的文件描述符
- buffer  数据写入的缓冲区
- offset  缓冲区写入的写入偏移量
- length  要从文件中的读取的字节数
- position  文件读取的起始位置, 如果position的值为null, 则会从当前文件指针的位置读取
- callback 回调函数, 有三个参数: err, bytesRead, buffer. 错误信息, 读取的字节数, 缓冲区对象.

## 关闭文件

异步关闭文件的`fs.close(fd, callback)`

参数:

- fd: 通过fs.open()方法返回的文件描述符
- callback 回调函数, 没有参数

## 截取文件

```js
fs.ftruncate(fd, len, callback)
```

- fd  通过fs.open()方法返回的文件描述符
- len 文件内容截取的长度
- callback  回调函数, 没有参数

## 删除文件

```js
fs.unlink(path, callback)
```

- path  文件路径
- callback  回调函数, 没有参数

## 创建目录

```js
fs.mkdir(path[, options], callback)
```

- path: 文件路径
- options:
  - revursive 是否以递归方式创建目录. 默认为false
  - mode  设置目录权限, 默认0777
- callback  回调函数, 没有参数

## 读取目录

```js
fs.readdir(path, callback)
```

- path 文件路径
- callback  回调函数, 有两个参数err, files. 分别是错误信息, 目录下的文件数组列表

```js
var fs = require('fs')

fs.readdir('/tmp', function(err, files){
  if(err) console.error(err)

  files.forEach(function(file){
    console.log(file)
  })
})

```

## 删除目录

fs.rmdir(path, callback)

- path 路径
- callack 回调, 没有参数

[文件模块方法参考手册](https://nodejs.org/api/fs.html)
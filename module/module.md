# Node.js 模块系统

为了让Node.js的文件可以互相调用, Node.js提供了一个简单的模块系统.

模块是Node.js应用程序的基本组成部分, 文件和模块是一一对应的. 换言之, 一个Node.js文件就是一个模块, 这个文件可能是Javascript代码, JSON 或者编译过的c/c++扩展.

## 创建模块

在Node.js中, 创建一个模块非常简单, 如下我们创建一个main.js. 代码如下:

```js
var hello = require('./hello')

hello.wrold()
```

上述实例中, 代码require('./hello')引入了当前目录下的hello.js文件(node.js默认后缀为js)

Node.js提供了exports 和 require([CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html))两个对象. 其中exports是模块公开的接口. require用于从外部获取一个模块的接口, 即所获得模块的exports对象.

hello.js
```js
exports.world = function (){
  conslole.log('Hello World!')
}
```

hello.js通过exports对象把world作为模块的访问接口, 在main.js中通过require('./hello')加载该模块, 然后就可直接访问hello.js中exports对象中的成员了.

也可以把对象封装到模块中. 格式如下:

```js
// hello.js

function Hello() {
  var name;
  this.setName = function (name) {
    name = name
  }
  this.sayHello = function () {
    console.log('Hello ' + name)
  }
}
module.exports = Hello

// main.js
var Hello = require('./hello')
hello = new Hello()
hello.setName('nodejs')
hello.sayHello()
```

**module.exports = Hello代替了exports.world = function(){}**, 外部引用该模块时,**其接口对象就是要输出的Hello对象本身, 而不是之前的exports**

## 服务端的模块放在哪里

Node.js require查找模块策略:

Node.js中存在4类模块(原生模块和3中文件模块)

![Node.js require](./nodejs-require.jpg)

### 从文件模块缓存中加载

尽管原生模块与文件模块的优先级不同, 但是都会优先从文件模块的缓存中加载已经存在的模块.

### 从原生模块中加载

**原生模块的优先级仅次于文件模块魂村的优先级**. require方法在加息文件名之后, 优先价差模块中是否在原生模块列表中. 以http模块为例, 尽管在目录下存在http/http.js /http node/http.json文件, require('http')都不会从这些文件中加载. 而是从原生模块中加载. 原生模块也有一个缓存区, 同样也是优先从缓存区加载. 如果缓存区没有被加载过, 则调用原生模块的加载昂视进行加载和执行.

### 从文件加载
当文件模块魂村中不存在, 且不是原生模块的时候, Node.js会解析require方法传入的参数, 并从文件系统中加载实际的文件, 加载过程中的包装盒编译细节同前一节已知. 此处详细描述加载文件模块的过程:

require方法接受以下几种参数的传递

- http, fs, path等, 原生模块
- ./mod 或 ../mod 相对路径的文件模块
- /pathtomodule/mod 绝对路径的文件模块
- mod 非原生模块的文件模块

在路径 Y 下执行 require(X) 语句执行顺序：

```
1. 如果 X 是内置模块
   a. 返回内置模块
   b. 停止执行
2. 如果 X 以 '/' 开头
   a. 设置 Y 为文件根路径
3. 如果 X 以 './' 或 '/' or '../' 开头
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
4. LOAD_NODE_MODULES(X, dirname(Y))
5. 抛出异常 "not found"

LOAD_AS_FILE(X)
1. 如果 X 是一个文件, 将 X 作为 JavaScript 文本载入并停止执行。
2. 如果 X.js 是一个文件, 将 X.js 作为 JavaScript 文本载入并停止执行。
3. 如果 X.json 是一个文件, 解析 X.json 为 JavaScript 对象并停止执行。
4. 如果 X.node 是一个文件, 将 X.node 作为二进制插件载入并停止执行。

LOAD_INDEX(X)
1. 如果 X/index.js 是一个文件,  将 X/index.js 作为 JavaScript 文本载入并停止执行。
2. 如果 X/index.json 是一个文件, 解析 X/index.json 为 JavaScript 对象并停止执行。
3. 如果 X/index.node 是一个文件,  将 X/index.node 作为二进制插件载入并停止执行。

LOAD_AS_DIRECTORY(X)
1. 如果 X/package.json 是一个文件,
   a. 解析 X/package.json, 并查找 "main" 字段。
   b. let M = X + (json main 字段)
   c. LOAD_AS_FILE(M)
   d. LOAD_INDEX(M)
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS
```
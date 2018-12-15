# Node.js 常用工具

util是一个Node.js核心模块, 提供常用的函数集合, 用于弥补核心JavaScript的功能过于精简的不足.

## util.inherits

util.inherits(constructor, superConstructor) 是一个实现对象间原型继承的函数.

```js
var util = require('util')

function Base() {
  this.name = 'base'
  this.base = 2992
  this.sayHello = function(){
    console.log('Hello ' + this.name)
  }
}

Base.prototype.showName = function(){
  console.log(this.name)
}

function Sub(){
  this.name = 'sub'
}

util.inherits(Sub, Base)

var objBase = hew Base()
objBase.showName()
objBase.sayHello()
console.log(objBase)

var objSub = new Sub()
objSub.showName()
//objSub.sayHello()
console.log(objSub)
```

## util.inspect

util.inspect(object, [showHidden], [depth], [colors]) 是一个将任意对象转换为字符串的方法. 通常用于调试和错误输出. 它至少接受一个参数object, 即要转换的对象.

showHidden是一个可选参数, 如果值为true, 将会输出更多隐藏信息.

depth 表示最大递归的层数, 如果对象很复杂, 可以指定层数比控制输出信息的多少. 如果不设置, 默认会递归3层 指定为null表示将不限递归层数完整遍历对象.

colors 值为true, 输出格式将会以ANSI颜色编码, 通常用于在终端显示更漂亮的效果.

**特别要指出的是, util.inspect并不会简单地直接把对象转换为字符串, 即使该对象定义了toString方法也不会调用.**

```js
var util = require('util')
function Person () {
  this.name = 'byvoid'
  this.toString = function() {
    return this.name
  }
}

var obj = new Person()
console.log(util.inspect(obj))
console.log(util.inspect(obj, true))
```

运行结果是:

```
Person {name: 'byvoid', toString: [Function]}
Person  {
  name: 'byvoid',
  toString: {
    [Function]
    [length]: 0,
    [name]: '',
    [arguments]: null,
    [caller]: null,
    [prototype]: { [constructor]: [Circular] }
  }
}
```

### 题外话

浏览器控制台执行`console.log(JSON.stringify(Window))` 会输出什么? 如果成功, 写出简单结构, 如果失败, 如何能正常输出?

> 报错. 'Converting circle structure to JSON'  
> 原因: dom标签都有ownerDocument, 并指向document, 一级 parentElement 及 childrens互相引用

```js
function stringifyCircle(obj) {
  if (obj == null) return obj;
  var cache = []
  var result = JSON.stringify(obj, function(key, value){
    if(typeof value === 'object' && null !== value){
      if(cache.indexOf(key) !== -1) {
          cache.push(key)
      }
    }
    return value
  })
  cache = null
  return result
}

```

## util.isArray(object)

## util.isRegExp(object)

## util.isDate(object)

## util.isError(object)

[http://nodejs.org/api/util.html]()

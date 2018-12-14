# Node.js 全局对象

全局对象(Global Object), 它及其所有属性都可以在程序的任何地方访问.

浏览器中, 通常window对象是全局对象, 而Node.js中的全局对象是global, 即所有全局变量(除global本身外)都是global对象的属性.

Node.js中可以直接访问到global属性, 而不需要再应用中包含它.

## 全局对象与全局变量

global最根本的作用是作为全局变量的宿主. 按照ECMASCript的定义, 满足以下条件的变量是全局变量:

- 在最外层定义的变量
- 全局对象的属性
- 隐式定义的变量(未定义直接赋值的变量).

当定义一个全局变量时, 这个变量同事也会成为全局对象的属性, 反之亦然. 需要注意的是, **在Node.js中不可能在最外层定义变量, 因为所有用户代码都是属性当前模块的, 而模块本身不是最外层上下文.**

**注意:** 永远使用var定义变量以避免引入全局变量, 因为全局变量胡污染命名空间, 提高代码耦合风险.

### __filename

__filename表示当前正在执行的脚步的文件名. 它将输出文件所在位置的绝对路径, 且和命令行参数所指定的文件名不一定相同. 如果在模块中, 返回的值是模块文件的路径.

```js
console.log(__filename)

// /users/xx/xxx/main.js
```

### __dirname

__dirname表示当前执行脚本所在的目录

```js
console.log(__dirname)

// /users/xx/xxx
```

### setTimeout(cb, ms)

setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb). setTimeout只执行一次指定函数. 返回一个代表定时器的句柄值.

### clearTimeout(t)

### setInterval(cb, ms)

### console

console用于提供控制台标准输出, 它有Internet Explorer的JScript引擎提供的调试工具, 后来逐渐成为浏览器的实施标准.

node.js沿用了该标准呢, 提供与习惯行为一致的console对象, 用于向标准输出流(stdout)或标准错误流(stderr)输出字符.

####  console方法

序号  |  方法 & 描述  
---|---
1 | console.log([data][,...])    向标准输出流打印字符并以换行符结束. 该方法接收若干个参数, 如果只有一个参数, 则输出这个参数的字符串形式. 如果有多个参数, 则以类似C语言printf()命令的格式输出
2 | console.info([data][,...])  该命令的作用与返回信息性消息, 与console.log差别不大, 除了在chrome中只会输出文在外, 其余的会显示一个蓝色惊叹号.
3 | console.error([data][,...])  输出错误消息的. 控制台在出现错误时会显示出红色叉子
4 | console.wran([data][,...])  输出警告消息. 控制台出现有黄色的惊叹号
5 | console.dir[obj[, options]] 用来对一个对象进行检查(inspect), 并以易于阅读和打印的格式显示
6 | console.time(label) 输出时间, 表示计时开始
7 | console.timeEnd(label)  结束时间, 表示计时结束
8 | console.trace(message[,...])  当前执行的代码在堆栈中的调用路径, 这个**测试函数运行很有帮助, 只要给像测试的函数里加入console.trace就行了.**
9 | console.assert(value[, message][,...])  用于判断某个表达式或变量是否为真, 接收两个参数, 第一个参数是表达式, 第二参数是字符串. 只有当第一个参数为false, 才会输出第二个参数, 否则不会有任何结果.

### process

process是一个全局变量, 即global对象的属性.

它用于描述当前Node.js进程状态的对象, 提供了一个与操作系统的简单接口. 一些常见的成员方法:

序号  | 事件 & 描述
--- | ---
1 | exit  当进程准备退出时触发
2 | beforeExit  当node清空事件循环, 并且没有其他安排时触发这个事件. 通常来说, 当没有进程安排时node退出, 但是 'beforeExit'的监听器可以异步调用, 这样node就会继续执行.
3 | uncaughtException 当一个异常冒泡回到事件循环, 触发该事件. 如果给异常添加了监视器, 默认的操作(打印堆栈跟踪信息并退出)就不会发生.
4 | Signal 事件 当进程接收到信号时就触发. 信号列表详见标准的POSIX信号名, 如SIGINT, SIGUSR1等.
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

#### 退出状态码

退出状态码如下:

状态码  | 名称&描述
--- | ---
1 | Uncaught Fatal Exception 有未捕获异常, 并且没有被域或uncaughtException处理函数处理.
2 | Unused  保留
3 | Internam JavaScript Parse Error JavaScript的原地阿妈启动Node进程时引起解析错误. 非常罕见, 金辉在开发Node时才会有.
4 | Internal JavaScript Evaluation Failure  JavaScript的源代码启动Node进程, 评估时返回函数失败. 非常罕见, 金会再开发Node时才会有.
5 | Fatal Error V8里致命的不可恢复的错误. 通常会打印到stderr. 内容为: FATAL ERROR
6 | Non-function Interal Exception Handler  未捕获异常, 内部异常处理函数不知为何设置为on-function, 并且不能被调用.
7 | Internal Exception Handler Run-TIme Failure 未捕获异常, 并且异常处理函数处理时自己抛出了异常. 例如, 如果 process.on('uncaughtException')或domain.on('error')抛出了异常.
8 | Unused  保留
9 | Invaild Argument  可能是给了未知参数,或者给的参数没有值.
10  | Internal Javascript Run-Time Failure JavaScript的源代码异动Node进程时抛出错误, 非常罕见, 仅会在开发Node时才会有.
12  | Invaild Debug Argument  设置了参数--debu和 / 或 --debug-brk, 但是选择了错误端口.
128 | Singnal Exits 如果Node接收到致命信号, 比如SIGKILL或SIGHUP, name退出代码就是128加信号代码. 这是标准的Unix做法, 退出信号代码放在高位.

### Process 属性

Process提供了很多有用的属性,便于我们更好的控制系统的交互:

序号  | 属性&描述
--- | ---
1 | stdout  标准输出流
2 | stderr  标准错误流
3 | stdin 标准输入流
4 | argv  argv属性返回一个数组, 有命令行执行脚本时的各个参数组成. 它的第一个成员总是node, 第二个成员是脚步文件名, 其余成员是脚本文件的参数.
5 | execPath  返回执行当前脚本的Node二进制文件的绝对路径
6 | execArgv  返回一个数组, 成员是命令行下执行脚本时, 早Node可执行文件与脚本文件之间的命令行参数.
7 | env 返回一个对象, 成员为当前shell的环境变量.
8 | exitCode  进程退出时的代码, 如果进程通过process.exit()退出, 不需要指定退出码.
9 | version 一个属性, 比如v0.10.18
10  | versions  一个属性,包含了node的版本和依赖
11  | config  一个包含在哪用来编译当前node执行文件的javascript配置选项的对象. 它与运行./configure及饿哦本生成的"config.gypi"文件相同.
12  | pid 当前进程的进程号
13  | title 进程名, 默认为"node", 可以自定义该值.
14  | arch  当前CPU的架构:"arm", "ia32"或者'x64'
15  | plathform 运行程序所在的平台系统'darwin', 'freebsd', 'linux', 'sunos'或'win32'
16  | mainModule  require.main 的备选方法. 不通电, 如果主模块在运行时改变, require.main可能会继续返回老的模块. 可以认为, 这个两者引用了同一个模块.

#### 方法参考手册

Process 提供了很多有用的方法, 便于我们更好的控制系统的交互:

序号  | 方法&描述
--- | ---
1 | abort() 浙江调至node触发abort时间. 会让node 退出并生成一个核心文件. ??????
2 | chdir(directory)  改变当前工作进程的目录, 如果操作失败抛出错误.
3 | cwd() 返回当前进程的工作目录
4 | exit([code]) 使用指定的code结束进程. 如果忽略, 将会使用code.
5 | getgid() 获取进程的群组表示(参见getgitd(2)). 获取到的是群组的数组id, 而不是名字. 注意: 设个函数尽在POSIX平台上可用(例如, 非Windows和Android)
6 | setgid() 设置进程的群组表示(参考setgid(2)). 可以接收数字ID或群组名. 如果制定了群组名, 会阻塞等待解析为数字ID.   注意: 这个函数仅在POSIX平台上可用(进入, 非Windwos和Android)
7 | getuid()  获取进程的用户标识(参见getuid(2)). 设置数字的用户id, 不是用户名. 注意: 这个函数仅在POSIX平台上可用(例如: 非Windows和Android)
8 | setuid(id)  设置进程的用户标识(参见setuid(2)). 接收数组ID或字符串名字. 如果制定了群组名, 会阻塞等待解析为数字ID. 注意: 改函数仅在POSIX平台上借用(例如, 非Windows和Android)
9 | getgroups() 返回进程的群组ID数组. POSIX系统没有保证一定有, 但node.js保证有. 注意: 改函数仅在POSIX平台上可用(如: 非Windows和Android)
10  | setgroups(groups) 设置进程的群组ID. 这是授权操作, 所以需要有root权限, 或者有CAP_SETGID能力. 注意: 该函数仅在POSIX平台上可用(如: 非Windows和Android).
11  | initgroups(user, extra_group) 读取/etc/group, 并初始化群组访问列表, 使用成员所在的所有群组. 这是授权操作, 所有需要root权限或有CAP_SETGID能力. 注意: 该函数仅在POSIX平台上可用(如: 非Windows和Android).
12  | kill(pid[,signal])  发送信号给进程. pid是进程id, 并且signal是发送的信号的字符串描述. 信号名是字符串, 比如'SIGINT'或'SIGHUP'. 如果忽略, 信号会是'SIGTERM'
13  | memoryUsage() 返回一个对象. 描述了Node进程所用的内存状态, 单位是字节.
14  | nextTick(callback) 一旦当前事件循环结束, 调用回调函数.
15  | umash([mask]) 设置或读取进程文件的掩码. 子进程从父进程继承掩码. 如果mask参数有效, 返回旧的掩码. 否则, 返回当前掩码.
16  | uptime() 返回Node已经运行的秒数
17  | httime()  返回当前进程的高分辨时间, 形成为[seconds, nanoseconds]数组. 它是相对于过去的任意时间. 该值与日期无关, 因此不受时钟漂移的影响. 主要用途是可以通过精确的时间间隔, 来衡量程序的性能. **可以将之前的结果传递给当前的process.hrtime(), 会返回两者间的时间差, 用来基准和测量时间间隔**

```js
console.log('current direcory:' + process.cwd())

console.log('current version: ' + process.version)

console.log('memory usage:', process.memoryUsage())
```
# Node.js 链接MySQL

## 安装驱动

```bash
yarn add mysql
```

## 连接字符串

```js
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123456',
  database: 'websites'
})

connection.connect()

connection.query('select 1 + 1 as solution', function(err, results, fields) {
  if(err) throw err;
  console.log('The solution is:', results[0].solution)
})
```

### 连接数据库参数说明

参数  | 描述
--- | ---
host  | 主机地址(默认: localhost)
user  | 用户名
port  | 密码 (默认: 3306)
database  | 数据库名
charset | 连接字符集(默认: `UTF8_GENERAL_CI`, **注意字符集的字母都要大写**)
localAdress | 此IP用于TCP连接(optional)
socketPath  | 连接到unix域路径, 当使用host和port时会被忽略
timezone  | 时区(default: 'local')
connectTimeout  | 连接超时(默认: 不限制, 单位: 毫秒)
stringifyObjects  | 是否序列化对象
typeCast  | 是否将列值转化为本地JavaScript类型值(默认: true)
queryFormat | 自定义query语句格式化方法
suppprtBigNumbers | 数据库支持bigint或decimal类型列时, 需要将option设置为true(默认: false)
bigNumberStrings  | supportBigNumbers和bigNumberStrings启用, 强制bigint或decimal列已JavaScript字符串类型返回(默认: false)
deteString  | 强制timestamp, detetime, date类型以字符串类型返回, 而不是JavaScript Date类型(默认: false)
debug | 开启调试(默认: false)
multipleStatements  | 是否允许一个query钟有多个mysql语句(默认:false)
flags | 用于修改链接标志
ssl | 使用ssl参数(与crypto.createCredenitals参数格式一致)或一个包含ssl配置文件名称的字符串, 目前只捆绑Amazon RDS的配置文件.

[更多说明](https://github.com/mysqljs/mysql)

## 数据库CURD

公共部分

```js
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123456',
  port: '3306',
  database: 'websites'
})

connection.connect()
```

### 查询

```js
var sql = 'select * from websites'

connection.query(sql, function(err, result) {
  if(err) {
    console.log(`[SELECT ERROR] -`, err.message)
    return;
  }
  console.log('----------INSERT--------------')
  console.log(result)
  console.log('------------------------------\n\n')
})

connection.end()
```

### 新增

```js
// add.js
var addSql = 'insert into websites(id, name, url, alexa, country) values(0, ?, ?, ?, ?)'
var addSqlParams = ['t', 'http://xxx.com', '132', 'cn']

connection.query(addSql, addSqlParams, function(err, result){
  if(err) {
    console.error(`[INSERT ERROR] - ${err.message}`)
  }
  console.log('------------INSERT---------------')
  console.log('INSERT ID:', result)
  console.log('--------------------------------\n\n')
})

connection.end()
```

### 更新

```js
var modSql = 'update websites set name = ?, url = ? where id = ?';
var modSqlParams = ['123', '111', 6]

connection.query(modSql, modSqlParams, function(err, result){
  if(err) {
    console.log('[UPDATE ERROR] - ', err.message)
    return
  }
  console.log('---------UPDATE------------')
  console.log('UPDATE RESULT:', result)
  console.log('---------------------------\n\n')
})

connection.end()
```

### 删除数据

```js
connection.query('delete from websites where id = 6', function(err, result) {
  if(err){
    console.log(`[DELETE ERROR] - ${err.message}`)
    return
  }
  console.log('-----------DELETE-----------')
  console.log('DELETE RESULT', result)
  console.log('----------------------------')
})

connection.end()
```
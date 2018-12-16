# Node.js 连接MongoDB

MongoDB 是一种**文档型数据库**, 使用C++编写而成.

[mongodb教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)

## 安装驱动

```bash
cnpm install mongodb

yarn install mongodb
```

## 创建数据库

要在MongoDB中创建一个数据库, 首先我们需要创建一个MongoClient对象, 然后配置好指定的URL和端口号/

如果数据库不存在, MongoDB将创建数据库并建立连接

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/xiaoxiao'

mongoClient.connect(url, function(err, db){
  if(err) throw err
  console.log('数据库已建立')
  db.close()
})
```

## 创建集合

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/xiaoxiao'

mongoClient.connect(url, function(err, db){
  if(err) {
    console.error(err)
    return
  }
  var db = db.db('xiaoxiao')
  db.createCollection('site', function(err, res) {
    if(err) {
      console.log('collection error', err)
      console.log('create collection!')
      db.close()
    }
  })
})
```

## 数据库操作(CURD)

与MySQL不同的是MongoDB会自动创建数据库和集合, 所以使用前不需要手动去创建.

### 插入数据

使用`insertOne`插入一条数据.

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err , db) {
  if(err) {
    console.error('error', err)
    return
  }
  var dbo = db.db('xiaoxiao')
  var myobj = { name: '1', url: '2' }
  db.collection('site').insertOne(myobj, function(err, res) {
    if(err) {
      console.error(err)
    }
    console.log('insert one')
    db.close()
  })
})
```

插入多条数据可以使用`insertMany()`

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
    return
  }
  var dbo = client.db('xiaoxiao')
  var data = [
    {name: '1', url: '2', type: 'cn'},
    {name: '3', url: '3', type: 'en'},
    {name: '4', url: '4', type: 'cn'},
  ]
  dbo.collection('site').insertMany(data, function(err, res) {
    if(err) {
      console.error(err)
    }
    console.log('insert many result', res)
    db.close()
  })
})
```

### 查询数据

可以使用find()来查找数据, find()可以返回匹配条件的所有数据. 如果未指定条件, find()返回集合中的所有数据.

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  var whereStr = {'name': '1'} // {}
  dbo.collection('site').find(whereStr).toArray(function(err, result) {
    if(err) throw err
    console.log(result)
    client.close()
  })
})
```

### 更新数据

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  var where = {'name': '2'}
  var update = { $set, { url: 'xxxxxxxxxxx' } }
  dbo.collection('site').updateOne(where, update, function(err, result) {
    // 多条
    // dbo.collection('site').updateMany(where, update, function(err, result) {})
    if(err) {
      console.error(err)
    }
    console.log('update ....')
    client.close()
  })
})
```

- updateOne 更新单条数据
- updateMany 更新多条数据

### 删除数据

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  var where = {name: '2'} 
  dbo.collection('site').deleteOne(where, function(err, result) {
    if(err) {
      console.error(err)
    }
    console.log('delete success')
    client.close()
  })
})
```

删除多条语句使用`deleteMany()`

obj.result.n 删除的条数

## 排序

使用sort()方法, 该方法接受一个参数, 规定是升序1 还是降序 -1

比如:

```js
{ type: 1 } // 按type 字段升序
{ type: -1 } // 按照tyoe 降序排列
```

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParset: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  var sort = { type: 1}
  dbo.collection('site').find().sort(sort).toArray(function(err, result) {
    if(err) {
      console.log(err)
    }
    console.log(result)
    client.close()
  })
})
```

## 查询分页

使用`limit()`方法, 该方法只接受一个参数, 指定了返回的条数.

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.log(err)
  }
  var dbo = client.db('xiaoxiao')
  dbo.collection('site').find().limit(2).toArray(function(err, result) {
    console.log(result)
    client.close()
  })
})
```

`skip()` 方法

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.log(err)
  }
  var dbo = client.db('xiaoxiao')
  dbo.collection('site').find().skip(2).limit(2).toArray(function(err, result) {
    if(err) {
      console.log(err)
    }
    console.log(result)
    client.close()
  })
})
```

## 连接操作

mongoDB 不是一个关系型数据库, 但可以使用$lookup来实现左连接.

比如:

// order

```js
[
  {_id: 1, product_id: 154, status: 1}
]
```

// products

```js
[
  { _id: 154, name: '154' },
  { _id: 155, name: '155' },
  { _id:156, name: '156' }
]
```

```js
// $lookup
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  dbo.collection('orders').arrgegate([
    {
      $lookup: {
        from: 'products', // 右集合
        localField: 'product_id', // 左集合join字段
        foreignField: '_id',  // 右集合join字段
        as: 'orderdetails'  //新生成字段(类型array)
      }
    }
  ]).toArray(function(err, result){
    if(err) {
      console.error(err)
    }
    console.log(result)
    client.close()
  })
})

```

## 删除集合

可以使用`drop()`方法来删除集合

```js
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.log(err)
  }
  var dbo = client.db('xiaoxiao')
  dbo.collection('test').drop(function(err, delOk) {
    if(err) {
      console.error(err)
    }
    if(delOk) console.log('delete successfully')
    client.close()
  })
})
```
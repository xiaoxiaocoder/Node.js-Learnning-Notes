var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var util = require('util')

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.log(err)
  }
  var dbo = client.db('xiaoxiao')
  dbo.collection('orders').aggregate([
    {
      $lookup: {
        from: 'products', // 右集合
        localField: 'product_id', // 左集合join字段
        foreignField: '_id',  // 右集合 join 字段
        as: 'orderdetails'  // 新生成字段(类型array)
      }
    }
  ]).toArray(function(err, result) {
    if(err) {
      console.log(err)
    }
    console.log(util.inspect(result))
    client.close()
  })
})
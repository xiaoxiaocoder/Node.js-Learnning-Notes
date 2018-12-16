var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
    return
  }
  var dbo = client.db('xiaoxiao')
  // var data = { name: 1, url: 2, type: 'en' }
  // dbo.collection('site')
  var data = { _id: 1, product_id: 154, status: 1 }
  dbo.collection('orders')
  .insertOne(data, function(err, res) {
    if(err) {
      console.error('inser on error', err)
      return
    }
    console.log('insert success')
    client.close()
  })
})
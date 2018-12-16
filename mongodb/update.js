var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err){
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  // var where = { 'name': '2' }
  // var update = { $set: { url: 'xxxxxxx'}}
  // dbo.collection('site').updateOne(where, update, function(err, result) {
    var where = { type: 'en' }
    var update = { $set: { url: 12311111111 } }
    dbo.collection('site').updateMany(where, update, function(err, result){
    if(err) {
      console.error(err)
    }
    console.log('update success...', result)
    client.close()
  })
})
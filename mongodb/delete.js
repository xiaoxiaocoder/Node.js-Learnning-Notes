var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  console.log(client.db)
  var dbo = client.db('xiaoxiao')
  var where = { type: 'en' }
  dbo.collection('site')
  .deleteMany(where, function(err, result) {
  //.deleteOne(where, function(err, result) {
    if(err) {
      console.error(err)
    }
    console.log('delete success...')
    client.close()
  })
})
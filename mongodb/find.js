var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) console.error(err)
  var dbo = client.db('xiaoxiao')
  var where = { name: '2' } // {}
  dbo.collection('site').find(where).toArray(function(err, result) {
    if(err) console.error(err)
    console.log(result)
    client.close()
  })
})
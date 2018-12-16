var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  dbo.collection('site').find().skip(1).limit(2).toArray(function(err, result){
    if(err) {
      console.error(err)
    }
    console.log(result)
    client.close()
  })
})
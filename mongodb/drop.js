var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.log(err)
  }
  var dbo = client.db('xiaoxiao')
  // MongoError: ns not found occurs when 
  // performing actions on collections that don't exist.

  // For example, attempting to drop indexes before an explicit 
  // collection creation has occurred or before adding 
  // a document to the collection which implicitly creates the collection.
  dbo.collection('test').drop(function(err, delOk) {
    if(err) {
      console.log('DELETE ERROR', err)
    }
    if(delOk) console.log('delete success')
    client.close()
  })
})


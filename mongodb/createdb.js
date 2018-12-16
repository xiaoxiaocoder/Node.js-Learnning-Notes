var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/xiaoxiao'

// (node:32879) DeprecationWarning: current URL string parser is deprecated, 
// and will be removed in a future version. To use thenew parser, pass option { useNewUrlParser: true } to MongoClient.connect.
mongoClient.connect(url, function(err, db){
  if(err) throw err
  console.log('db created!')
  db.close()
})
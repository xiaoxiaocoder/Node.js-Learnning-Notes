var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/xiaoxiao'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
  if(err) {
    console.error('connection error', err)
  }
  var dbase = db.db('xiaoxiao')
  dbase.createCollection('site', function(err, res) {
    if(err){
      console.error('create collection error', err)
      return
    }
    console.log('create collection!')
    db.close()
  })
})
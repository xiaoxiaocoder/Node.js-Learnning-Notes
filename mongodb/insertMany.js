var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.error(err)
  }
  var dbo = client.db('xiaoxiao')
  // var data = [
  //   { name: '2', url: '2', type: 'en' },
  //   { name: '3', url: '3', type: 'cn' },
  //   { name: '4', url: '4', type:'zn' }
  // ]
  // dbo.collection('site')
  var data = [
    { _id: 154, name: '154' },
    { _id: 155, name: '155' },
    { _id:156, name: '156' }
  ]
  dbo.collection('products')
  .insertMany(data, function(err, result) {
    if(err) {
      console.error('insert many error', err)
    }
    console.log('inser many result', result)
    client.close()
  } )
})

// { 
//   result: { ok: 1, n: 3 },
//   ops:
//   [ 
//     { name: '2', url: '2', type: 'en', _id: 5c1639823398e88d0a195af9 },
//     { name: '3', url: '3', type: 'cn', _id: 5c1639823398e88d0a195afa },
//     { name: '4', url: '4', type: 'zn', _id: 5c1639823398e88d0a195afb } 
//   ],
//   insertedCount: 3,
//   insertedIds:
//   { 
//     '0': 5c1639823398e88d0a195af9,
//     '1': 5c1639823398e88d0a195afa,
//     '2': 5c1639823398e88d0a195afb 
//   } 
// }
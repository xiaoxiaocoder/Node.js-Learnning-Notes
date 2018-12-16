var { connection } = require('./connection')

connection.connect()

connection.query('select * from websites;', function(err, result){
  if(err) {
    console.error(`[SELECT ERROR] - ${err.message}`)
    return
  }
  console.log('-----------SELECT---------------')
  console.log('result:', result)
  console.log('---------------------------------\n\n')
})

connection.end();
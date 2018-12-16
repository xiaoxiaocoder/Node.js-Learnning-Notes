var { connection } = require('./connection')

connection.connect()

var addSql = 'insert into websites(id, name, url, alexa, country) '+
                          ' values(0, ?, ?, ?, ?)'
var addSqlParams = ['1', 'http://xx.com', '23', 'cn']
connection.query(addSql, addSqlParams, function(err, result){
  if(err){
    console.error(`INSERT ERROR: ${err.message}`)
    return
  }
  console.log('-----------INSERT-----------------')
  console.log('INSERT ID:', result)
  console.log('-----------------------------------\n\n')
})
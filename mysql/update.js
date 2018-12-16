var { connection } = require('./connection')

connection.connect()

var modSql = 'update websites set name = ?, url = ? where id = ?'
var modSqlParams = ['1', '2', 6]
connection.query(modSql, modSqlParams, function(err, results, fields){
  if(err) {
    console.error(`[UPDATE ERROR] - ${err.message}`)
    return
  }
  console.log('----------UPDATE-------------')
  console.log('UPDATE RESULTS', results)
  console.log('UPDATE FIELDS', fields)
  console.log('-----------------------------\n\n')
})

connection.end()
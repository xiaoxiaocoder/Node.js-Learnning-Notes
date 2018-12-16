var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123456',
  database: 'websites'
})

connection.connect()

connection.query('select 1 + 1 as solution', function(err, results, fields) {
  if(err) console.error(err)
  console.log('The solution is:', results[0].solution)
  console.log('results', results)
  console.log('fields', fields)
})
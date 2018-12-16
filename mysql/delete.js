var { connection }  = require('./connection')

connection.connect()

connection.query('delete from websites where id = 6', function(err, result) {
    if(err) {
      console.error(`[DELETE ERRPR] - ${err.message}`)
      return
    }

    console.log('---------DELETE-------------')
    console.log('DELETE RESULTS:', result)
    console.log('----------------------------')
  }
)

connection.end()
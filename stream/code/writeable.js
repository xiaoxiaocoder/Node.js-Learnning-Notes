var fs = require('fs')
var data = 'Node.js Learning. Writeable stream'

var writeStream = fs.createWriteStream('output.txt')

writeStream.write(data, 'UTF8')

writeStream.end()

writeStream.on('finish', function(){
  console.log('write finish')
})

writeStream.on('end', function(){
  console.log('write end')
})

writeStream.on('error', function(err){
  console.log(err.stack)
})

console.log('run end!!')
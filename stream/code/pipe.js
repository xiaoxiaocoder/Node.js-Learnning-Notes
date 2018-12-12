let fs = require('fs')

var readStream = fs.createReadStream('input.txt')

var writeStream = fs.createWriteStream('output.txt')

readStream.pipe(writeStream)

console.log('code run end!')
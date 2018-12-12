var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.gz.txt'))

console.log('decompress end')
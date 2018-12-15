var fs = require('fs')
var path = require('path')

console.log('查看/tmp 目录')

var filename = '/tmp/test20181215'

fs.mkdir(filename, function(err){
  if(err) console.error(err)
  console.log('make direcory finished.')
})

fs.readdir('/tmp', function (err, files) {
  if(err) console.error(err)

  files.forEach(function(file, index){
    if (file == 'test20181215') {
      console.log(index, file)
    }
  })
})

fs.rmdir(filename, function(err) {
  if(err) console.error(err)
  console.log('rmdir....')
})

fs.readdir('/tmp', function (err, files) {
  if(err) console.error(err)

  console.log('readdir....')
  let file = files.filter(v => v === 'test20181215')
  if(file.length) {
    console.log(file)
  } else {
    console.log('not found!')
  } 
})
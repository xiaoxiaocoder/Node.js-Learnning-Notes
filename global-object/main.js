var util = require('util')

util.inherits()
console.log('__filename: ', __filename)

console.log('__dirname: ', __dirname)

console.info('console.info')

// 输出到终端
process.stdout.write('Hello world!\n');

// 通过参数读取
process.argv.forEach(function(val ,index, arr){
  console.log(`${index}: ${val}`)
})

// 获取执行路径
console.log(process.execPath)

console.log(process.platform)


console.log(process.cwd())

console.log(process.version)

console.log(process.versions)

console.log(process.memoryUsage())

process.on('exit', function(code){
  // this code wouldn't execute
  setTimeout(function(){
    console.log('setTimeout ....')
  }, 0)

  console.log('exit code :', code)
})

console.log('finished!')
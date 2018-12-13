var url = require('url')
var querystring = require('querystring')

var path = "http://localhost:8080/start?foo=bar&hello=world"

var urlParse = url.parse(path)
console.log(urlParse.pathname)
console.log(urlParse.query)

var query = urlParse.query
console.log(querystring.parse(query))


function route(pathname){
  console.log('About to route a request for ' + pathname)
}

exports.route = route

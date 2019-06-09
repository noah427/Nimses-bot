var request = require('request')

var exports = module.exports = {}

exports.getUserInfo = function(name, callback){
  
name = name.toLowerCase()

request(`https://web.nimses.com/api/profile/${name}`, function (error, response, body) {
if(response.statusCode == 404){
var Userinfo = 404
}
else{
var Userinfo = JSON.parse(body)
}
callback(Userinfo)

});
}

var request = require('request')

var exports = module.exports = {}

exports.getUserInfo = function(name, callback){

request(`https://web.nimses.com/api/profile/${name}`, function (error, response, body) {
var Userinfo = JSON.parse(body)
callback(Userinfo)
});
}
var request = require('request')

var exports = module.exports = {}

exports.getUserInfo = function(name, callback) {
  name = name.toLowerCase()

  request(`https://web.nimses.com/api/profile/${name}`, function(error, response, body) {
    if (response.statusCode == 404) {
      var Userinfo = 404
    }
    else {
      var Userinfo = JSON.parse(body)
    }
    callback(Userinfo)

  });
}

exports.getUserPosts = function(name,cb){

    request(`https://web.nimses.com/api/profile/${name}`, function(error, response, body) {
    if (response.statusCode == 404) {
      var Userinfo = 404
    }
    else {
      var Userinfo = JSON.parse(body)
        request(`https://web.nimses.com/api/feed/user?id=${Userinfo.profile.id}&cursor=&limit=3`,function(response,err,body){
          var posts = JSON.parse(body)
          cb(posts)
       })
    }
    
  });
}

exports.getUserLimits = function(name, cb){
    request(`https://web.nimses.com/api/profile/${name}`, (error, response, body) => {
        if (response.statusCode == 404) {
            cb(404);
        }
        else {
            var Userinfo = JSON.parse(body)
            request(`https://web.nimses.com/api/profile/limits?id=${Userinfo.profile.id}`, (response,err,body) => {
                var posts = JSON.parse(body)
                cb(posts)
            })
        }
    });
}
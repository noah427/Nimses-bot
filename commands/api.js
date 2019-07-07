var request = require('request')

var exports = module.exports = {}

exports.getUserInfo = function (name, callback) {
  request(`https://web.nimses.com/api/profile/${name}`, function (error, response, body) {
    if (response.statusCode == 404) {
      var Userinfo = 404
    }
    else {
      var Userinfo = JSON.parse(body)
    }
    callback(Userinfo)

  });
}


exports.getUserID = function (name, callback) {
  name = name.toLowerCase()

  request(`https://web.nimses.com/api/profile/${name}`, function (error, response, body) {
    if (response.statusCode == 404) {
      var Userinfo = 404
      cb(Userinfo)
    }
    else {
      var Userinfo = JSON.parse(body)
      callback(Userinfo.profile.id)
    }
  });
}


exports.getUserPosts = function (name, cb) {

  this.getUserID(name, function() {
    if (ID == 404) {
      cb(ID)
    }
    else {
      request(`https://web.nimses.com/api/feed/user?id=${ID}&cursor=&limit=3`, function (response, err, body) {
        var posts = JSON.parse(body)
        cb(posts)
      })
    }

  });
}

exports.getUserLimits = function (name, cb) {
  this.getUserID(name, function(ID){
    if(ID === 404){
      cb(ID)
    } else{
      request(`https://web.nimses.com/api/profile/limits?id=${ID}`, (response, err, body) => {
        var posts = JSON.parse(body)
        cb(posts)
      })
    }
  })
}


exports.getTemple = function(id,cb){
  request(`https://temples.nimses.com/api/temples/${id}`, (err, response, body) => {
    var temple = JSON.parse(body)
    cb(temple)
  })
}
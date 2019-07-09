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

  this.getUserID(name, function(ID) {
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

exports.getTempleTop = function(cb){
  request(`https://temples.nimses.com/api/temples/top?limit=5`, function(err, response, body){
    if(response.statusCode === 404){
      cb(404)
    } else{
      var temples = JSON.parse(body)
      cb(temples)
    }
  })
}


exports.getGlobalData = function(cb){
  request("https://data.nimses.com/api/stat", function(err,reponse,body){
    globalData = JSON.parse(body)
    cb(globalData)
  })
}


exports.getTemple = function(id,cb){
  request(`https://temples.nimses.com/api/temples/${id}`, (err, response, body) => {
    if(response.statusCode === 404){
      var temple = 404
    } else{
      var temple = JSON.parse(body)
    }
    cb(temple)
  })
}
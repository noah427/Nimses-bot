var exports = module.exports = {}
var nemsis = require('./api')
var utilities = require('./utilities')




exports.user = function (msg) {
    var args = msg.content.split(" ")
    var username = utilities.nicknameOrArg(msg)
    nemsis.getUserInfo(username, function (user) {
        if (user != 404) {
            var embed = {
                title: "user info",
                description: "shows user info and stuff",
                color: 3447003,
                author: {
                    name: "[REDACTED]#1227"
                },
                image: {
                    url: user.profile.avatar
                },
                fields: [
                    {
                        name: "username: ",
                        value: user.profile.nickName
                    },
                    {
                        name: "dominims: ",
                        value: user.profile.balanceDominims
                    },
                    {
                        name: "nims: ",
                        value: user.profile.balanceNims
                    },
                    {
                        name: "followers: ",
                        value: user.profile.followers
                    },
                    {
                        name: "following: ",
                        value: user.profile.following
                    },
                    {
                        name: "visitors: ",
                        value: user.profile.visitors
                    },
                    {
                        name: "level? (no idea what this means): ",
                        value: user.profile.level
                    },
                    {
                        name: "is an angel: ",
                        value: user.profile.isAngel
                    },
                    {
                        name: "is master: ",
                        value: user.profile.isMaster
                    },
                ],
                footer: {
                    text: "©[REDACTED]#1227"
                }
            }
            msg.channel.send({ embed: embed })
        }
        else {
            msg.channel.send("can't find that user")
        }
    })
}




exports.limit = function (msg) {
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(msg)
    nemsis.getUserLimits(username.toLowerCase(), (limits) => {
        var embed = {
            color: 3447003,
            author: {
                name: "pikami#0050",
            },
            fields: [
                {
                    name: "Nims used",
                    value: `${limits.amount}/${limits.limit}`
                },
                {
                    name: "Expiration",
                    value: `${limits.expiration}`.substring(0, 10)
                },
            ],
            footer: {
                text: "©[REDACTED]#1227"
            }
        }
        msg.channel.send({ embed: embed })
    });
}




exports.posts = function (msg) {
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(msg)
    nemsis.getUserPosts(username.toLowerCase(), function (posts) {
        posts.items.forEach(function (post) {
            var embed = {
                title: "post",
                color: 3447003,
                author: {
                    name: "[REDACTED]#1227",
                },
                image: {
                    url: post.photo,
                },
                fields: [
                    {
                        name: "text",
                        value: post.text
                    },
                ],
                footer: {
                    text: "©[REDACTED]#1227"
                }
            }
            msg.channel.send({ embed: embed })
        })
    })
}
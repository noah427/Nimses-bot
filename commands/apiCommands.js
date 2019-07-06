var exports = module.exports = {}
var nemsis = require('./api')
var utilities = require('./utilities')
const Discord = require('discord.js');




exports.user = function (msg) {
    var args = msg.content.split(" ")
    var username = utilities.nicknameOrArg(msg)
    nemsis.getUserInfo(username, function (user) {
        if (user === 404) {
            msg.channel.send("can't find that user")
        }
        else {
            var embed = new Discord.RichEmbed()
                .setTitle('User info')
                .setDescription('Displays user info/stats')
                .setColor('#4169e1')
                .setAuthor('[REDACTED]#1227')
                .setImage(user.profile.avatar)
                .addField("Username: ", user.profile.nickName)
                .addField("Dominims: ", user.profile.balanceDominims)
                .addField("Nims: ", user.profile.balanceNims)
                .addField("Followers: ", user.profile.followers)
                .addField("Following: ", user.profile.following)
                .addField("Visitors: ", user.profile.visitors)
                .addField("is an angel: ", user.profile.isAngel)
                .addField("is a master: ", user.profile.isMaster)
                .setFooter("©[REDACTED]#1227")
            msg.channel.send(embed)
        }
    })
}




exports.limit = function (msg) {
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(msg)
    nemsis.getUserLimits(username.toLowerCase(), (limits) => {
        if (limits === 404) {
            msg.channel.send("can't find that user")
        } else {
            var embed = new Discord.RichEmbed()
                .setAuthor("pikami#0050")
                .setColor("#4169e1")
                .addField("Nims spent/limit", `${limits.amount}/${limits.limit}`)
                .setFooter("©[REDACTED]#1227")
            msg.channel.send(embed)
        }
    });
}




exports.posts = function (msg) {
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(msg)
    nemsis.getUserPosts(username.toLowerCase(), function (posts) {
        if (posts === 404) {
            msg.channel.send("can't find that user")

        } else {
            posts.items.forEach(function (post) {
                var embed = new Discord.RichEmbed()
                    .setAuthor("Post: ")
                    .setColor("#4169e1")
                    .setImage(post.photo)
                    .addField("text: ", post.text)
                    .setFooter("©[REDACTED]#1227")
                msg.channel.send(embed)
            })
        }
    })
}
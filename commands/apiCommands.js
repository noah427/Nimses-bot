var exports = module.exports = {}
var nemsis = require('./api')
var utilities = require('./utilities')
const Discord = require('discord.js');




exports.user = function (msg) {
    var arg = msg.content.slice(6).replace(" ","_")
    var username = utilities.nicknameOrArg(arg,msg.member.displayName)
    nemsis.getUserInfo(username.toLowerCase(), function (user) {
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
    var arg = msg.content.slice(7).replace(" ","_")
    var username = utilities.nicknameOrArg(arg,msg.member.displayName)
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
    var arg = msg.content.slice(6).replace(" ","_")
    var username = utilities.nicknameOrArg(arg,msg.member.displayName)
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

exports.globalData = function(){
    var data = nemsis.getGlobalData()
    var embed = new Discord.RichEmbed()
        .setTitle("Global Data")
        .setAuthor("[REDACTED]#1227")
        .setColor("#4169e1")
        .addField("Total global nims: ", data.nims)
        .addField("'Nims Delta' (don't know what this means): ", data.nimsDelta)
        .addField("Total global Dominims: ", data.dominims)
        .addField("Average temple income: ", data.averageTempleIncome)
        .addField("'Emitted wallets' (also don't know what this means): ", data.emittedWallets)
        .addField("Active temples : ", data.activeTemples)
        .addField("Angels count: ", data.angelsCount)
}
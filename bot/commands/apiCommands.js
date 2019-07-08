var exports = module.exports = {}
var nemsis = require('./api')
var utilities = require('./utilities')
const Discord = require('discord.js');




exports.user = function (msg) {
    var arg = msg.content.slice(6).replace(" ", "_")
    var username = utilities.nicknameOrArg(arg, msg.member.displayName)
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
                .addField("Dominims: ", utilities.commaSeparater(user.profile.balanceDominims))
                .addField("Nims: ", utilities.commaSeparater(user.profile.balanceNims))
                .addField("Followers: ", utilities.commaSeparater(user.profile.followers))
                .addField("Following: ", utilities.commaSeparater(user.profile.following))
                .addField("Visitors: ", utilities.commaSeparater(user.profile.visitors))
                .addField("is an angel: ", user.profile.isAngel)
                .addField("is a master: ", user.profile.isMaster)
                .setFooter("©[REDACTED]#1227")
            msg.channel.send(embed)
        }
    })
}




exports.limit = function (msg) {
    var arg = msg.content.slice(7).replace(" ", "_")
    var username = utilities.nicknameOrArg(arg, msg.member.displayName)
    nemsis.getUserLimits(username.toLowerCase(), (limits) => {
        if (limits === 404) {
            msg.channel.send("can't find that user")
        } else {
            var embed = new Discord.RichEmbed()
                .setAuthor("pikami#0050")
                .setColor("#4169e1")
                .addField("Nims spent/limit", `${utilities.commaSeparater(limits.amount)}/${utilities.commaSeparater(limits.limit)}`)
                .setFooter("©[REDACTED]#1227")
            msg.channel.send(embed)
        }
    });
}




exports.posts = function (msg) {
    var arg = msg.content.slice(6).replace(" ", "_")
    var username = utilities.nicknameOrArg(arg, msg.member.displayName)
    nemsis.getUserPosts(username.toLowerCase(), function (posts) {
        if (posts === 404) {
            msg.channel.send("can't find that user")

        } else {
            posts.items.forEach(function (post) {
                var embed = new Discord.RichEmbed()
                    .setTitle("Post: ")
                    .setAuthor("[REDACTED]#1227")
                    .setColor("#4169e1")
                    .setImage(post.photo)
                    .addField("text: ", post.text)
                    .setFooter("©[REDACTED]#1227")
                msg.channel.send(embed)
            })
        }
    })
}

exports.globalData = function (msg) {
    var data = nemsis.getGlobalData(function (data) {
        var embed = new Discord.RichEmbed()
            .setTitle("Global Data")
            .setAuthor("[REDACTED]#1227")
            .setColor("#4169e1")
            .addField("Total global nims: ", utilities.commaSeparater(data.nims))
            .addField("'Nims Delta' (don't know what this means): ", utilities.commaSeparater(data.nimsDelta))
            .addField("Total global Dominims: ", utilities.commaSeparater(data.dominims))
            .addField("Average temple income: ", utilities.commaSeparater(data.averageTempleIncome))
            .addField("'Emitted wallets' (also don't know what this means): ", utilities.commaSeparater(data.emittedWallets))
            .addField("Active temples : ", utilities.commaSeparater(data.activeTemples))
            .addField("Angels count: ", utilities.commaSeparater(data.angelsCount))
        msg.channel.send(embed)
    })
}
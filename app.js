var nemsis = require('./api')
const Discord = require('discord.js');
const client = new Discord.Client();
var keepAlive = require('./keepalive');

var useKeepAlive = true;

if (useKeepAlive === "true") {
  keepAlive.run()
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('?user')) {
    var args = msg.content.split(" ")
    if (!args[1] || /^\s*$/.test(args[1])) {
      msg.reply("please add username")
    } else {
      nemsis.getUserInfo(args[1], function(user) {
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
  }
  if (msg.content.includes("get.nimses")) {
    if (msg.deletable) {
      msg.delete()
    }
    msg.reply("please use profile link instead, ?profile <nimses-username>")
  }
  if (msg.content.startsWith("?profile")) {
    var args = msg.content.split(" ");
    if (!args[1] || /^\s*$/.test(args[1])) {
      msg.reply("please add username")
    } else {
      msg.channel.send(`https://web.nimses.com/profile/${args[1]}`);
    }
  }
  if (msg.content.startsWith("?limits")) {
    var args = msg.content.split(" ");
    if (!args[1] || /^\s*$/.test(args[1])) {
      msg.reply("please add username")
    } else {
      nemsis.getUserLimits(args[1].toLowerCase(), (limits) => {
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
  }
  if (msg.content.startsWith("?posts")) {
    var args = msg.content.split(" ");
    if (!args[1] || /^\s*$/.test(args[1])) {
      msg.reply("please add username")
    } else {
      nemsis.getUserPosts(args[1].toLowerCase(), function(posts) {
        posts.items.forEach(function(post) {
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

  }
  if(msg.content.startsWith("?warn")){
    var args = msg.content.split(",")
    var list = msg.guild.channels.find("name","warned-list")
    var embed = new Discord.RichEmbed()
      .setTitle("warning")
      .setColor("#FF0000")
      .setAuthor("[REDACTED]#1227")
      .addField("warner: ",msg.author.tag)
      .addField("The warned: ",msg.mentions.members.first())
      .addField("The reason: ",args[2])
    client.guilds.get(msg.guild.id).channels.get(list.id).send(embed)    
  }
});

client.login("NTg4ODA3ODI5ODQ3Mjc3NTY5.XQKgTg.ytMHKN-L98b_AH8toJHS6wT4KyA");

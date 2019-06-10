var nemsis = require('./api')
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
var keepAlive = require('./keepalive');

var useKeepAlive = process.env.USEKEEPALIVE;

if (useKeepAlive === "true") {
  keepAlive.run()
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('?user')) {
    args = msg.content.split(" ")
    nemsis.getUserInfo(args[1], function(user) {
      if (user != 404) {
        var embed = {
          title: "user info",
          description: "shows user info and stuff",
          color: 3447003,
          author: {
            name: "[REDACTED]#1227"
          },
          fields: [
            {
              name: "username: ",
              value: user.profile.nickName
            },
            {
              name: "avatar: ",
              value: user.profile.avatar
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
        msg.channel.sendEmbed(embed)
      }
      else {
        msg.channel.send("can't find that user")
      }

    })
  }
  if (msg.content.includes("get.nimses")) {
    if (msg.deletable) {
      msg.delete()
    }
    msg.reply("please use profile link instead, ?profile <nimses-username>")
  }
  if (msg.content.startsWith("?profile")) {
    args = msg.content.split(" ");
    msg.channel.send(`https://web.nimses.com/profile/${args[1]}`);
  }
  if (msg.content.startsWith("?posts")) {
    args = msg.content.split(" ");
    console.log("check")
    nemsis.getUserPosts(args[1],function(posts){
      console.log("chec")
      console.log(args)
      posts.items.forEach(function(post){
        console.log("che")
        var embed = {
          title: "user info",
          description: "shows user info and stuff",
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
       msg.channel.sendEmbed(embed)
    })
    })
    
  }
});

client.login(process.env.TOKEN);

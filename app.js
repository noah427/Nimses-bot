var nemsis = require('./api')
const Discord = require('discord.js');
const client = new Discord.Client();
var keepAlive = require('./keepalive');
const { inspect } = require('util');
var utilities = require('./utilities')
var useKeepAlive = process.env.USEKEEPALIVE;
const dotenv = require(`dotenv`).config()


if (useKeepAlive === "true") {
  keepAlive.run()
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content.startsWith('?user')) {
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
  if (msg.content.includes("get.nimses")) {
    if (msg.deletable) {
      msg.delete()
    }
    msg.reply("please use profile link instead, ?profile <nimses-username>")
  }
  if (msg.content.startsWith("?profile")) {
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(msg)
    msg.channel.send(`https://web.nimses.com/profile/${username}`);
  }
  if (msg.content.startsWith("?limit")) {
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
  if (msg.content.startsWith("?posts")) {
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
  if (msg.author.id == "450429165200736256" && msg.content.startsWith("?eval")) {
    try {
      const code = msg.content.slice(5);
      let evaled = await eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      if (evaled == "Promise { <pending> }") {

      } else {
        await msg.channel.send(utilities.clean(evaled), { code: "xl" });
      }
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${utilities.clean(err)}\n\`\`\``);
    }
  }
  if(msg.content == "?help"){
    msg.channel.send("```"+`
    ?user <username> : shows user info
    ?limit <username> : shows your nim spending limit and how much you have spent
    ?posts <username> : shows your posts
    ?profile <username> : links your profile for easy 
    
    -----------------
    all of these ^ commands can be used without the username
    if your nickname is your nimses username!
    `+"```")
  }
});


client.login(process.env.TOKEN);

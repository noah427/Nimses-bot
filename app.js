var nemsis = require('./api')
const Discord = require('discord.js');
const client = new Discord.Client();
const { inspect } = require('util');
var utilities = require('./utilities')
const dotenv = require(`dotenv`).config()

var config = {
  prefix: "?",
  partneredServers: [
    "593210721517699083",
    "591039202913812480",
    "589825043777847297",
  ],
  helpMessage : `
  ?user <username> : shows user info
  ?limit <username> : shows your nim spending limit and how much you have spent
  ?posts <username> : shows your posts
  ?profile <username> : links your profile for easy 
  ?info : about + repo + server link
  ?help : shows this message
  
  -----------------
  all of these ^ commands can be used without the username
  if your nickname is your nimses username!

  -----------------

  Creator : [REDACTED]#1227
  `,
  infoMessage : `
  Repo : https://github.com/noah427/nimses-bot
  Server : https://discord.gg/45zHN9Y

  ------------------------------------------
  
  About : 
  Nim-Master shows nimses stats such as daily nim transfer limit
  and how many nims a user has in addition to
  many other useful things such as easy nom4nom profile link
  and showing a users three most recent posts!

  -------------------------------------------

  ?help for commands list

  -------------------------------------------

  Creator : [REDACTED]#1227
  `,
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content.startsWith(config.prefix + 'user')) {
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
  if (msg.content.startsWith(config.prefix + "profile")) {
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(msg)
    msg.channel.send(`https://web.nimses.com/profile/${username}`);
  }
  if (msg.content.startsWith(config.prefix + "limit")) {
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
  if (msg.content.startsWith(config.prefix + "posts")) {
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
  if (msg.author.id == "450429165200736256" && msg.content.startsWith(config.prefix + "eval")) {
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
  if (msg.content == config.prefix + "help") {
    msg.channel.send("```" + config.helpMessage+ "```")
  }
  if(msg.content === config.prefix+"info"){
    msg.channel.send("```" + config.infoMessage + "```")
  }
});




client.login(process.env.TOKEN);

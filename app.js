const Discord = require('discord.js');
const client = new Discord.Client();
const { inspect } = require('util');
var utilities = require('./commands/utilities')
const dotenv = require(`dotenv`).config()
const apiCommands = require('./commands/apiCommands')


var config = {
  prefix: "?",
  partneredServers: [
    "593210721517699083",
    "591039202913812480",
    "589825043777847297",
  ],
  helpMessage: `
  ?user <username> : shows user info
  ?limit <username> : shows your nim spending limit and how much you have spent
  ?posts <username> : shows your posts
  ?profile <username> : links your profile for easy nom4nom
  ?info : about + repo + server link
  ?help : shows this message
  
  -----------------
  all of these ^ commands can be used without the username
  if your nickname is your nimses username!

  -----------------

  Creator : [REDACTED]#1227
  `,
  infoMessage: `
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
    apiCommands.user(msg)
  }
  if (msg.content.includes("get.nimses")) {
    if (msg.deletable) {
      msg.delete()
    }
    msg.reply("please use profile link instead, ?profile <nimses-username>")
  }
  if (msg.content.startsWith(config.prefix + "profile")) {
    var arg = msg.content.slice(9).replace(" ","_")
    var username = utilities.nicknameOrArg(arg,msg.member.displayName)
    msg.channel.send(`https://web.nimses.com/profile/${username}`);
  }
  if (msg.content.startsWith(config.prefix + "limit")) {
    apiCommands.limit(msg)
  }
  if (msg.content.startsWith(config.prefix + "posts")) {
    apiCommands.posts(msg)
  }
  if(msg.content === config.prefix + "global"){
    apiCommands.globalData(msg)
  }
  if(msg.content === config.prefix + "templestop"){
    msg.channel.send("coming soon")
  }
  if (msg.author.id == "450429165200736256" && msg.content.startsWith(config.prefix + "eval")) {
    const code = msg.content.slice(5);
    utilities.cleanEval(code, msg)
  }
  if (msg.content == config.prefix + "help") {
    msg.channel.send("```" + config.helpMessage + "```")
  }
  if (msg.content === config.prefix + "info") {
    msg.channel.send("```" + config.infoMessage + "```")
  }
  if(msg.content === config.prefix + "servers"){
    msg.channel.send(client.guilds.array().join(",\n"))
  }
});




client.login(process.env.TOKEN);

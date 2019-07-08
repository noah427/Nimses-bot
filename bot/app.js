const Discord = require('discord.js');
const client = new Discord.Client();
const { inspect } = require('util');
var utilities = require('./commands/utilities')
const dotenv = require(`dotenv`).config()
const apiCommands = require('./commands/apiCommands')



var config = {
  prefix: "?",
  ownerID : "450429165200736256",
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
  ?global : shows global nimses info
  ?servers : shows which servers the bot is in
  ?statusrole <username> : gives you the role for the status you have on nimses partnered server only
  ?templestop : coming very soon will show top temples info
  
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
  rolesToMake : [
    ["icon","RED"],
    ["angel", "#ff0066"],
    ["indie","ORANGE"],
    ["persona","#ffcc00"],
    ["human","GREEN"],
    ["user","GREY"],
  ],
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
    var arg = msg.content.slice(9).replace(" ", "_")
    var username = utilities.nicknameOrArg(arg, msg.member.displayName)
    msg.channel.send(`https://web.nimses.com/profile/${username}`);
  }


  if (msg.content.startsWith(config.prefix + "limit")) {
    apiCommands.limit(msg)
  }



  if (msg.content.startsWith(config.prefix + "posts")) {
    apiCommands.posts(msg)
  }



  if (msg.content === config.prefix + "global") {
    apiCommands.globalData(msg)
  }



  if (msg.content === config.prefix + "templestop") {
    msg.channel.send("coming soon")
  }



  if (msg.author.id == "450429165200736256" && msg.content.startsWith(config.prefix + "eval")) {
    const code = msg.content.slice(5);
    try {
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
    msg.channel.send("```" + config.helpMessage + "```")
  }



  if (msg.content === config.prefix + "info") {
    msg.channel.send("```" + config.infoMessage + "```")
  }




  if (msg.content === config.prefix + "servers") {
    msg.channel.send(client.guilds.array().join(",\n"))
  }

  

  if(msg.content.startsWith(config.prefix + "statusrole" && config.partneredServers.includes(msg.guild.id))){
    apiCommands.statusRoles(msg)
  }


  if(msg.content === config.prefix + "configroles" && config.partneredServers.includes(msg.guild.id) && msg.author.id === config.ownerID){
    for (let i = 0;i < config.rolesToMake.length;i++){
      msg.guild.createRole({
        name: config.rolesToMake[i][0],
        color: config.rolesToMake[i][1],
        hoist : true,
      })
    }
  }

  
});




client.login(process.env.TOKEN);

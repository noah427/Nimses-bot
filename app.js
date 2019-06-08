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
       nemsis.getUserInfo(args[1], function(user){
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
       })
    }
});
  
client.login(process.env.TOKEN);
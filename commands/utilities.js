
var exports = module.exports = {}



exports.clean = function (text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}



exports.nicknameOrArg = function (msg) {
    var args = msg.content.split(" ")
    if (!args[1] || /^\s*$/.test(args[1])) {
        return msg.member.displayName
    } else return args[1]
}


exports.cleanEval = async function (code,msg) {
    try {
        let evaled = await eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        if (evaled == "Promise { <pending> }") {

        } else {
            await msg.channel.send(exports.clean(evaled), { code: "xl" });
        }
    } catch (err) {
        msg.channel.send(`\`ERROR\` \`\`\`xl\n${exports.clean(err)}\n\`\`\``);
    }
}

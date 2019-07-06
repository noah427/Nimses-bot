
var exports = module.exports = {}



exports.clean = function (text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}



exports.nicknameOrArg = function (arg,displayName) {
    var arg = msg.content.slice(6).replace(" ","_")
    if (!arg || /^\s*$/.test(arg)) {
        return msg.member.displayName
    } else return arg
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

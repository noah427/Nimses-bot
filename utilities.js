
var exports = module.exports = {}

exports.clean = function (text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

exports.nicknameOrArg = function(msg){
    if(!args[1] || /^\s*$/.test(args[1])){
        return msg.author.displayName
    } else return args[1]
}

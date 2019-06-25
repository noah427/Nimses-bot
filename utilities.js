
var exports = module.exports = {}

exports.clean = function (text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

exports.nicknameOrArg = function(msg){
    var args = msg.content.split(" ");
    var username = utilities.nicknameOrArg(args)
      ? msg.member.displayName
      : args[1];
    return username
}

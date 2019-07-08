
var exports = module.exports = {}



exports.clean = function (text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

exports.commaSeparater = function (val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

exports.findNimsesRole = function(level,status){
    if(level === 0){
        return "user"
    } else if(level === 1 && status === 0){
        return "human"
    } else if(status === 1){
        return "persona"
    } else if(status === 2){
        return "indie"
    } else if(status === 3){
        return "angel"
    } else if(status === 4){
        return "icon"
    } else return "don't know"
}

exports.nicknameOrArg = function (arg, displayName) {
    if (!arg || /^\s*$/.test(arg)) {
        return displayName
    } else return arg
}



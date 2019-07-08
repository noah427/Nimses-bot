
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

exports.nicknameOrArg = function (arg, displayName) {
    if (!arg || /^\s*$/.test(arg)) {
        return displayName
    } else return arg
}



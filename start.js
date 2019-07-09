var cach = require("cach");

const dotenv = require(`dotenv`).config()
var useKeepAlive = process.env.USEKEEPALIVE;
var keepAlive = require('./keepalive.js')




if (useKeepAlive === "true") {
    keepAlive.run()
}

cach("node bot/app.js")

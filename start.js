var cach = require("cach");

const dotenv = require(`dotenv`).config()
var useKeepAlive = process.env.USEKEEPALIVE;




if (useKeepAlive === "true") {
    keepAlive.run()
}

cach("node bot/app.js")
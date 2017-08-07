module.exports.run = async (bot, message, args) => {
    const request = require("request");

    var r = request.get('https://c.xkcd.com/random/comic/', function (err, res, body) {
        message.channel.send(r.uri.href);
    });
}

module.exports.help = {
    name: "xkcd",
    args: "n/a",
    notes: "Sends random XKCD commic"
}
const request = require("request");

module.exports.run = async (bot, message, args) => {
    var r = request.get('https://c.xkcd.com/random/comic/', function (err, res, body) {
        message.channel.send(r.uri.href);
    });
}

module.exports.help = {
    name: "xkcd",
    usage: "xkcd",
    desc: "Sends some random XKCD commic",
    ex: "xkcd"
}
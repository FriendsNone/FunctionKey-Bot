const request = require("request");

module.exports.run = async (bot, message, args) => {
    let comma = message.content.split(",");
    
    var kind = comma[0];
    var title = comma[1];

    if(kind.indexOf("search") >= 0) {
        var r = request.get(`https://en.wikipedia.org/wiki/${title}`, function (err, res, body) {
            message.channel.send(r.uri.href);
        });
    } else if(!kind.indexOf("search") >= 0) {
        var r = request.get('https://en.wikipedia.org/wiki/Special:Random', function (err, res, body) {
            message.channel.send(r.uri.href);
        });
    }
}

module.exports.help = {
    name: "wiki",
    usage: "wiki",
    desc: "Sends a random artile from Wikipedia",
    ex: "wiki"
}
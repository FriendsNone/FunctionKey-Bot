const request = require("request");

module.exports.run = async (bot, message, args) => {
    var query =  message.content.split("~")[1];

    if(!query) {
        message.channel.send("I suggest not searching for that. You'll never know, it might pop up some unexplainable entity.")
    } else {
        var r = request.get(`https://en.wikipedia.org/wiki/${query}`, function (err, res, body) {
            message.channel.send(r.uri.href);
        });
    }
}

module.exports.help = {
    name: "search",
    usage: "search ~[query]",
    desc: "Hey! Look! It searches something from Wikipedia!",
    ex: "search ~Dark Souls"
}

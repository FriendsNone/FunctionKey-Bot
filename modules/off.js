module.exports.run = async (bot, message, args) => {
    var config = require("../config.json");

    if (message.author.id !== config.HOST) {
        return message.channel.send("I'll turn you off instead.");
    } else {
        message.channel.send("~~I shall rise~~ **BOO!** What a ripoff...").then(function () {
            process.exit(0)
        });
    }
}

module.exports.help = {
    name: "off",
    args: "n/a",
    notes: "It's only weakness"
}
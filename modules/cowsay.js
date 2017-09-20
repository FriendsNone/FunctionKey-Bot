module.exports.run = async (bot, message, args) => {
    const cowsay = require("cowsay");
    
    message.channel.send("```\n" + cowsay.say({text : message.content.split("~")[1]}) + "```")
}

module.exports.help = {
    name: "cowsay",
    args: "~[words]",
    notes: "Linux users! cowsay is here!"
}
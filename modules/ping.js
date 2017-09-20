module.exports.run = async (bot, message, args) => {
    const fortune = require('fortune-teller')
    
    message.channel.send(Math.round(bot.ping) + "ms```\n" + fortune.fortune() + "```")
}

module.exports.help = {
    name: "ping",
    args: "n/a",
    notes: "A very simple ping command."
}
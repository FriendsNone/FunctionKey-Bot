module.exports.run = async (bot, message, args) => {
    message.channel.send(`Haha! I won by ${bot.ping}ms!`);
}

module.exports.help = {
    name: "ping"
}
module.exports.run = async (bot, message, args) => {
    var responses = [
        "Hey! I'm alive!",
        'Much better than "Hello World!"',
        "Don't expect me to reply with `pong`",
        "Tennis!",
        "Badminton!",
        "Table Tennis!"
    ]
    
    message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]} | ${Math.round(bot.ping)}ms`);
}

module.exports.help = {
    name: "ping",
    args: "n/a",
    notes: "A very simple ping command."
}
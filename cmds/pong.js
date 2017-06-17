module.exports.run = async (bot, message, args) => {
    message.channel.send("Have you tried `ping`? It's cool!");
}

module.exports.help = {
    name: "pong",
    usage: "pong",
    desc: "Another popular and common command!",
    ex: "pong"
}

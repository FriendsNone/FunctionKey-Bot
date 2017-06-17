module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Nothing to calculate.");

    try {
        message.channel.send(eval(args[0]));
    } catch (err) {
        message.channel.send("There might be an error on your equation.")
    }
}

module.exports.help = {
    name: "calc",
    usage: "calc [equation]",
    desc: "Too lazy for calculators? Use this!",
    ex: "calc 1+1"
}

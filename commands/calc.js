module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Hidden numbers are cool! Isn't it?");

    if (args[0] == "message", "bot", "console", "process") return message.channel.send("I has pound haxz!");

    try {
        message.channel.send(eval(args[0]));
    } catch (err) {
        message.channel.send("Try sovling it on paper!")
    }
}

module.exports.help = {
    name: "calc",
    usage: "calc [equation]",
    desc: "Too lazy for calculators? Use this!",
    ex: "calc 1+1"
}

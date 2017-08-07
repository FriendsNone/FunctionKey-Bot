module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        return message.channel.send("I'm pretty sure that the answer for that is 0");
    } else if (args[0].indexOf("message", "bot", "console", "process") >= 0 ) {
        return message.channel.send("Come on! I know you can do better than that.");
    } else {
        try {
            message.channel.send(eval(args[0]));
        } catch (err) {
            message.channel.send("Try sovling it by hand. I'm pretty sure you can do that.");
        }
    }
}

module.exports.help = {
    name: "calc",
    args: "[equation]",
    notes: "It solves equations (can be inacurate)"
}

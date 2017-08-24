module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const math = require("mathjs");
    const config = require("../config.json");

    try {
        var embed = new Discord.RichEmbed()
            .addField("Equation:", args[0])
            .addField("Answer:", math.eval(args[0]))
            .setColor([config.COLORS.RED, config.COLORS.GREEN, config.COLORS.BLUE])
        message.channel.send({ embed });
    } catch (err) {
        var embed = new Discord.RichEmbed()
            .addField("Error:", err)
            .addField("Equation:", args[0])
            .setColor([config.COLORS.RED, config.COLORS.GREEN, config.COLORS.BLUE])
        message.channel.send({ embed });
    }
}

module.exports.help = {
    name: "math",
    args: "[equation]",
    notes: "It solves equations (can be inacurate)"
}

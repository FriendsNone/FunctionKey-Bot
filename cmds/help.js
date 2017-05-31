const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}'s List of commands`, bot.user.avatarURL, "https://github.com/FriendsNone/NoneBot")
            .setDescription(`All of these commands are prefixed with ${config.prefix}`)
            .addField("Useful commands", "ping \nask \nuinfo", true)
            .addField("Music commands", "play \nskip \nstop", true)
            .addField("Boring commands", "help", true)
            .setColor("BLUE")
            .setTimestamp()
        message.channel.send({ embed });
    } else try {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}'s ${args[0]} command`, bot.user.avatarURL, "https://github.com/FriendsNone/NoneBot")
            .addField("Usage:", `${bot.commands.get(args[0]).help.usage}`, true)
            .addField("Description:", `${bot.commands.get(args[0]).help.desc}`, true)
            .setColor("BLUE")
            .setTimestamp()
        message.channel.send({ embed });
    } catch (err) {
        message.channel.send("Unknown Command");
    }
}

module.exports.help = {
    name: "help",
    usage: "help [command]",
    desc: "Your traditional help."
}

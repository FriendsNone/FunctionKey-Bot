const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}'s List of commands`, bot.user.avatarURL, "https://github.com/FriendsNone/NoneBot")
            .setDescription(`All of these commands are prefixed with ${config.prefix}`)
            .addField("Useful Commands", "ask \ncalc \nroll \nsay \nxkcd", true)
            .addField("Music Commands", "play \nskip \nstop", true)
            .addField("Informative Commands", "help \nping \nsearch \nuinfo \nstats", true)
            .addField("Staff Commands", "mute \noff \numute", true)
            .setFooter("Problems? Issues? Suggestions? Click the link in the title.")
            .setColor("BLUE")
            .setTimestamp()
        message.channel.send({ embed });
    } else try {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}'s ${args[0]} command`, bot.user.avatarURL, "https://github.com/FriendsNone/NoneBot")
            .addField("Usage:", `${bot.commands.get(args[0]).help.usage}`, true)
            .addField("Example:", `${config.prefix}${bot.commands.get(args[0]).help.ex}`, true)
            .addField("Description:", `${bot.commands.get(args[0]).help.desc}`)
            .setFooter("Problems? Issues? Suggestions? Click the link in the title.")
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
    desc: "Your traditional help.",
    ex: `help ping`
}

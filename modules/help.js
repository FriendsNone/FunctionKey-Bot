module.exports.run = async (bot, message, args) => { 
    const Discord = require("discord.js");
    const config = require("../config.json");

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username} ${config.version} command list`, bot.user.avatarURL, "https://github.com/FriendsNone/FunctionKey-Bot")
            .setDescription(`Don't forget. All commands must be prefixed with ${config.prefix}`)
            .addField("Fun Commands", "ask\ncalc\nroll\nsearch\nxkcd", true)
            .addField("Music Commands", "play\nskip\nstop", true)
            .addField("Usual Commands", "about\nhelp\noff\nping\nstats", true)
            .setColor("BLUE")
            .setTimestamp()
        message.channel.send({ embed })
    } else try {
        let embed = new Discord.RichEmbed()
            .setAuthor("Viewing help for `" + args[0] + "`", bot.user.avatarURL)
            .addField("Parameters:", `${bot.commands.get(args[0]).help.args}`, true)
            .addField("Description:", `${bot.commands.get(args[0]).help.notes}`, true)
            .setColor("BLUE")
            .setFooter(`Parameters encased in parentheses are optional | ${bot.user.username} ${config.version}`)
        message.channel.send({ embed });
    } catch (err) {
        message.channel.send("Error 404: No need to say it. You already know what this means.");
    }
}

module.exports.help = {
    name: "help",
    args: "(command)",
    notes: "Shows the list of commands"
}
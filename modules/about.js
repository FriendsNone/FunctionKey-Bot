module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const config = require("../config.json");

    let embed = new Discord.RichEmbed()
        .setTitle(`${bot.user.username} ${config.version}`)
        .setDescription(`A WIP fun Discord bot made by a lazy person.`)
        .addField("Git Repository:", "https://github.com/FriendsNone/FunctionKey-Bot")
        .addField("Readme:", "https://github.com/FriendsNone/FunctionKey-Bot/blob/master/README.md")
        .addField("Licence:", "https://github.com/FriendsNone/FunctionKey-Bot/blob/master/LICENSE")     
        .addField("Issues", "https://github.com/FriendsNone/FunctionKey-Bot/issues")
        .setFooter("<> by a lazy person filled with <3! c:")
        .setThumbnail(bot.user.avatarURL)
        .setColor([251, 194, 26])
    message.channel.send({ embed });
}

module.exports.help = {
    name: "about",
    args: "n/a",
    notes: "About this bot."
}
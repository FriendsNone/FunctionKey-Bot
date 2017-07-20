const Discord = require("discord.js");
const keyVersion = require("../bot.js").keyVersion;

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username} ${keyVersion}`, bot.user.avatarURL, "https://github.com/FriendsNone/FunctionKey-Bot")
            .setDescription(`A WIP fun Discord bot made by a lazy person.`)
            .addField("Readme:", "https://github.com/FriendsNone/FunctionKey-Bot/blob/master/README.md")
            .addField("Copyrights:", "https://github.com/FriendsNone/FunctionKey-Bot/blob/master/LICENSE")
            .setFooter("<> with pure lazyness and lots of <3! c:")
            .setColor([255, 255, 255])
        message.channel.send({ embed });
}

module.exports.help = {
    name: "about",
    usage: "about",
    desc: "Tells you about FnKey-Bot",
    ex: "about"
}
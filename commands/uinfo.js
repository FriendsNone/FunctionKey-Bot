const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let userInf = message.mentions.users.first() || message.guild.members.get(args[0]);

    if(!userInf) return message.channel.send("I think this user is magic!");

    let embed = new Discord.RichEmbed()
        .setAuthor(`${userInf.tag}'s Information`)
        .addField("User ID:", userInf.id)
        .addField("User created at:", userInf.createdAt)
        .setThumbnail(userInf.avatarURL)
        .setTimestamp()
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "uinfo",
    usage: "uinfo [user]",
    desc: "Sends the user's information in a nice  little embed.",
    ex: "uinfo @User"
}

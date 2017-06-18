const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let userInf = message.mentions.users.first() || message.guild.members.get(args[0]);

    if(!userInf) return message.channel.send("Can't get user's information.");

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
    desc: "Gives user's information in a nice embed.",
    ex: "uinfo @User"
}

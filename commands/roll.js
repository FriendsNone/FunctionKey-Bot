const Discord = require("discord.js");
    
module.exports.run = async (bot, message, args) => {
    var x = Math.floor(Math.random() * ((args[0] - 1) + 1) + 1);

    if(!args[0] || args[0] == 0) {
        message.channel.send("Rolling an infinity dice... Halp!");
    } else {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.username} rolled a ${args[0]} sided dice.`, bot.user.avatarURL)
            .setDescription(x)
            .setTimestamp()
        message.channel.send({ embed });
    }
}

module.exports.help = {
    name: "roll",
    usage: "roll",
    desc: "Love board games? Roll your way to victory with this command!",
    ex: "roll"
}

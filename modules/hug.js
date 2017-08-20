module.exports.run = async (bot, message, args) => {
    var mention = message.mentions.users.first() || message.guild.members.get(args[0]);
    
    if (!mention) {
        message.channel.send(`*hugs <@${message.author.id}>*`);
    } else {
        message.channel.send(`*hugs <@${mention.id}>*`)
    }
}

module.exports.help = {
    name: "hug",
    args: "(user)",
    notes: "Gives a warm hug."
}
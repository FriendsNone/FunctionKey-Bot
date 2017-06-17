const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let comma = message.content.split(",");
    
    var kind = comma[0];
    var title = comma[1];
    var desc = comma[2];

    if(kind.indexOf("embed") >= 0) {
        let embed = new Discord.RichEmbed()
            .setTitle(title)
            .setDescription(desc)      
        message.channel.send({ embed })
    } else if(kind.indexOf("code") >= 0) {
        message.channel.send("`" + title + "`");
    } else if(kind.indexOf("multi") >= 0) {
        message.channel.send("```\n" + title + "```");
    } else if(kind.indexOf("text") >= 0) {
        message.channel.send(title);
    } else if(!kind.indexOf("text", "code", "multi", "embed") >= 0) {
        message.channel.send("Didn't understand that");
    }
}

module.exports.help = {
    name: "say",
    usage: "say [text,code,multi,embed], [text1], [text2]",
    desc: `Makes the bot say anything you want! Note: [text2] is used for [embed]`,
    ex: "say embed, Can I haz cakes, No"
}
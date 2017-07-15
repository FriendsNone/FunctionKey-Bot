const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let splits = message.content.split(",");

    var type = splits[0];
    var textA = splits[1];
    var textB= splits[2];

    if(type.indexOf("embed") >= 0) {
        let embed = new Discord.RichEmbed()
            .setTitle(textA)
            .setDescription(textB)
        message.channel.send({ embed })
    } else if(type.indexOf("code") >= 0) {
        message.channel.send("`" + textA + "`");
    } else if(type.indexOf("multi") >= 0) {
        message.channel.send("```\n" + textA + "```");
    } else if(type.indexOf("text") >= 0) {
        message.channel.send(textA);
    } else if(!type.indexOf("text", "code", "multi", "embed") >= 0) {
        message.channel.send("You didn't specify the type of formatting.");
    }
}

module.exports.help = {
    name: "say",
    usage: "say [text,code,multi,embed], [text1], [text2]",
    desc: `Makes the bot say anything you want! Note: [text2] is used for [embed]`,
    ex: "say embed, Can I haz cakes, No"
}

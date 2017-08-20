module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const ddg = require("ddg");
    const config = require("../config.json");
    
    var query =  message.content.split("~")[1];

    if (!query) {
        message.channel.send("I suggest not searching for that. You'll never know, it might pop up some unexplainable entity.");
    } else {
        ddg.query(query, function(err, data) {
             if (data.AbstractText == '') {
                 message.channel.send(`Try to be specific. I'll give you this instead. \n${data.AbstractURL}`);
             } else {
                let embed = new Discord.RichEmbed()
                    .setAuthor(query)
                    .setDescription(data.AbstractText)
                    .setThumbnail(data.Image)
                    .setColor([config.COLORS.RED, config.COLORS.GREEN, config.COLORS.BLUE])
                    .setFooter(`Source: ${data.AbstractURL}`)
                message.channel.send("Here's what I got!", { embed })
            }
        });
    }
}

module.exports.help = {
    name: "search",
    args: "~[query]",
    notes: "Searches something on the web."
}
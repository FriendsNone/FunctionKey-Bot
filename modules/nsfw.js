module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const booru = require("booru");
    const config = require("../config.json");

    var query =  message.content.split("~");
    if (message.channel.nsfw == false) {
        message.channel.send("**AHEM!** Don't you have any manners? You don't want to get these poor souls corrupted. Right?")
    } else {
        booru.search("r34", [query[1], query[2]], {limit: 1, random: true}).then(booru.commonfy).then(images => {
            for (let image of images) {
                if (image.common.file_url.indexOf(".webm") !== -1) {
                    return message.channel.send(`Discord can't preview a WEBM file. Soo, here's the URL\n${image.common.file_url}`);
                } else {
                    let embed = new Discord.RichEmbed()
                        .setImage(image.common.file_url)
                        .setColor([config.COLORS.RED, config.COLORS.GREEN, config.COLORS.BLUE])
                        .setFooter(`Requested by: ${message.author.tag}`)
                        if (!query[1]) {
                            embed.setTitle(`Random!`)
                        } else if (!query[2]) {
                            embed.setTitle(`Tag: ${query[1]}`)
                        } else {
                            embed.setTitle(`Tags: ${query[1]}, ${query[2]}`)
                        }
                    message.channel.send({ embed })
                }
            }
        }).catch(err => {
            if (err.name === 'booruError') {
                message.channel.send("Seems like you're not getting any NSFW goodness.")
                console.log(err.message)
            } else {
                //This means I messed up. Whoops.
                console.log(err)
            }
        })
    }
}

module.exports.help = {
    name: "nsfw",
    args: "~(tag 1) ~(tag 2)",
    notes: "For those corrupted people out there."
}
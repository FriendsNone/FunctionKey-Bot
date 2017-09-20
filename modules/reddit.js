module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const snoowrap = require("snoowrap");
    const config = require("../config.json");

    const r = new snoowrap({
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
        clientId: 'HsZBxfAwt70C8Q',
        clientSecret: 'QG_BCsV5feQn6btwcLxRhZJyoqQ',
        refreshToken: '30679160-t71w-dAtjSwlINkBuLTCOHebEGw'
    });

    if (!args[0]) return message.channel.send("Subreddit please!")

    r.getSubreddit(args[0]).getRandomSubmission().then(function(something) {        
        if (!something.title) return message.channel.send("Can't seem to find this subreddit")
        
        if (something.over_18 == true) {
            if (message.channel.nsfw == false) {
                message.delete()
                message.channel.send("Might be better not to do this here.")
            } else {
                message.channel.send(`**${something.title}**\n${something.url}`)
            }
        } else {
            message.channel.send(`**${something.title}**\n${something.url}`)
        }
    });
}

module.exports.help = {
    name: "reddit",
    args: "[subreddit]",
    notes: "Gets random posts on a subreddit"
}
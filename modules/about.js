module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const GitHubApi = require("github");
    const config = require("../config.json");

    const github = new GitHubApi({
        version: "3.0.0"
    });
    
    github.repos.getCommits({
        owner: "FriendsNone",
        repo: "FunctionKey-Bot"
    }, function(err, res) {
        let embed = new Discord.RichEmbed()
            .setTitle(`${bot.user.username} ${config.VERSION}`)
            .setDescription(`A WIP fun Discord bot made by a lazy person.`)
            .addField("Git Repository:", "https://github.com/FriendsNone/FunctionKey-Bot")
            .addField("Latest Commit:", `${res.data[0].commit.author.name} at ${new Date(res.data[0].commit.author.date).toUTCString()}\n**${res.data[0].commit.message}**`)
            .setFooter("<> by a lazy person filled with <3! c:")
            .setThumbnail(bot.user.avatarURL)
            .setColor([config.COLORS.RED, config.COLORS.GREEN, config.COLORS.BLUE])
        message.channel.send({ embed });
    })
}

module.exports.help = {
    name: "about",
    args: "n/a",
    notes: "About this bot."
}
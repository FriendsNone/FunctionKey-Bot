module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const os = require("os");
    const config = require("../config.json");
    
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }

    var time1 = process.uptime();
    var uptime1 = (time1 + "").toHHMMSS();
    var time2 = os.uptime();
    var uptime2 = (time2 + "").toHHMMSS();
    
    let embed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username} v${config.version} stats`, bot.user.avatarURL)
        .addField("CPU Usage:", `User: ${process.cpuUsage().user}μs \nSystem: ${process.cpuUsage().system}μs`, true)
        .addField("Memory Usage:", `Free: ${os.freemem()} B \nTotal: ${os.totalmem()} B`, true)
        .addField("Uptime:", `Bot: ${uptime1} \nSystem: ${uptime2}`, true)
        .addField("System:", `CPU: ${process.env.PROCESSOR_IDENTIFIER} (x${process.env.NUMBER_OF_PROCESSORS}) \nOS: ${os.type()} (${os.release()}) ${os.arch()} \nNode.js Version: ${process.version} \nIdentity: ${process.env.COMPUTERNAME} | ${process.env.USERNAME}`, true)
        .setColor("GREEN")
        .setTimestamp()
    message.channel.send({ embed });
}

module.exports.help = {
    name: "stats",
    args: "n/a",
    notes: "Shows you the current status of the bot."
}
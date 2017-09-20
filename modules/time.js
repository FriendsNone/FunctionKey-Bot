module.exports.run = async (bot, message, args) => {
    const os = require("os");
    
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

    var bot = (process.uptime() + "").toHHMMSS();
    var system = (os.uptime() + "").toHHMMSS();
    
    if (!args[0]) { message.channel.send(`Look at the corners of your screen.`) }
    if (args[0] == "bot") { message.channel.send(`Here! **${bot}**. Can I sleep now?.`); }
    if (args [0] == "sys") { message.channel.send(`Isn't it great when you leave your computer running for **${system}**`); }
}

module.exports.help = {
    name: "time",
    args: "(bot/sys)",
    notes: "Shows you the time and the bot's/system's uptime."
}
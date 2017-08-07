module.exports.run = async (bot, message, args) => {
    const music = require('../music.js');
    var server = music.servers[message.guild.id];

    try {
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    } catch (err) {
        console.log('opusscript caught an error. \n=> ' + err);
    }
}

module.exports.help = {
    name: "stop",
    args: "n/a",
    notes: "Stops and clears playing/queued content"
}
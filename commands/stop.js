var music = require('../music.js');
var servers = music.servers

module.exports.run = async (bot, message, args) => {
    var server = servers[message.guild.id];

    try {
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    } catch (err) {
        console.log("If you see this message, opusscript encountered an error! If possible, use node-opus");
    }
}

module.exports.help = {
    name: "stop",
    usage: "stop",
    desc: "Stops the music from playing.",
    ex: "stop"
}

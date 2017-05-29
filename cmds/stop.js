var servers = {};

module.exports.run = async (bot, message, args) => {
    var server = servers[message.guild.id];
    
    try {
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    } catch (err) {
        console.log("opusscript is drunk again.");
        console.log("note to self. use node-opus");
    }
}

module.exports.help = {
    name: "stop"
}
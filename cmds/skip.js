var music = require('../music.js');
var play = music.play
var servers = music.servers

module.exports.run = async (bot, message, args) => {    
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
}

module.exports.help = {
    name: "skip",
    usage: "skip",
    desc: "Skips currently playing song.",
    ex: "skip"
}

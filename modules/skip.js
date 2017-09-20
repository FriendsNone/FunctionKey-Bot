module.exports.run = async (bot, message, args) => {
    const music = require('../music.js');
    var server = music.servers[message.guild.id];

    if (server.dispatcher) { server.dispatcher.end(); }
}

module.exports.help = {
    name: "skip",
    args: "n/a",
    notes: "Skips currently playing content"
}
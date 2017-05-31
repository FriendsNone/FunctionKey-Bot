var music = require('../music.js');
var play = music.play
var servers = music.servers

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Can't find any music?");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    if(!servers[message.guild.id]) servers[message.guild.id] = { queue: [] };

    var server = servers[message.guild.id];
    server.queue.push(args[0]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) { play(connection, message); });
}

module.exports.help = {
    name: "play",
    usage: "play [link/video id]",
    desc: "Plays your favorite music from YouTube."
}

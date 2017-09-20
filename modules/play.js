module.exports.run = async (bot, message, args) => {
    const music = require('../music.js');
    
    if (!message.member.voiceChannel) { return message.channel.send("You're not joined to a voice channel."); }
    if (!args[0]) { return message.channel.send("It's better to search one yourself. Right?"); }
    if (!music.servers[message.guild.id]) { music.servers[message.guild.id] = { queue: [] }; }

    var server = music.servers[message.guild.id];
    server.queue.push(args[0]);

    if (!message.guild.voiceConnection) {
        message.member.voiceChannel.join().then(function(connection) {
            music.play(connection, message);
        });
    }
}

module.exports.help = {
    name: "play",
    args: "[url/video id]",
    notes: "Plays any content from YouTube"
}
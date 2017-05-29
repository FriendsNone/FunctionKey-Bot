const Discord = require("discord.js");
const ytdl = require("ytdl-core");

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly", quality: "lowest"}));
    ytdl.getInfo(server.queue[0], function(err, info) {
        let embed = new Discord.RichEmbed()
            .setAuthor("Now Playing")
            .setTitle(info.title)
            .setDescription(`Requested by: ${message.author.username}`)      
            .setColor("GREEN")
            .setTimestamp()
        message.channel.send({ embed })
    });

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else try {
            connection.disconnect();
        } catch (e) {
            console.log("[ERROR WARNING] opusscript is drunk again.");
            console.log("[ERROR WARNING] note to self. use node-opus");
        }
    });
}

var servers = {};

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Can't find any music?");
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
    if(!servers[message.guild.id]) servers[message.guild.id] = { queue: [] };

    var server = servers[message.guild.id];
    server.queue.push(args[0]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) { play(connection, message); });
}

module.exports.help = {
    name: "play"
}
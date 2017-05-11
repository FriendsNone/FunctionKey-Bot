//Greetings undead warrior, please enjoy your stay and praise the Sun!

const Discord = require("discord.js"); //The API itself
const YTDL = require("ytdl-core"); //This downloads your favorite music from YouTube.
const { getInfo } = require("ytdl-getinfo"); //This gets the information of your favorite music from Youtube.
const config = require("./config.json"); //It's ze "config file! This is where your put your super secret tokens or favorite prefix.

function play(connection, message) {
    var server = servers[message.guild.id];
    getInfo(server.queue[0]).then(info => {
        var embed = new Discord.RichEmbed()
            .setAuthor("Now Playing")
            .setTitle(info.items[0].title)
            .setTimestamp()
         message.channel.send({ embed })
    });
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly", quality: "lowest"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var eightBall = [
    "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely",
    "You may rely on it", "As I see it, yes", "Most likely", "Outlook good",
    "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later",
    "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it",
    "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"
]

//Some variables that you will ignore :)
var bot = new Discord.Client();
var servers = {};

bot.on("ready", function() {
    console.log("Ready"); //Tells you when the bot is ready
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return; //This will ignore what the bot sends
    if (!message.content.startsWith(config.prefix)) return; //This will ignore any messages that doesn't starts with the prefix

    var args = message.content.substring(config.prefix.length).split(" "); //This splits the messages. Can't explain any further

    switch (args[0].toLowerCase()) { //This makes what mistake you typed (e.g. piNG) to lower case
        case "test": //Want to make a new command? Do it here!
            break;
        
        case "ping": //It's the most popular and common command
            message.channel.send("Pong!");
            break;
        
        case "ask":
            if (args[1]) message.channel.send(eightBall[Math.floor(Math.random() * eightBall.length)]);
            else message.channel.send("I guess I can't read.");
            break;

        case "about": //Uhh... Do I need to explain this?
            var embed = new Discord.RichEmbed()
                .setAuthor("About " + bot.user.username, bot.user.avatarURL)
                .setTitle("FriendsNone's Personal Discord Bot Project!")
                .setTimestamp()
            message.channel.send({ embed });
            break;

        case "info": //This command gives you information about you and sends it in a nice embed
            var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username + "#" + message.author.discriminator + "'s Information")
                .addField("User ID:", message.author.id)
                .addField("User created at:", message.author.createdAt)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp()
            message.channel.send({ embed });
            break;
        
        case "play": //Play something from YouTube will ya.
            if(!args[1]) return message.channel.send("Can't find any music?");
            if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel");
            if(!servers[message.guild.id]) servers[message.guild.id] = { queue: [] };

            var server = servers[message.guild.id];
            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) { play(connection, message); });
            break;

        case "skip": //This command will skip anything, so say good bye to rickrolls in no time!
            var server = servers[message.guild.id];
            message.channel.send("Skipping");
            if (server.dispatcher) server.dispatcher.end();
            break;

        case "stop": //Bored with music? Now you can stop them with this command!
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;

        default: //This will tell you if you entered a wrong command.
            message.channel.send("Invaild command");
    }
});

bot.login(config.token); //This is were the magic happens!
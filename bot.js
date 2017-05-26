//Greetings undead programmer, please enjoy your stay and don't forget to praise the Sun!

const Discord = require("discord.js"); //The API itself
const ytdl = require("ytdl-core"); //This downloads your favorite music from YouTube.
const config = require("./config.json"); //It's ze "config file! This is where your put your super secret tokens or favorite prefix.

function play(connection, message) { //Where all the music magic happens
    var server = servers[message.guild.id];  
    ytdl.getInfo(server.queue[0], function(err, info) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Now Playing")
            .setTitle(info.title)
            .setDescription(`Requested by: ${message.author.username}`)      
            .setColor("GREEN")
            .setTimestamp()
         message.channel.send({ embed })
         console.log(`${message.author.tag} played ${info.title}`);
    });
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly", quality: "lowest"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

function setGame() { //Want your bot to play some games (not really), add some here!'
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
    
    switch (Math.floor(Math.random() * 1000) % 22) {
        //My take on being funny. I know, I totally suck at it.
        case 0:  presence.game.name = "with function keys"; break;
        case 1:  presence.game.name = "winver.exe"; break; //About Windows
        case 2:  presence.game.name = "taskmgr.exe"; break; //Task Manager
        case 3:  presence.game.name = "cmd.exe"; break; //Command Prompt
        case 4:  presence.game.name = "regedt32.exe"; break; //Registry Editor
        case 5:  presence.game.name = "explorer.exe"; break; //Windows Explorer
        case 6:  presence.game.name = "iexplore.exe"; break; //Internet Explorer
        case 7:  presence.game.name = "mspaint.exe"; break; //Paint
        case 8:  presence.game.name = "dxdiag.exe"; break; //DirectX Diagnostic Tool
        case 9:  presence.game.name = "notepad.exe"; break; //Notepad
        case 10: presence.game.name = "devenv.exe"; break; //Microsoft Visual Studio
        case 11: presence.game.name = "chrome.exe"; break; //Google Chrome
        case 12: presence.game.name = "DARKSOULS.exe"; break; //Dark Souls: Prepare to Die Edition
        //Some User suggested stuffs. Thanks guys!
        case 13: presence.game.name = "the quiet game, why don't you play it instead?"; break; //Suggested by Rain
        case 14: presence.game.name = "around with fn key"; break; //Suggested by projsh_
        case 15: presence.game.name = "around with theShell"; break; //Suggested by vicr123
        case 16: presence.game.name = "memememe"; break;  //Suggested (not really) by UnitedShoes
        case 17: presence.game.name = "MEME?!"; break; //Suggested (not really) by bear2602
        case 18: presence.game.name = "music"; break; //Suggested by lolrepeatlol™
        case 19: presence.game.name = "ShiftOS"; break; //Suggested by lolrepeatlol™
        case 20: presence.game.name = "Life: The Game"; break; //Suggested by lolrepeatlol™
        case 21: presence.game.name = "idk"; break; //Suggested (not really) by lolrepeatlol™
    }
    bot.user.setPresence(presence);
}

var eightBall = [ //Used for the !ask command
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
    console.log(`${bot.user.username} is now ready!`); //Tells you when the bot is ready
    bot.setInterval(setGame, 180000); //Changes the "game" every 3 minutes
    setGame(); //i don't know
});

bot.on("guildMemberAdd", function(member) { //This bot has some respect to new users
    member.guild.channels.find("name", "general").send(`Welcome to the server ${member.toString()}`); //Gives a welcome message to the new user
    console.log(`${member.toString()} joined the server`);
});

bot.on("guildMemberRemove", function(member) {
    member.guild.channels.find("name", "general").send(`${member.toString()} left the server`);
    console.log(`${member.toString()} left the server`);
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
        
        case "ask": //Feeling lucky/unlucky? Try asking some questions with !ask
            if (args[1]) message.channel.send(eightBall[Math.floor(Math.random() * eightBall.length)]);
            else message.channel.send("Probably try checking your grammer again.");
            break;

        case "about": //Uhh... Do I need to explain this?
            var embed = new Discord.RichEmbed()
                .setAuthor(`About ${bot.user.username}`, bot.user.avatarURL, "https://github.com/FriendsNone/NoneBot")
                .setTitle("The bot that's fun, awesome, and made by a lazy person")
                .setTimestamp()
            message.channel.send({ embed });
            break;

        case "info": //This command gives you information about you and sends it in a nice embed
            var embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag}'s Information`)
                .addField("User ID:", message.author.id)
                .addField("User created at:", message.author.createdAt)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp()
            message.channel.send({ embed });
            break;

        case "help": //Want help? This will list all of the available commands just for you c;
            var embed = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}'s List of commands`, bot.user.avatarURL, "https://github.com/FriendsNone/NoneBot")
                .setDescription(`All of these commands are prefixed with ${config.prefix}`)
                .addField("Useful commands", "ping \nask \ninfo", true)
                .addField("Music commands", "play \nskip \nstop", true)
                .addField("Boring commands", "help \nabout", true)
                .setColor("BLUE")
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
            if (server.dispatcher) server.dispatcher.end();
            break;

        case "stop": //Bored with music? Now you can stop them with this command!
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;

        case "off":
            message.channel.send("Welp. Nobody coded a prompt. Shutting down!").then(function() {
                console.log(`${message.author.tag} turned off the bot`);
                process.exit(0);
            }).catch(function() {
                console.log(`${message.author.tag} turned off the bot`);
                process.exit(0);
            });
            break;

        default: //This will tell you if you entered a wrong command.
            message.channel.send(`Uhh... Yeah... You might need to look at ${config.prefix}help`);
    }
});

bot.login(config.token); //This is were the magic happens!

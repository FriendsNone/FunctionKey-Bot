/**********************************************************************************
 *  A TL;DR version of the MIT License for FunctionKey-Bot
 *  Copyright (c) 2017 Wizzardo Meowy
 *  
 *  You can use, copy, modify, and/or distribute this software for any
 *  purpose without fee, as long as you credit the owner and have this
 *  notice and the copy of the LICENCE file
 * 
 *  If you got this software/source code for a price. YOU'VE BEENED SCAMED!
 *  ASK FOR A REFUND, ASAP! As this software/source code is available for free
 *  at https://github.com/FriendsNone/FunctionKey-Bot
 **********************************************************************************/

const keyVersion = "2.61"

// Required Dependencies
const Discord = require("discord.js");
const fs = require("fs");
const readline = require("readline");
const prompt = require("prompt");

// Required Files
const config = require("./config.json");
const games = require("./games.js");

const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

var inputs = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Presence Data
function setGame() {
    bot.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            name: games.list[Math.floor(Math.random() * games.list.length)]
        }
    });
}

// Command Modules Loader
fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if(modules.length <= 0) {
        console.log("[WARN] No command modules found. Running bot with no commands.");
        return;
    }

    console.log(`[INFO] Loading ${modules.length} command modules.`);
    modules.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        try {
            bot.commands.set(props.help.name, props);
        } catch (err) {
            console.log("[ERRR] One of your modules are invaild. Please check your modules and re-brun the bot.");
            process.exit(1)
        }
    });

    console.log("[INFO] Finshed loading all command modules.")
});

// Console Interactions
inputs.on("line", function(line) {
    var lLine = line.toLowerCase();

    if (lLine == "exit") {
        console.log("[INFO] Disconnecting from Discord...");
        bot.destroy;
        console.log("[INFO] You can now safely quit the terminal/console application.");
        process.exit();
    } else if (lLine == "invite") {
        bot.generateInvite(['ADMINISTRATOR']).then(link => {
            console.log(`[INFO] Bot's invite like ${link}`)
        });
    } else {
        console.log("[INFO] Hmm... This is new tho. Don't have any plans on working on it.")
    }
});

// Ready Function
bot.on("ready", () => {
    console.log(`[INFO] ${bot.user.username} ${keyVersion} is ready!`);

    setGame();
    bot.setInterval(setGame, 180000);

    bot.setInterval(() => {
        console.log(`[INFO] Bot's ping is ${bot.ping}ms`)
    }, 600000);

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "Muted");

            if(!mutedRole || !guild) continue;

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted`);

                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw err;
                    console.log(`I have unmuted ${member.user.tag}.`);
                }) 
            }
        }
    }, 5000)
});

// Command Handler
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(config.prefix)) return;

    let cmd = bot.commands.get(command.slice(config.prefix.length))
    if(cmd) {
        cmd.run(bot, message, args);
    } else {
        message.channel.send(`I don't think thats a command. Try ${config.prefix}help`);
    }
});

// Login Function
bot.login(config.token).catch(function() {
    console.log("[ERRR] Couldn't connect to Discord. Please check your internet connection.");
    process.exit(1);
});

exports.keyVersion = keyVersion
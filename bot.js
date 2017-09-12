/***************************************************************************
 *  A TL;DR version of the MIT License for FunctionKey-Bot
 *  Copyright (c) 2017 Wizzardo Meowy
 *  
 *  You can use, copy, modify, and/or distribute this software for any
 *  purpose without fee, as long as you credit the owner and have this
 *  notice and the copy of the LICENCE file
 * 
 *  If you got this software/source code for a price. YOU'VE BEENED SCAMED!
 *  ASK FOR A REFUND, ASAP! As this software/source code is available for
 *  free at https://github.com/FriendsNone/FunctionKey-Bot
 ***************************************************************************/

// Required Stuffs
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

// Presence Data
var failbackGame = false;
function setGame() {
    if (fs.existsSync("./games.js")) {
        const games = require("./games.js");

        bot.user.setPresence({
            status: 'online',
            afk: false,
            game: {
                type: 0,
                name: games.list[Math.floor(Math.random() * games.list.length)]
            }
        })
    } else {
        console.log("Can't find the game list. Setting failback game.")
        failbackGame = true;

        bot.user.setPresence({
            status: 'online',
            afk: false,
            game: {
                type: 0,
                name: "rip game list"
            }
        })
    }
}

if(!fs.existsSync("./modules/")) {
	log("Modules folder was not found. Creating it now.")
	fs.mkdirSync("modules/")
}
// Modules Loader
fs.readdir("./modules/", (err, files) => {
    try {
        var modules = files.filter(f => f.split(".").pop() === "js");
    
        if (modules.length <= 0) {
            console.log("No modules found. Running with no modules loaded.");
            return;
        }
    } catch (err) {
        console.log("Modules folder not found. The bot can't run without it.")
        process.exit(1)
    }

    console.log(`Now loading ${modules.length} modules.`)
    modules.forEach((f, i) => {
        let props = require(`./modules/${f}`);
        try {
            bot.commands.set(props.help.name, props);
        } catch (err) {
            console.log('One or more of your modules caused an error. Check your modules and try again. \n=> ' + err);
            process.exit(1)
        }
    })

    console.log(`Finshed loading all ${modules.length} modules.`)
})

// Login Function
if (fs.existsSync("./config.json")) {
    var config = require("./config.json");

    bot.login(config.TOKEN).catch(function() {
        console.log("It seems like we can't connect to Discord. Try again later.")
        process.exit(1)
    });
} else {
    console.log("Config file not found. Nothing will work without that file.")
    process.exit(1)
}

// Ready Function
bot.on("ready", () => {
    console.log(`${bot.user.tag} ${config.VERSION} is ready to rock!`);

    setGame();
    if (failbackGame == false) bot.setInterval(setGame, 300000);
});

// Command Processor
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let array = message.content.split(" ");
    let command = array[0];
    let args  = array.slice(1);

    if (!command.startsWith(config.PREFIX)) return;

    let cmd = bot.commands.get(command.slice(config.PREFIX.length))

    if (cmd) {
        cmd.run(bot, message, args);
    } else {
        message.channel.send("Hmm... I don't think I can run that. Try `" + config.PREFIX + "help`")
    }
});

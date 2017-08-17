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
const config = require("./config.json");
const games = require("./games.js");

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

// Presence Data
function setGame() {
    bot.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            type: 0,
            name: games.list[Math.floor(Math.random() * games.list.length)]
        }
    })
}

// Modules Loader
fs.readdir("./modules/", (err, files) => {
    if (err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        console.log("No modules found. Running with no modules loaded.");
        return;
    }

    console.log(`Now loading ${modules.length} modules.`)
    modules.forEach((f, i) => {
        let props = require(`./modules/${f}`);
        try {
            bot.commands.set(props.help.name, props);
        } catch (err) {
            console.log('One or more of your module caused an error. Check your modules and try again. \n=> ' + err);
            process.exit(1)
        }
    })

    console.log(`Finshed loading all ${modules.length} modules.`)
})

// Ready Function
bot.on("ready", () => {
    console.log(`${bot.user.tag} ${config.version} is ready to rock!`);

    setGame();
    bot.setInterval(setGame, 60000);
});

// Command Processor
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let array = message.content.split(" ");
    let command = array[0];
    let args  = array.slice(1);

    if (!command.startsWith(config.prefix)) return;

    let cmd = bot.commands.get(command.slice(config.prefix.length))

    if (cmd) {
        cmd.run(bot, message, args);
    } else {
        message.channel.send("Hmm... I don't think I can run that. Try `" + config.prefix + "help`")
    }
});

// Login Function
bot.login(config.token).catch(function() {
    console.log("It seems like we can't connect to Discord. Try again later.")
    process.exit(1)
});
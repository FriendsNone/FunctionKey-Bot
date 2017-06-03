const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsFiles.length} commands!`);

    jsFiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        try {
            bot.commands.set(props.help.name, props);
        } catch (err) {
            console.log("^ Invaild command file");
        }
    });
});

bot.on("ready", () => {
   console.log(`${bot.user.username} is ready!`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if(!command.startsWith(config.prefix)) return;

    let cmd = bot.commands.get(command.slice(config.prefix.length))
    if(cmd) cmd.run(bot, message, args);
    else message.channel.send(`I don't think thats a command. Try ${config.prefix}help`);
});

bot.login(config.token);

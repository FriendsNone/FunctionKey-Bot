module.exports.run = async (bot, message, args) => {
    message.channel.send("Welp. Nobody coded a prompt. Shutting down!").then(function () {
        console.log(`${message.author.tag} from ${message.guild.name}  turned off the bot`);
        process.exit(0);
    }).catch(function () {
        console.log(`${message.author.tag} from ${message.guild.name} turned off the bot`);
        process.exit(0);
    });
}

module.exports.help = {
    name: "off",
    usage: "off",
    desc: "Turns off the bot! That's it."
}

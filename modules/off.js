module.exports.run = async (bot, message, args) => {
    var reason =  message.content.split("~")[1];
    var responses = [
        "Welp, nobody coded a prompt. Shutting down.",
        "rip bot",
        "Aw, I guess nobody likes me when I'm on.",
        "You can now safely close the terminal window",
        "i haz turn off naw.",
        "*pops*"
    ]

    if (!reason) {
        return message.channel.send("Shutting down with no reasons? I'd say no.");
    } else {
        message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`).then(function () {
            process.exit(0)
        });
    }
    
    console.log(`${message.author.tag} from ${message.guild.name} turned me off. \nReason => ${reason}`)
}

module.exports.help = {
    name: "off",
    args: "~[reason]",
    notes: "Turns off the bot."
}
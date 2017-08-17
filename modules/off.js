module.exports.run = async (bot, message, args) => {
    var reason =  message.content.split("~")[1];
    
    if (!reason) {
        return message.channel.send("Shutting down with no reasons? I'd say no.");
    } else {
        switch (Math.floor(Math.random() * 1000) % 6) {
            case 0:
                message.channel.send('Welp, nobody coded a prompt. Shutting down.').then(function () {
                        process.exit(0)
                });
            break;

            case 1:
                message.channel.send('rip bot').then(function () {
                    process.exit(0)
                });
            break;
                            
            case 2:
                message.channel.send("Aw, I guess nobody likes me when I'm on.").then(function () {
                    process.exit(0)
                });
            break;
                            
            case 3:
                message.channel.send("You can now safely close the terminal window").then(function () {
                    process.exit(0)
                });
            break;
                    
            case 4:
                message.channel.send("i haz turn off naw.").then(function () {
                    process.exit(0)
                });
            break;

            case 5:
                message.channel.send("*pops*").then(function () {
                    process.exit(0)
                });
            break;
        }
    }
    
    console.log(`${message.author.tag} from ${message.guild.name} turned me off. \nReason => ${reason}`)
}

module.exports.help = {
    name: "off",
    args: "~[reason]",
    notes: "Turns off the bot."
}
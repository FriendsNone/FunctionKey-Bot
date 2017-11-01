const commando = require('discord.js-commando');

class AskCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ask',
            group: 'fun',
            memberName: 'ask',
            description: 'Answers asked questions.',
            format: '[question]'
        });
    }

    async run(message, args) {
        var responses = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ]
        
        if (args[0]) {
            message.reply(responses[Math.floor(Math.random() * responses.length)]);
        } else {
            message.channel.send("Cat got your tongue? Don't worry, I won't bite.");
        }
    }
}

module.exports = AskCommand;
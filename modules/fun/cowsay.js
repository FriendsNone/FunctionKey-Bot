const commando = require('discord.js-commando');
const cowsay = require('cowsay');

class CowsayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cowsay',
            group: 'fun',
            memberName: 'cowsay',
            description: 'Moo!',
            format: '[words]'
        });
    }

    async run(message, args) {
        if (!args) {
            message.channel.send('```\n' + cowsay.say({ text : 'Meow!' }) + '```');
        } else {
            message.channel.send('```\n' + cowsay.say({ text : args }) + '```');
        }
    }
}

module.exports = CowsayCommand;
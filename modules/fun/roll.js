const commando = require('discord.js-commando');

class RollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'fun',
            memberName: 'roll',
            description: 'Rolls a dice',
            format: '(sides)'
        });
    }

    async run(message, args) {
        if (!args) {
            let roll = Math.floor(Math.random() * 6) + 1;
            message.channel.send(`<@${message.author.id}> rolled a ${roll}!`);
        } else if (isNaN(args) === true) {
            message.channel.send('ASCII characters are awesome you know. But it\'s not a number')
        } else {
            let roll = Math.floor(Math.random() * (Number(args.toString()) - 1) + 1);
            message.channel.send(`<@${message.author.id}> rolled a ${roll}!`);
        }
    }
}

module.exports = RollCommand;

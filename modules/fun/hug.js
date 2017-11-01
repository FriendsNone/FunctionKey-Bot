const commando = require('discord.js-commando');

class HugCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'fun',
            memberName: 'hug',
            description: 'Hug your friends!',
            format: '(user)'
        });
    }

    async run(message, args) {
        var mention = message.mentions.users.first() || message.guild.members.get(args[0]);

        if (!mention) {
            message.channel.send(`*hugs <@${message.author.id}>*`);
        } else {
            message.channel.send(`*hugs <@${mention.id}>*`)
        }
    }
}

module.exports = HugCommand;
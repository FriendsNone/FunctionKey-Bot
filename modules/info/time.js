const commando = require('discord.js-commando');
const moment = require('moment-timezone');

class TimeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'time',
            group: 'info',
            memberName: 'time',
            description: 'Show\'s time. (Can be inaccurate)',
            format: '(timezone)'
        });
    }

    async run(message, args) {
      message.channel.send('Try looking around the corners of your screen.')
    }
}

module.exports = TimeCommand;
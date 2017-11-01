const commando = require('discord.js-commando');
const moment = require('moment');
               require('moment-duration-format');
const os = require('os');

class UptimeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'uptime',
			group: 'util',
			memberName: 'uptime',
            description: 'Shows the current uptime.',
            format: 'n/a'
		});
	}

	async run(message) {
        var bot = moment.duration(process.uptime() * 1000, "milliseconds").format('D [days], H [hrs], m [mins], s [secs]')
        var system = moment.duration(os.uptime() * 1000, "milliseconds").format('D [days], H [hrs], m [mins], s [secs]')

        message.channel.send(`**Bot:** ${bot}. **System:** ${system}.`);
	}
};

module.exports = UptimeCommand;

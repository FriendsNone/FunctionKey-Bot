const commando = require('discord.js-commando');
const fortune = require('fortune-teller');

class PingCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Checks the heartbeat ping.',
			format: 'n/a'
		});
	}

	async run(msg) {
		const pingMsg = await msg.channel.send('Pinging...');
		return pingMsg.edit(`
			**Message:** ${pingMsg.createdTimestamp - msg.createdTimestamp}ms. ${this.client.ping ? `**API:** ${Math.round(this.client.ping)}ms.` : ''}` +
			'```\n' + fortune.fortune() + '```'
		);
	}
};

module.exports = PingCommand;

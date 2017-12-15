/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const fortune = require('fortune-teller');

module.exports = class Util_Ping extends Command {
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
        const pingMsg = await msg.channel.send('Trying to play ~~ping pong~~ badminton...');
        const msgPing = pingMsg.createdTimestamp - msg.createdTimestamp;
        const apiPing = Math.round(this.client.ping);

        return pingMsg.edit(
            `**Message:** ${msgPing}ms. **API:** ${apiPing}ms.` +
            '```\n' + fortune.fortune() + '```'
        );
    }
};

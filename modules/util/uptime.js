/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');

module.exports = class Util_Uptime extends Command {
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
        const bot = moment.duration(process.uptime() * 1000, 'milliseconds').format('D [days], H [hrs], m [mins], s [secs]');
        const system = moment.duration(os.uptime() * 1000, 'milliseconds').format('D [days], H [hrs], m [mins], s [secs]');

        message.channel.send(`**Bot:** ${bot}. **System:** ${system}.`);
    }
};

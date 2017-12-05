/***************************************************************************
 * A TL;DR version of the MIT License for FunctionKey-Bot
 * Copyright (c) 2017 Wizzardo Meowy
 *
 * You can use, copy, modify, and/or distribute this software for any
 * purpose without fee, as long as you credit the owner and have this
 * notice and the copy of the LICENCE file
 * 
 * If you want to copy something from this project, ask permission first!
 * Don't copy code without permission. That's called plagiarism!
 *
 * If you got this software/source code for a price. YOU'VE BEENED SCAMED!
 * ASK FOR A REFUND, ASAP! As this software/source code is available for
 * free at https://github.com/FriendsNone/FunctionKey-Bot
 ***************************************************************************/

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

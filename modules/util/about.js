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
const { version, description } = require('../../package.json');

class AboutCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'about',
			group: 'util',
			memberName: 'about',
            description: 'Shows information about the bot.',
            format: 'n/a'
		});
	}

	async run(message) {
        var embed =  {
            color: 8962256,
            author: {
                name: `${this.client.user.username} ${version}`
            },
            description: description,
            thumbnail: {
                url: this.client.user.displayAvatarURL()
            },
            footer: {
                text: 'Version 4 is <> with more <3 than ever before! c:'
            },
            fields: [
                {
                    name: 'GitHub Repository',
                    value: 'https://github.com/FriendsNone/FunctionKey-Bot'
                },
				{
					name: 'Check out these links too!',
					value: '[`README.md`](https://github.com/FriendsNone/FunctionKey-Bot#readme). [`LICENCE`](https://github.com/FriendsNone/FunctionKey-Bot/blob/master/LICENCE), and [cute cats](http://thecatapi.com/api/images/get)'
				}
            ]
        }

        message.channel.send({ embed })
	}
};

module.exports = AboutCommand;

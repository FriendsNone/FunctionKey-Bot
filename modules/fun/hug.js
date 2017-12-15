/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');

module.exports = class Fun_Hug extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'fun',
            memberName: 'hug',
            description: 'Hug your friends!',
            format: '(user)',
            args: [
                {
                    key: 'user',
                    prompt: 'Come on, don\'t be shy.',
                    type: 'user',
                    default: ''
                }
            ]
        });
    }

    run(msg, { user }) {
        if (user == '') {
            msg.channel.send(`*hugs <@${msg.author.id}>*`);
        } else {
            msg.channel.send(`*hugs ${user}*`);
        }
    }
};

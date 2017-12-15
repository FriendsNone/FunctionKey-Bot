/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const request = require('request');

module.exports = class Fun_XKCD extends Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            group: 'fun',
            memberName: 'xkcd',
            description: 'Sends a random XKCD comic.',
            format: 'n/a'
        });
    }

    run(message) {
        const r = request.get('https://c.xkcd.com/random/comic/', function() {
            message.channel.send(`Here's your daily dose of **xkcd** ${r.uri.href}`);
        });
    }
};

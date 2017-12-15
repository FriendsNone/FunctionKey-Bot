/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const moment = require('moment-timezone');

module.exports = class Info_Time extends Command {
    constructor(client) {
        super(client, {
            name: 'time',
            group: 'info',
            memberName: 'time',
            description: 'Show\'s time. (Can be inaccurate)',
            format: '[continent] [country]',
            args: [
                {
                    key: 'continent',
                    prompt: 'Continent? What continent?',
                    type: 'string',
                    wait: 30
                },
                {
                    key: 'country',
                    prompt: 'And how about the country?',
                    type: 'string',
                    wait: 30
                }
            ]
        });
    }

    run(msg, { continent, country }) {
        const location = `${continent}/${country}`;
        const time = moment().tz(location).format('MM-DD-YYYY HH:mm:ss');

        msg.channel.send(`Time for \`${location}\` is \`${time}\`.`);
    }
};

/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');

module.exports = class Fun_Roll extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'fun',
            memberName: 'roll',
            description: 'Rolls a dice',
            format: '(sides)',
            args: [
                {
                    key: 'number',
                    prompt: 'What can we roll today?',
                    type: 'integer',
                    default: 6
                }
            ]
        });
    }

    run(msg, { number }) {
        const roll = Math.floor(Math.random() * (Number(number) - 1) + 1);
        msg.channel.send(`<@${msg.author.id}> rolled a ${roll}!`);
    }
};

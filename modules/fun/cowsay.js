/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const cowsay = require('cowsay');

module.exports = class Fun_Cowsay extends Command {
    constructor(client) {
        super(client, {
            name: 'cowsay',
            group: 'fun',
            memberName: 'cowsay',
            description: 'Moo! I\'m a talking cow!',
            format: '[text]',
            args: [
                {
                    key: 'text',
                    prompt: 'What? You don\'t believe in talking cows?',
                    type: 'string',
                    wait: 30
                }
            ]
        });
    }

    run(msg, { text }) {
        msg.channel.send(`\`\`\`\n ${cowsay.say({ text: text })} \`\`\``);
    }
};

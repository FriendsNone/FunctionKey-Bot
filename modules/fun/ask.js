/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');

module.exports = class Fun_Ask extends Command {
    constructor(client) {
        super(client, {
            name: 'ask',
            group: 'fun',
            memberName: 'ask',
            description: 'Answers one of your deepest questions.',
            format: '[question]',
            args: [
                {
                    key: 'question',
                    prompt: 'Cat got your tongue? Don\'t worry, I won\'t bite.',
                    type: 'string',
                    wait: 30
                }
            ]
        });
    }

    run(msg) {
        const responses = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            'Don\'t count on it',
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful'
        ];

        msg.reply(responses[Math.floor(Math.random() * responses.length)]);
    }
};
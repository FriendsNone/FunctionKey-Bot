/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const { parser, format } = require('mathjs');

module.exports = class Info_Math extends Command {
    constructor(client) {
        super(client, {
            name: 'math',
            group: 'info',
            memberName: 'math',
            description: 'Calculates equations. (Can be inaccurate)',
            format: '[equation]',
            args: [
                {
                    key: 'equation',
                    prompt: 'I swear. If you type in `1+1`, I\'ll kill you.',
                    type: 'string',
                    wait: 30
                }
            ]
        });
    }

    run(msg, { equation }) {
        try {
            const result = parser().eval(equation);
            const finalResult = format(result, { precision: 14 });
            msg.channel.send(`\`\`\`\n${equation} = ${finalResult} \`\`\``);
        } catch (e) {
            const result = e;
            msg.channel.send(`\`\`\`\n${equation} = ${result} \`\`\``);
        }
    }
};

/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const wtf = require('wtf_wikipedia');

module.exports = class Info_Wiki extends Command {
    constructor(client) {
        super(client, {
            name: 'wiki',
            group: 'info',
            memberName: 'wiki',
            description: 'Shows information from Wikipedia',
            format: '[query]',
            args: [
                {
                    key: 'query',
                    prompt: 'The hounds are sniffing!',
                    type: 'string',
                    wait: 30
                }
            ]
        });
    }

    run(msg, { query }) {
        wtf.from_api(query, 'en', function(markup) {
            try {
                const data = wtf.parse(markup);

                msg.channel.send({
                    embed: {
                        color: 8962256,
                        title: `Here's what I've got for \`${query}\``,
                        description: `${data.sections[0].sentences[0].text} ${data.sections[0].sentences[1].text}`
                    }
                });
            } catch (err) {
                msg.channel.send('Woops! Something went wrong.');
            }
        });
    }
};

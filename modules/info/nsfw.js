/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const Kaori = new require('kaori');
const kaori = new Kaori();

module.exports = class Info_NSFW extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfw',
            group: 'info',
            memberName: 'nsfw',
            description: 'For courpted souls only. (tags can be inaccurate)',
            format: '(tags)',
            nsfw: true,
            args: [
                {
                    key: 'tags',
                    prompt: 'What would you like to see?',
                    type: 'string',
                    wait: 30,
                    default: ''
                }
            ]
        });
    }

    run(msg, { tags }) {
        kaori.search('r34', { tags: [tags], limit: 1, random: true })
            .then(images => {
                msg.channel.send({
                    embed: {
                        color: 8962256,
                        title: 'Here\'s some smexy NSFW!',
                        image: {
                            url: images[0].common.fileURL
                        }
                    }
                });
            })
            .catch(err => {
                msg.channel.send('Aww, Sorry dear but there\'s something wrong right now. Come back later.');
                console.log(err);
            });
    }
};

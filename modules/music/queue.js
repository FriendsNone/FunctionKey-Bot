/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const { Command } = require('discord.js-commando');
const music = require('../../structures/music.js');

module.exports = class Music_Play extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Lists out the current queue.',
            format: 'n/a'
        });
    }

    run(msg) {
        const queue = music.getQueue(msg.guild.id);

        let queuelist = '';
        let i = 1;

        for (const video of queue) {
            queuelist += `${i}: ${video.title} by ${video.channel.title}\n`;
            i++;

            if (i == 6) {
                queuelist += `and ${queue.length - i} more.`;
                break;
            }
        }

        msg.channel.send({
            embed: {
                color: 10731148,
                title: 'Queue list',
                description: queuelist || 'Nothing...'
            }
        });
    }
};

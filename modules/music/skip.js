/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const { Command } = require('discord.js-commando');
const music = require('../../structures/music.js');

module.exports = class Music_Skip extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skips what\'s currently playing.',
            format: 'n/a'
        });
    }

    run(msg) {
        const voiceConnection = msg.guild.voiceConnection;
        if (voiceConnection === null) return msg.channel.send('There\'s nothing on right now.');

        const queue = music.getQueue(msg.guild.id);
        // if (!canSkip(msg.member, queue)) return msg.channel.send('You can\'t skip what you didn\'t queue.')
        queue.splice(0, Math.min(1, queue.length) - 1);

        const dispatcher = voiceConnection.player.dispatcher;
        if (voiceConnection.paused) dispatcher.resume();
        dispatcher.end();
        msg.channel.send(`Skipped "${queue[0].title}"`);
    }
};

/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const { Command } = require('discord.js-commando');
const music = require('../../structures/music.js');

module.exports = class Music_Stop extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stop what\'s playing and clears queue.',
            format: 'n/a'
        });
    }

    run(msg) {
        // if (!isAdmin(msg.member)) return msg.channel.send('You are not allowed to use this command.');
        if (!msg.guild.me.voiceChannel) msg.channel.send('Not in a voice channel.');

        const queue = music.getQueue(msg.guild.id);
        queue.splice(0, queue.length);
        msg.guild.me.voiceChannel.leave();
        msg.channel.send('Stopped playing and cleared queue list.');
    }
};

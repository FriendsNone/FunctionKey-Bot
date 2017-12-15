/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const { Command } = require('discord.js-commando');

module.exports = class Music_Resume extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Resumes the music.',
            format: 'n/a'
        });
    }

    run(msg) {
        const voiceConnection = msg.guild.voiceConnection;
        if (voiceConnection === null) return msg.channel.send('There\'s nothing on right now.');
        // if (!isAdmin(msg.member)) return msg.channel.send('You are not allowed to use this command.');

        msg.channel.send('Playback resumed.');
        const dispatcher = voiceConnection.player.dispatcher;
        if (dispatcher.paused) dispatcher.resume();
    }
};

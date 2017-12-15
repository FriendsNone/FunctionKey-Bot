/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const { Command } = require('discord.js-commando');

module.exports = class Music_Pause extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pauses the music for a moment.',
            format: 'n/a'
        });
    }

    run(msg) {
        const voiceConnection = msg.guild.voiceConnection;
        if (voiceConnection === null) return msg.channel.send('There\'s nothing on right now.');
        // if (!isAdmin(msg.member)) msg.channel.send('You are not allowed to use this command.');

        msg.channel.send(`Playback paused. To resume playback, use \`${msg.guild.commandPrefix}resume\`.`);
        const dispatcher = voiceConnection.player.dispatcher;
        if (!dispatcher.paused) dispatcher.pause();
    }
};

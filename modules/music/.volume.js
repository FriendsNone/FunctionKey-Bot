/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const { Command } = require('discord.js-commando');
const YouTube = require('simple-youtube-api');
const music = require('../../structures/music.js');
const settings = require('../../config/music.json');
const youtube = new YouTube(settings.token);

module.exports = class Music_Play extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            group: 'music',
            memberName: 'volume',
            description: 'It plays music from YouTube.',
            format: '[link/video_id]',
            args: [
                {
                    key: 'value',
                    prompt: 'Why not let\'s play some static?',
                    type: 'integer',
                    wait: 10,
                    default: ''
                }
            ]
        });
    }

    run(msg, { value }) {
        const voiceConnection = msg.guild.voiceConnection;

        if (voiceConnection === null) return msg.channel.send('There must be music playing in order to change the volume.');
        // if (!isAdmin(msg.member)) return msg.channel.send('You are not allowed to use this command.');

        const dispatcher = voiceConnection.player.dispatcher;
        if (value == '') return msg.channel.send(`Volume is at \`${dispatcher.volume * 100}\``);
        if (value > 200 || value < 0) return msg.channel.send('Volume value out of range.');

        dispatcher.setVolume((value / 100));
        msg.channel.send(`Volume was set to ${value}`);
    }
};

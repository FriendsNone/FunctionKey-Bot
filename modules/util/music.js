/***************************************************************************
 * A TL;DR version of the MIT License for FunctionKey-Bot
 * Copyright (c) 2017 Wizzardo Meowy
 *
 * You can use, copy, modify, and/or distribute this software for any
 * purpose without fee, as long as you credit the owner and have this
 * notice and the copy of the LICENCE file
 * 
 * If you want to copy something from this project, ask permission first!
 * Don't copy code without permission. That's called plagiarism!
 *
 * If you got this software/source code for a price. YOU'VE BEENED SCAMED!
 * ASK FOR A REFUND, ASAP! As this software/source code is available for
 * free at https://github.com/FriendsNone/FunctionKey-Bot
 ***************************************************************************/

const commando = require('discord.js-commando');
const { stripIndent } = require('common-tags');
const { version } = require('../../package.json');

class MusicCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'music',
            group: 'util',
            memberName: 'music',
            description: 'Lists all commands for music.',
            format: 'n/a'
        });
    }

    async run(message, args) {
        message.channel.send({
            embed: {
                color: 8962256,
                author: {
                    name: 'Music Commands',
                    iconURL: this.client.user.displayAvatarURL(),
                    url: 'https://github.com/FriendsNone/FunctionKey-Bot'
                },
                description: `Don't forget! My prefix is '${message.guild.commandPrefix}'`,
                footer: {
                    text: `${this.client.user.username} ${version}`
                },
                fields: [
                    {
                        name: `play [query/video_url]`,
                        value: 'Play a track',
                        inline: true
                    },
                    {
                        name: `playlist [playlist_url]`,
                        value: 'Plays a playlist.',
                        inline: true
                    },
                    {
                        name: `queue`,
                        value: 'Shows queued tracks.',
                        inline: true
                    },
                    {
                        name: `pause`,
                        value: 'Pauses playback',
                        inline: true
                    },
                    {
                        name: `resume`,
                        value: 'Resumes playback',
                        inline: true
                    },
                    {
                        name: `skip`,
                        value: 'Skipped currently playing track.',
                        inline: true
                    },
                    {
                        name: `stop`,
                        value: 'Stops playback and clears queue.',
                        inline: true
                    },
                    {
                        name: `nowplaying,`,
                        value: 'Shows a summary of what\'s playing.',
                        inline: true
                    },
                    {
                        name: `songinfo (number)`,
                        value: 'Shows details of a song.',
                        inline: true
                    },
                    {
                        name : `volume [number],`,
                        value: 'Sets volume level.',
                        inline: true
                    }
                ]
            }
        })
    }
}

module.exports = MusicCommand;

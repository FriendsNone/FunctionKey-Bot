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
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'It plays music from YouTube.',
            format: '[link/video_id]',
            args: [
                {
                    key: 'video',
                    prompt: 'What are we going to listen today?',
                    type: 'string',
                    wait: 30
                }
            ]
        });
    }

    run(msg, { video }) {
        const voiceChannel = msg.member.voiceChannel;
        if (msg.member.voiceChannel === undefined) return msg.channel.send('Not in a voice channel.');

        const queue = music.getQueue(msg.guild.id);
        if (queue.lengh >= settings.MAX_QUEUE_SIZE) return msg.channel.send('Queue maxed out.');

        if (!msg.guild.me.voiceChannel) {
            if (!voiceChannel.joinable) return msg.channel.send(`Can't join in ${voiceChannel.name}.`);
            if (voiceChannel.full) return msg.channel.send(`${voiceChannel.name} is full.`);
            if (!voiceChannel.speakable) return msg.channel.send(`Can't speak in ${voiceChannel.name}.`);

            voiceChannel.join();
        }

        // if (voiceChannel.id !== msg.guild.me.voiceChannelID) return msg.channel.send(`Already in ${voiceChannel.name}.`);
        if (msg.member.deaf) return msg.channel.send(`Must me undefend in ${voiceChannel.name}.`);

        msg.channel.send(`Searching for ${video}`).then(response => {
            const query = video;

            if (!video.toLowerCase().startsWith('http')) {
                youtube.search(query, 1).then(info => {
                    if (queue.length >= settings.MAX_QUEUE_SIZE) return msg.channel.send('Queue maxed out.');

                    queue.push(info[0]);
                    response.edit(`"${info[0].title} by ${info[0].channel.title}" has been queued!`).then(() => {
                        if (queue.length === 1) music.executeQueue(msg, queue);
                    }).catch(console.log);
                }).catch(err => {
                    if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
                        console.log(err);
                        return response.edit('Invalid video.');
                    }
                });
            } else {
                youtube.getVideo(query).then(info => {
                    if (queue.length >= settings.MAX_QUEUE_SIZE) return msg.channel.send('Queue maxed out.');
                    queue.push(info);
                    response.edit(`"${info.title} by ${info.channel.title}" has been queued!`).then(() =>{
                        if (queue.length === 1) music.executeQueue(msg, queue);
                    }).catch(console.log);
                }).catch(err => {
                    if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
                        console.log(err);
                        return response.edit('Invalid video.');
                    }
                });
            }
        }).catch(console.log);
    }
};

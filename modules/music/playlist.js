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

module.exports = class Music_Playlist extends Command {
    constructor(client) {
        super(client, {
            name: 'playlist',
            group: 'music',
            memberName: 'playlist',
            description: 'Queues a playlist.',
            format: '[link/playlist_id]',
            args: [
                {
                    key: 'video',
                    prompt: 'What should we queue today?',
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
        if (!msg.guild.me.voiceChannel) {
            if (!voiceChannel.joinable) return msg.channel.send(`Can't join in ${voiceChannel.name}.`);
            if (voiceChannel.full) return msg.channel.send(`${voiceChannel.name} is full.`);
            if (!voiceChannel.speakable) return msg.channel.send(`Can't speak in ${voiceChannel.name}.`);

            voiceChannel.join();
        }

        if (msg.member.deaf) return msg.reply(`You must be listening in \`${voiceChannel.name}\` to play Playlists!`);

        msg.channel.send(`Searching for ${video}`).then(response => {
            if (!video.toLowerCase().startsWith('http')) {
                youtube.getPlaylistByID(video).then(playlist => {
                    playlist.getVideos().then(videos => {
                        if (videos.length > settings.MAX_PLAYLIST_LENGTH) return response.edit(`Sorry, but the max length for Playlists is **${settings.MAX_PLAYLIST_LENGTH}**!`);
                        for (video of videos) {
                            queue.push(video);
                        }

                        response.edit(`"${playlist.title}" has been queued!`).then(() => {
                            if (queue.length === videos.length) music.executeQueue(msg, queue);
                        }).catch(console.log);
                    }).catch(err => {
                        if (err) {
                            return response.edit('Invalid playlist!');
                        }
                    });
                }).catch(console.log);
            } else {
                youtube.getPlaylist(video)
                    .then(playlist => {
                        playlist.getVideos().then(videos => {
                            if (videos.length > settings.MAX_PLAYLIST_LENGTH) return response.edit(`Sorry, but the max length for Playlists is **${settings.MAX_PLAYLIST_LENGTH}**!`);
                            for (video of videos) {
                                queue.push(video);
                            }

                            response.edit(`"${playlist.title}" has been queued!`).then(() => {
                                if (queue.length === videos.length) music.executeQueue(msg, queue);
                            }).catch(console.log);
                        }).catch(console.log);
                    }).catch(err => {
                        if (err) {
                            return response.edit('Invalid playlist!');
                        }
                    });
            }
        });
    }
};

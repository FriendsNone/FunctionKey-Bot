/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * Credits to Terax#9758 for letting me use his code.
 */

const ytdl = require('ytdl-core');
const settings = require('../config/music.json');

const queues = {};

module.exports = {
    getQueue: function getQueue(server) {
        if (settings.GLOBAL) server = '_';
        if (!queues[server]) queues[server] = [];
        return queues[server];
    },

    executeQueue: function executeQueue(msg, queue) {
        if (queue.length === 0) {
            msg.channel.send('That\'s a wrap everyone!');
            const voiceConnection = msg.guild.voiceConnection;
            if (voiceConnection !== null) return voiceConnection.disconnect();
        }

        new Promise((resolve, reject) => {
            const voiceConnection = msg.guild.voiceConnection;
            if (voiceConnection === null) {
                if (msg.member.voiceChannel) {
                    const voiceChannel = msg.member.voiceChannel;
                    if (!msg.guild.me.voiceChannel) {
                        if (!voiceChannel.joinable) return msg.channel.send(`Can't join in ${voiceChannel.name}.`);
                        if (voiceChannel.full) return msg.channel.send(`${voiceChannel.name} is full.`);
                        if (!voiceChannel.speakable) return msg.channel.send(`Can't speak in ${voiceChannel.name}.`);
                    }
                    if (msg.member.deaf) return msg.channel.send(`Must me undeafend in ${voiceChannel.name}.`);

                    msg.member.voiceChannel.join().then(connection => {
                        resolve(connection);
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    queue.splice(0, queue.length);
                    reject();
                }
            } else {
                resolve(voiceConnection);
            }
        }).then(connection => {
            const video = queue[0];
            const dispatcher = connection.playStream(ytdl(video.id, {
                filter: 'audioonly'
            }), {
                seek: 0,
                volume: (settings.DEFAULT_VOLUME / 100)
            });

            msg.channel.send({
                embed: {
                    color: 10731148,
                    title: 'Now Playing!',
                    description: `Don't know what's next? Try \`${msg.guild.commandPrefix}queue\``,
                    fields: [
                        {
                            name: video.title,
                            value: `by ${video.channel.title}`
                        }
                    ],
                    thumbnail: {
                        url: video.maxRes.url
                    }
                }
            }).then(() => {
                connection.on('error', error => {
                    console.log(error);
                    queue.shift();
                    executeQueue(msg, queue);
                });

                dispatcher.on('error', error => {
                    console.log(error);
                    queue.shift();
                    executeQueue(msg, queue);
                });

                dispatcher.on('end', () => {
                    setTimeout(() => {
                        if (queue.length !== 0) {
                            if (connection.channel.members.size < 2) {
                                return msg.channel.send('Seems like everyone left. I\'ll do the same.').then(() => {
                                    connection.channel.leave();
                                    queue.splice(0, queue.length);
                                });
                            }
                        }

                        if (queue.length > 0) {
                            queue.shift();
                            executeQueue(msg, queue);
                        }
                    }, 1000);
                });
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    }
};

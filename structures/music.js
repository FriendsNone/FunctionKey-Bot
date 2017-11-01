const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const moment = require('moment');
               require('moment-duration-format');
const { stripIndent, oneline } = require('common-tags');
const { prefix } = require('../config.json');

module.exports = function(client) {
    let GLOBAL = false;
    let MAX_QUEUE_SIZE = 20;
    let MAX_PLAYLIST_LENGTH = 15;
    let DEFAULT_VOLUME = 50;
    let ALLOW_ALL_SKIP = false;
    let queues = {};
    
    client.on('message', msg => {
        const message = msg.content.trim();
        
        if (message.toLowerCase().startsWith(prefix.toLowerCase())) {
            const command = message.substring(prefix.length).split(/[ \n]/)[0].toLowerCase().trim();
            const suffix = message.substring(prefix.length + command.length).trim();
            
            if (!msg.guild) return;
            switch (command) {
                case 'disconnect'    : return leave(msg);
                case 'join'          : return join(msg);
                case 'leave'         : return leave(msg, suffix);
                case 'musicsettings' : return settings(msg);
                case 'nowplaying'    : return songinfo(msg, 0);
                case 'pause'         : return pause(msg);
                case 'play'          : return play(msg, client, suffix);
                case 'playlist'      : return playlist(msg, client, suffix);
                case 'queue'         : return queue(msg);
                case 'resume'        : return resume(msg);
                case 'skip'          : return skip(msg);
                case 'songinfo'      : return songinfo(msg, suffix);
                case 'stop'          : return leave(msg);
                case 'volume'        : return volume(msg, suffix);
            }
        }
    });
    
    function isAdmin(member) {
        return member.hasPermission("ADMINISTRATOR");
    }

    function canSkip(member, queue) {
        if (ALLOW_ALL_SKIP) return true;
        else if (queue[0].user === member.id) return true;
        else if (isAdmin(member)) return true;
        else return false;
    }
    
    function getQueue(server) {
        if (GLOBAL) server = '_';

        if (!queues[server]) queues[server] = [];
        return queues[server];
    }
    
    async function play(msg, client, suffix) {
        if (msg.member.voiceChannel === undefined) return await msg.channel.send('You\'re not in a voice channel.');
        if (!suffix) return await msg.channel.send('You didn\'t specify a `trackname` or a `video_id/url`');

        const queue = await getQueue(msg.guild.id);
        if (queue.length >= MAX_QUEUE_SIZE) return msg.channel.send('Max queue size reached!');

        const voiceChannel = msg.member.voiceChannel;
        if (!msg.guild.me.voiceChannel) {
            if (!voiceChannel.joinable) return await msg.channel.send(`I can't join \`${voiceChannel.name}\` due to missing permissions.`)
            if (voiceChannel.full) return await msg.channel.send(`\`${voiceChannel.name}\` is full.`)
            if (!voiceChannel.speakable) return await msg.channel.send(`I can't speak in \`${voiceChannel.name}\`.`)

            await voiceChannel.join();
        }

        if (voiceChannel !== msg.guild.me.voiceChannel) return msg.channel.send(`I'm already in \`${voiceChannel.name}\`.`);
        if (msg.member.deaf) return await msg.channel.send(`You must be undeafend in \`${voiceChannel.name}\`.`)

        await msg.channel.send(`Searching for \`${suffix}\``).then(async response => {
            var query = suffix;
            if (!suffix.toLowerCase().startsWith('http')) {
                query = 'gvsearch1:' + suffix;
            }

            await YoutubeDL.getInfo(query, [
                '-q',
                '--no-warnings',
                '--force-ipv4'
            ], async (err, info) => {
                if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
					console.log(err)
					return await response.edit('Invaild video.');
				}
                if (queue.length >= MAX_QUEUE_SIZE) return msg.channel.send('Max queue size reached.');
                
                await queue.push(info);
                await response.edit(`"${info.title} by ${info.uploader}" has been queued!`).then(async () =>{
                    if (queue.length === 1) await executeQueue(msg, queue);
                }).catch(console.log);
            });
        }).catch(console.log);
    }
    
    async function playlist(msg, client, suffix) {
        const voiceChannel = msg.member.voiceChannel;
        if (voiceChannel === undefined) return await msg.channel.send('You\'re not in a voice channel.');
        if (!suffix) return await msg.channel.send('You didn\'t specify a `playlist_url`');
        
        const queue = await getQueue(msg.guild.id);
        if (!msg.guild.me.voiceChannel) {
            if (!voiceChannel.joinable) return await msg.channel.send(`I can't join \`${voiceChannel.name}\` due to missing permissions.`)
            if (voiceChannel.full) return await msg.channel.send(`\`${voiceChannel.name}\` is full.`)
            if (!voiceChannel.speakable) return await msg.channel.send(`I can't speak in \`${voiceChannel.name}\`.`)

            await voiceChannel.join();
        }
        if (msg.member.deaf) return await msg.channel.send(`You must be undeafend in \`${voiceChannel.name}\`.`)

        await msg.channel.send(`Searching for playlist \`${suffix}\``).then(async response => {
            await YoutubeDL.getInfo(suffix, [
                '-q',
                '--no-warnings',
                '--force-ipv4'
            ], async (err, info) => {
                if (err) return await response.edit('Invalid playlist.');
                // if (info.length > MAX_PLAYLIST_LENGTH) return await response.edit('Max playlist length has reached.')

                for (var video of info) {
                    // video.user = await client.fetchUser(msg.author.id);
                    // video.member = await msg.guild.fetchMember(msg.member.id);
                    await queue.push(video);
                }

                await response.edit(`"${info[0].playlist_title}" has been queued!`).then(async () => {
                    if (queue.length === info.length) await executeQueue(msg, queue);
                }).catch(console.log);
            });
        }).catch(console.log);
    }

    async function songinfo(msg, suffix) {
        const args = suffix || 0;
        if (isNaN(suffix)) return await msg.channel.send('Enter a valid queue number.')

        const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
        if (voiceConnection === null) return await msg.channel.send('There\'s nothing on right now.');
        if (!getQueue(msg.guild.id)[args]) return await msg.channel.send(`${suffix} is not on the list.`)

        const info = getQueue(msg.guild.id)[args];
        await msg.channel.send({
            embed: {
                color: 10731148,
                title: `Song metadata for:`,
                description: `${info.title}`,
                fields: [
                    {
                        inline: true,
                        name: 'General',
                        value: stripIndent`
                            Uploaded by: ${info.uploader}
                            Published on: ${moment(info.upload_date).format('MMMM D, YYYY')}
                            Duration: ${info.duration}
                            Queue spot: #${args}
                        `
                    },
                    {
                        inline: true,
                        name: `Statistics`,
                        value: stripIndent`
                            Views: ${info.view_count}
                            Likes: ${info.like_count}
                            Dislikes: ${info.dislike_count}
                        `
                    }
                ],
                thumbnail: {
                    url: info.thumbnail
                },
                footer: {
                    text: 'Powered by Lisa Music Player - https://github.com/Terax235/Lisa'
                }
            }
        })
    }

    async function skip(msg) {
        const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
        if (voiceConnection === null) return await msg.channel.send('There\'s nothing on right now.');

		const queue = await getQueue(msg.guild.id);
		if (!canSkip(msg.member, queue)) return await msg.channel.send('You can\'t skip what you didn\'t queue.')
		await queue.splice(0, Math.min(1, queue.length) - 1);

		const dispatcher = voiceConnection.player.dispatcher;
		if (voiceConnection.paused) await dispatcher.resume();
        await dispatcher.end();
		await msg.channel.send(`Skipped "${queue[0].title}"`);
    }

    async function queue(msg) {
		const queue = await getQueue(msg.guild.id);
		var queuelist = ``;
		if (queue) {
            if (queue[1]) {
                queuelist+=`1. ${queue[1].title} by ${queue[1].uploader} (${queue[1].duration})\n`
            }
            if (queue[2]) {
                queuelist+=`2. ${queue[2].title} by ${queue[2].uploader} (${queue[2].duration})\n`
            }
            if (queue[3]) {
                queuelist+=`3. ${queue[3].title} by ${queue[3].uploader} (${queue[3].duration})\n`
            }
            if (queue[4]) {
                queuelist+=`4. ${queue[4].title} by ${queue[4].uploader} (${queue[4].duration})\n`
            }
            if (queue[5]) {
                queuelist+=`5. ${queue[5].title} by ${queue[5].uploader} (${queue[5].duration})\n`
            }
            if (queue[6]) {
                queuelist+=`...and ${queue.length - 6} more.`
            }
        } else {
            queuelist=`Nothing`
        };

        var embed = {
            color: 10731148,
            title: 'Queue list',
            footer: {
                text: 'Powered by Lisa Music Player - https://github.com/Terax235/Lisa'
            },
            description: `For more info. Use ${prefix}songinfo.`,
            footer: {
                text: 'Powered by Lisa Music Player - https://github.com/Terax235/Lisa'
            },
            fields: []
        }

        if (queue[0]) {
            embed.fields = [
                {
                    name: 'Currently Playing',
                    value: `${queue[0].title} by ${queue[0].uploader} (${queue[0].duration})\n`
                },
                {
                    name: 'Up Next',
                    value: queuelist || 'Nothing...'
                }
            ]
        } else {
            embed.description = 'There\'s nothing queued right now.'
        }
        await msg.channel.send({ embed })
	}

    async function pause(msg) {
		const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send('There\'s nothing on right now.');
        if (!isAdmin(msg.member)) return await msg.channel.send('You are not allowed to use this command.');
        
        await msg.channel.send(`Playback paused. To resume playback, use \`${prefix}resume\`.`);

		const dispatcher = voiceConnection.player.dispatcher;
		if (!dispatcher.paused) await dispatcher.pause();
	}
  
    async function join(msg) {
		var voiceChannel = msg.member.voiceChannel
		if (msg.guild.me.voiceChannel) {
            if (!voiceChannel) return msg.reply(`I am already connected to the Voice Channel \`${msg.guild.me.voiceChannel.name}\`!`);
            if (voiceChannel !== msg.guild.me.voiceChannel) return msg.channel.send(`But you're in \`${voiceChannel.name}\`.`);
            if (voiceChannel === msg.guild.me.voiceChannel) return msg.channel.send('I\'m already here.');
            return;
        }

		if (!msg.member.voiceChannel) return msg.channel.send('You\'re not in a voice channel.');
		if (!voiceChannel.joinable) return await msg.channel.send(`I can't join \`${voiceChannel.name}\` due to missing permissions.`)
        if (voiceChannel.full) return await msg.channel.send(`\`${voiceChannel.name}\` is full.`)
        if (!voiceChannel.speakable) return await msg.channel.send(`I can't speak in \`${voiceChannel.name}\`.`)
        
		await msg.member.voiceChannel.join()
		await msg.channel.send(`Joined \`${msg.guild.voiceChannel.name}\`.`)
	}

    async function leave(msg) {
        if (!isAdmin(msg.member)) return msg.channel.send('You are not allowed to use this command.')
        if (!msg.guild.me.voiceChannel) msg.channel.send('I\'m not in any voice channel.')
        
        const queue = await getQueue(msg.guild.id);
        await queue.splice(0, queue.length);
        await msg.guild.me.voiceChannel.leave()
        await msg.channel.send('Stopped playing and cleared queue list.')
    }

    async function resume(msg) {
        const queue = await getQueue(msg.guild.id);
        
		const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send('There\'s nothing on right now.');
        if (!isAdmin(msg.member)) return await msg.channel.send('You are not allowed to use this command.');
        
        await msg.channel.send('Playback resumed.')
        
		const dispatcher = voiceConnection.player.dispatcher;
		if (dispatcher.paused) await dispatcher.resume();
	}

    async function volume(msg, suffix) {
		const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
		if (voiceConnection === null) return msg.channel.send('There must be music playing in order to change the volume.');
		if (!isAdmin(msg.member)) return msg.channel.send('You are not allowed to use this command.');

		const dispatcher = voiceConnection.player.dispatcher;
		if (!suffix) return msg.channel.send(`Volume is at \`${dispatcher.volume*100}\``)
        if (suffix > 200 || suffix < 0) return msg.channel.send('Volume value out of range.')
        
		await dispatcher.setVolume((suffix/100));
		await msg.channel.send(`Volume was set to ${suffix}`);
    }
    
    async function settings(msg) {
		const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);

        var embed = {
            color: 10731148,
            title: 'Settings',
            footer: {
                text: 'Powered by Lisa Music Player - https://github.com/Terax235/Lisa'
            },
            fields: []
        }

        if (voiceConnection !== null) {
            embed.fields = [
                {
                    inline: true,
                    name: `Music`,
                    value: stripIndent`
                        Volume: ${voiceConnection.player.dispatcher.volume*100 || DEFAULT_VOLUME}
                    `
                },
                {
                    inline: true,
                    name: `Player`,
                    value: stripIndent`
                        Global Queue: ${GLOBAL}
                        All Skip: ${ALLOW_ALL_SKIP}
                    `
                },
                {
                    inline: true,
                    name: `Queue`,
                    value: stripIndent`
                        Max Queue Size: ${MAX_QUEUE_SIZE}
                        Max Playlist Size: ${MAX_PLAYLIST_LENGTH}
                    `
                }
            ]
        }

		await msg.channel.send({ embed })
	}

    async function executeQueue(msg, queue) {
        if (queue.length === 0) {
            await msg.channel.send('That\'s a wrap everyone!')

            const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
            if (voiceConnection !== null) return await
            voiceConnection.disconnect();
        }

        new Promise(async (resolve, reject) => {
            const voiceConnection = await client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
            if (voiceConnection === null) {
                if (msg.member.voiceChannel) {
                    const voiceChannel = msg.member.voiceChannel;
                    if (!msg.guild.me.voiceChannel) {
                        if (!voiceChannel.joinable) return await msg.channel.send(`I can't join \`${voiceChannel.name}\` due to missing permissions.`)
                        if (voiceChannel.full) return await msg.channel.send(`\`${voiceChannel.name}\` is full.`)
                        if (!voiceChannel.speakable) return await msg.channel.send(`I can't speak in \`${voiceChannel.name}\`.`)            
                    }
                    if (msg.member.deaf) return await msg.channel.send(`You must be undeafend in \`${voiceChannel.name}\`.`)

                    await msg.member.voiceChannel.join().then(async connection => {
                        await resolve(connection);
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    await queue.splice(0, queue.length);
                    await reject();
                }
            } else {
                await resolve(voiceConnection);
            }
        }).then(async connection => {
            const video = queue[0];

            let dispatcher = await connection.playStream(ytdl(video.webpage_url, {
                filter: 'audioonly'
            }), {
                seek: 0,
                volume: (DEFAULT_VOLUME/100)
            })

            await msg.channel.send({
                embed: {
                    color: 10731148,
                    title: 'Now Playing',
                    description: `For more info. Use ${prefix}songinfo.`,
                    fields: [
                        {
                            name: `${video.title}`,
                            value: `by ${video.uploader}`
                        }
                    ],
                    thumbnail: {
                        url: video.thumbnail
                    },
                    footer: {
                        text: 'Powered by Lisa Music Player - https://github.com/Terax235/Lisa'
                    }
                }
            }).then(() => {
                connection.on('error', async (error) => {
                    console.log(error);
                    await queue.shift();
                    await executeQueue(msg, queue);
                })

                dispatcher.on('error', async (error) => {
                    console.log(error);
                    await queue.shift();
                    await executeQueue(msg, queue);
                });

                dispatcher.on('end', async () => {
                    setTimeout(async () => {
                        if (queue.length !== 0) {
                            if (connection.channel.members.size < 2) {
                                return await msg.channel.send('Seems like everyone left. I\'ll do the same.').then(async () => {
                                    await connection.channel.leave();
                                    await queue.splice(0, queue.length);
                                })
                            }
                        }

                        if (queue.length > 0) {
                            await queue.shift();
                            await executeQueue(msg, queue);
                        }
                    }, 1000);
                })
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        });
    }
}
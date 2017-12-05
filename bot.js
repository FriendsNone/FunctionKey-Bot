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
const { token, prefix, owner } = require('./config.json');
const { version } = require('./package.json');
const { info, warn, error } = require('./structures/colors');
const path = require('path');

const client = new commando.Client({
    commandPrefix: prefix,
    owner: owner
});

client
    .on('ready', () => {
        console.log(`${info} Function Key v${version} is ready to rock!\n       Logged in as ${client.user.tag} (${client.user.id})\n       Logged in at ${new Date(client.readyAt)}`);
        console.log(`${info} Now serving ${client.guilds.size} guilds!\n       ${client.guilds.map(g=>`${g.name} (${g.id})`).join(',\n       ')}`);
        require('./structures/games.js')(client)
		client.setInterval(() => {
            require('./structures/games.js')(client)
        }, 300000)
    })
    .on('disconnect', () => {
        console.warn(`${error} I got completely disconnected from Discord!`);
    })
    .on('reconnecting', () => {
        console.warn(`${warn} I've lost connection to Discord. Initiating fail-safe!`);
    })
	.on('commandError', (cmd, e) => {
		if(e instanceof commando.FriendlyError) return;
		console.error(`${error} Error in command ${cmd.groupID}:${cmd.memberName}\n       ${e.name}: ${e.message}`, e);
    })

client.registry
    .registerGroups([
        ['fun', 'Fun'],
        ['util', 'Utilities'],
        ['info', 'Informative']
    ])
    .registerCommandsIn(path.join(__dirname, 'modules'));
    require('./structures/music.js')(client);
    
client.login(token);
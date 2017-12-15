/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { CommandoClient, FriendlyError } = require('discord.js-commando');
const { token, prefix, owner } = require('./config/bot.json');
const { version } = require('./package.json');
const { info, warn, error } = require('./structures/colors');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owner,
    disableEveryone: true
});

client
    .on('ready', () => {
        console.log(`${info} Function Key v${version} is ready to rock!\n       Logged in as ${client.user.tag} (${client.user.id})\n       Logged in at ${new Date(client.readyAt)}`);
        console.log(`${info} Now serving ${client.guilds.size} guilds!\n       ${client.guilds.map(g=>`${g.name} (${g.id})`).join(',\n       ')}`);

        require('./structures/games.js')(client);
        client.setInterval(() => {
            require('./structures/games.js')(client);
        }, 300000);
    })
    .on('disconnect', () => {
        console.warn(`${error} I got completely disconnected from Discord!`);
    })
    .on('reconnecting', () => {
        console.warn(`${warn} I've lost connection to Discord. Initiating fail-safe!`);
    })
    .on('commandError', (cmd, e) => {
        if(e instanceof FriendlyError) return;
        console.error(`${error} Error in command ${cmd.groupID}:${cmd.memberName}\n       ${e.name}: ${e.message}`);
    });

client.registry
    .registerGroups([
        ['fun', 'Fun'],
        ['info', 'Informative'],
        ['music', 'Music'],
        ['util', 'Utilities']
    ])
    .registerDefaultTypes()
    .registerCommandsIn(path.join(__dirname, 'modules'));

client.login(token);

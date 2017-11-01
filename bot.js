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
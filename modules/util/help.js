const commando = require('discord.js-commando');
const { version } = require('../../package.json');

module.exports = class HelpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'util',
            memberName: 'help',
            description: 'Shows available commands',
            format: '(command)'
        });
    }

    async run(message, args) {
        if (!args) {
            let data = this.client.registry.groups;
            let groups = data.map(g => g.name);
            let commands = data.map(g => g.commands.map(g => g.name));

            let embed = {
                color: 8962256,
                author: {
                    name: `${this.client.user.username} ${version} Lists of Commands`,
                    iconURL: this.client.user.displayAvatarURL(),
                    url: 'https://github.com/FriendsNone/FunctionKey-Bot'
                },
                footer: {
                    text: `Don't forget! My prefix is '${message.guild.commandPrefix}'`
                },
                timestamp: new Date(),
                fields: []
            }
            
            for (var i=0; i < groups.length; i++) {
                for (var i=0; i < commands.length; i++) {
                    embed.fields[i] = {
                        name: groups[i],
                        value: commands[i].join('\n'),
                        inline: true
                    }
                }
            }

            message.channel.send({ embed })
        } else {
            let command = this.client.registry.findCommands(args, false, message);

            message.channel.send({ 
                embed: {
                    color: 8962256,
                    author: {
                        name: `Viewing help for '${command[0].name}'`,
                        iconURL: this.client.user.displayAvatarURL(),
                        url: 'https://github.com/FriendsNone/FunctionKey-Bot'
                    },
                    footer: {
                        text: `Remember! Optional parameters are noted with '()'`
                    },
                    fields: [
                        {
                            name: 'Parameters',
                            value: command[0].format,
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: command[0].description,
                            inline: true
                        }
                    ]
                }
            })
        }
    }
};

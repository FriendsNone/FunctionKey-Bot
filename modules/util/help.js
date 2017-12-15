 /**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 */

const { Command } = require('discord.js-commando');
const { version } = require('../../package.json');

module.exports = class Util_Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'util',
            memberName: 'help',
            description: 'Shows available commands',
            format: '(command)',
            args: [
                {
                    key: 'command',
                    prompt: 'What command should we look at?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    run(message, { command }) {
        if (!command) {
            const data = this.client.registry.groups;
            const groups = data.map(g => g.name);
            const commands = data.map(g => g.commands.map(g => g.name));

            const embed = {
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
            };

            for (let x = 0; x < groups.length; x++) {
                for (let y = 0; y < commands.length; y++) {
                    embed.fields[y] = {
                        name: groups[y],
                        value: commands[y].join('\n'),
                        inline: true
                    };
                }
            }

            message.channel.send({ embed });
        } else {
            const commandx = this.client.registry.findCommands(command, false, message);

            message.channel.send({
                embed: {
                    color: 8962256,
                    author: {
                        name: `Viewing help for '${commandx[0].name}'`,
                        iconURL: this.client.user.displayAvatarURL(),
                        url: 'https://github.com/FriendsNone/FunctionKey-Bot'
                    },
                    footer: {
                        text: 'Remember! Optional parameters are noted with \'()\''
                    },
                    fields: [
                        {
                            name: 'Parameters',
                            value: commandx[0].format,
                            inline: true
                        },
                        {
                            name: 'Description',
                            value: commandx[0].description,
                            inline: true
                        }
                    ]
                }
            });
        }
    }
};

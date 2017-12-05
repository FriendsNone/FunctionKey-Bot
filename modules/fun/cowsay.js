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
const cowsay = require('cowsay');

class CowsayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cowsay',
            group: 'fun',
            memberName: 'cowsay',
            description: 'Moo!',
            format: '[words]'
        });
    }

    async run(message, args) {
        if (!args) {
            message.channel.send('```\n' + cowsay.say({ text : 'Meow!' }) + '```');
        } else {
            message.channel.send('```\n' + cowsay.say({ text : args }) + '```');
        }
    }
}

module.exports = CowsayCommand;
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

class RollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'fun',
            memberName: 'roll',
            description: 'Rolls a dice',
            format: '(sides)'
        });
    }

    async run(message, args) {
        if (!args) {
            let roll = Math.floor(Math.random() * 6) + 1;
            message.channel.send(`<@${message.author.id}> rolled a ${roll}!`);
        } else if (isNaN(args) === true) {
            message.channel.send('ASCII characters are awesome you know. But it\'s not a number')
        } else {
            let roll = Math.floor(Math.random() * (Number(args.toString()) - 1) + 1);
            message.channel.send(`<@${message.author.id}> rolled a ${roll}!`);
        }
    }
}

module.exports = RollCommand;

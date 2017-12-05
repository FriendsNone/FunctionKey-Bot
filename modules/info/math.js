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
const math = require('mathjs');

class MathCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'math',
            group: 'info',
            memberName: 'math',
            description: 'Calculates equations. (Can be inaccurate)',
            format: '[equation]'
        });
    }

    async run(message, args) {
        var parser = math.parser();
        
        try {
            var result = parser.eval(args);
        } catch (e) {
            var result = e;
        }

        var finalResult= math.format(result, {precision: 14});

        if (!args) {
            message.channel.send('I swear. If you type in `1+1`, I\'ll kill you.');
        } else {
            message.channel.send('```\n' + args + ' = ' + finalResult + '```');
        }
    }
}

module.exports = MathCommand;
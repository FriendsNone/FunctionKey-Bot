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
const commando = require('discord.js-commando');
const request = require('request');

class XKCDCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            group: 'fun',
            memberName: 'xkcd',
            description: 'Sends a random XKCD comic.',
            format: 'n/a'
        });
    }

    async run(message, args) {
        var r = request.get('https://c.xkcd.com/random/comic/', function (err, res, body) {
            message.channel.send(`Here's your daily dose of **xkcd** ${r.uri.href}`);
        });
    }
}

module.exports = XKCDCommand;
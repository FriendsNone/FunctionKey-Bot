const commando = require('discord.js-commando');
const wtf = require('wtf_wikipedia');
const request = require('request');
const { warn } = require('../../structures/colors.js');

class WikiCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wiki',
            group: 'info',
            memberName: 'wiki',
            description: 'Shows information from Wikipedia',
            format: '[query]'
        });
    }

    async run(message, args) {
        wtf.from_api(args, "en", function(markup) {
            var data = wtf.parse(markup)

            try {
                message.channel.send({
                    embed: {
                        color: 8962256,
                        title: `Search query: '${args}'`,
                        description: `Requested at ${new Date()}`,
                        fields: [
                            {
                                name: `Summary`,
                                value: `${data.sections[0].sentences[0].text} ${data.sections[0].sentences[1].text}`
                            }
                        ],
                        image: {
                            url: data.images[0].url
                        }
                    }
                })

                request(data.images[0].url, function (error, response, body) {
                    if (response.statusCode == '404') {
                        let e = new commando.FriendlyError('Image not found');
                        console.log(`${warn} ${data.images[0].url} returned 404.\n       ${e.name}: ${e.message}`)
                    }
                });
            } catch (e) {
                message.channel.send(`What's a '${args}'?`)
                console.log(`${warn} Can't find any results for '${args}'.\n       ${e.name}: ${e.message} `)
            }
        })
    }
}

module.exports = WikiCommand;
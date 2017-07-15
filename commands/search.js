const Discord = require("discord.js");
const request = require("request");
const google = require("google");
const ddg = require('ddg');

module.exports.run = async (bot, message, args) => {
    bot.search = new Discord.Collection();

    var splits = message.content.split(",");
    var serv = splits[0];
    var query = splits[1];

    if(serv.indexOf("wiki") >= 0) {
        if(!query)
            var r = request.get('https://en.wikipedia.org/wiki/Special:Random', function (err, res, body) {
                message.channel.send(r.uri.href);
            });
        else {
            var r = request.get(`https://en.wikipedia.org/wiki/${query}`, function (err, res, body) {
                message.channel.send(r.uri.href);
            });
        }
    }

    if(serv.indexOf("google") >= 0) {
        google.resultsPerPage = 1
        var nextCounter = 0

        google(query, function (err, res){
        if (err) console.error(err)

            for (var i = 0; i < res.links.length; ++i) {
                var link = res.links[i];

                bot.search.set(link.title, link.href);
                message.channel.send(bot.search.get(1));
                //message.channel.send(link.title + ' - ' + link.href)
            }

            if (nextCounter < 4) {
                nextCounter += 1
                if (res.next) res.next()
            }
        })
    }

    if(serv.indexOf("ddg") >= 0) {
        options = {
            "useragent": "My duckduckgo app",
            "no_redirects": "1",
            "no_html": "0",
      }

      ddg.query(query, options, function(err, data){
            console.log(data.AbstractText)
      });
    }
}

module.exports.help = {
    name: "search",
    usage: "search",
    desc: "Hey! Look! It searches!",
    ex: "search"
}

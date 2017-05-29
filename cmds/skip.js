function play(connection, message) {
    server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else try {
            connection.disconnect();
        } catch (e) {
            console.log("opusscript is drunk again.");
            console.log("note to self. use node-opus");
        }
    });
}

var servers = {};

module.exports.run = async (bot, message, args) => {    
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
}

module.exports.help = {
    name: "skip"
}
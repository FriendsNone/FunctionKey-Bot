module.exports.run = async (bot, message, args) => {
    var x = Math.floor(Math.random() * ((args[0] - 1) + 1) + 1);

    if (!args[0] || args[0] == 0) {
        message.channel.send("Nope. It might break one of the laws of the universe.");
    } else if (args[0].match(/[a-z]/i)) {
        message.channel.send("Alphabets are cool you know. Too bad you can't roll them")
    } else if (args[0].indexOf("-") >= 0) {
        message.channel.send("Can you even roll a negative?")
    } else {
        message.channel.send(`<@${message.author.id}> rolled a ${x}`);
    }
}

module.exports.help = {
    name: "roll",
    args: "[sides]",
    notes: "A dice simulator."
}
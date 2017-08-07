module.exports.run = async (bot, message, args) => {
    switch (Math.floor(Math.random() * 1000) % 6) {
        case 0:
            message.channel.send(`Haha! I won by ${bot.ping}ms!`);
            break;
        case 1:
            message.channel.send('Much better than "Hello World!"'); 
            break;
        case 2:
            message.channel.send("Don't expect me to reply with `pong`");
            break;
        case 3:
            message.channel.send('Tennis!');
            break;
        case 4:
            message.channel.send('Badminton!');
            break;
        case 5:
            message.channel.send('Table Tennis!');
            break;
    }
}

module.exports.help = {
    name: "ping",
    args: "n/a",
    notes: "A very simple ping command."
}
module.exports.run = async (bot, message, args) => {
    await message.channel.send("Psst!", {files: [
        {
            attachment: "./assets/psst.gif"
        }
    ]});
}

module.exports.help = {
    name: "test",
    usage: "test",
    desc: "May contains explosions.",
    ex: "test"
}

module.exports.run = async (bot, message, args) => {
    //await message.channel.send("Psst!");
    await message.channel.send("Psst!", {files: [
        {
            attachment: "./pics/psst.gif"
        }
    ]});
}

module.exports.help = {
    name: "test",
    usage: "test",
    desc: "May contains explosions."
}

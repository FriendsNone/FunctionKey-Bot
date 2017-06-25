const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have manage messages.");

    let toUmute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toUmute) return message.channel.send("You did not specify a user mention or ID!");

    if (toMute.id === message.id) return message.channel.send("You cannot unmute yourself.");
    if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot unmute a member who is higher or has the same role as you.");

    let role = message.guild.roles.find(r => r.name === "Muted");
    
    if(!role || !toUmute.roles.has(role.id)) return message.channel.send("This user is not muted!");

    await toUmute.removeRole(role);

    delete bot.mutes[toUmute.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if (err) throw err;
        console.log(`I have unmuted ${toUmute.user.tag}.`);
    })
}

module.exports.help = {
    name: "umute",
    usage: "umute [user]",
    desc: "Unmutes that annoying user you've just muted.",
    ex: "umute @User"
}

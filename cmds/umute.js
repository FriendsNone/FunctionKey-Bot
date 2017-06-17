module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission");

    let toUmute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toUmute) return message.channel.send("Nothing to unmute");

    if(toUmute.id === message.id) return message.channel.send("you can't mute self");
    if(toUmute.highestRole.position >= message.member.highestRole.position) return message.channel.send("nope, staff");

    let role = message.guild.roles.find(r => r.name === "Muted");
    
    if(!role || !toUmute.roles.has(role.id)) return message.channel.send("asdf");

    await toUmute.removeRole(role);
    message.channel.send(`${toUmute} is now unmuted!`);
}

module.exports.help = {
    name: "umute",
    usage: "umute [user]",
    desc: "Unmutes that annoying user you've just muted.",
    ex: "umute @User"
}

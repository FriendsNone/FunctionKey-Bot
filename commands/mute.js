module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("don't have permissions");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Nothing to mute");

    if(toMute.id === message.id) return message.channel.send("you can't unmute self");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("nope, staff");
 
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                hoist: true,
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    if(toMute.roles.has(role.id)) return message.channel.send("Already muted");
    
    await toMute.addRole(role);
    message.channel.send("Muted");
}

module.exports.help = {
    name: "mute",
    usage: "mute  [user]",
    desc: "Mutes the annoying user in your server!",
    ex: "mute @User"
}

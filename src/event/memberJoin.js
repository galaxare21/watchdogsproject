const { Events, EmbedBuilder } = require('discord.js');
const { guild: { member_role, join_channel } } = require(`../../config.json`)

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member){

        if (!member.user.bot){
            const guild = member.guild;
            const role = await guild.roles.fetch(member_role);
            const channel = guild.channels.cache.find(channel => channel.id === join_channel);
            const embed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 512 }))
                .setTitle(`Bienvenue a ${member.displayName}`)
                .setDescription(`Bienvenue a toi, ${member.displayName} nous espérons que tu te plairas sur le serveur Discord de **🩸- Bloodlie RPG - ⚔**`)
                .setTimestamp();
            await channel.send({ embeds : [embed] });
            await member.roles.add(role);
        } else {
            await member.kick("IS A BOT");
        }
    }



}
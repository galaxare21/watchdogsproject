const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription("Cette commande vous permet de réautoriser les utilisateur a envoyer des message")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: true
        })
        await interaction.reply(`L'envoi de message a été rétabli par un modérateur`);
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} unlock ${channel.id}/${channel.name}`);

    }



}
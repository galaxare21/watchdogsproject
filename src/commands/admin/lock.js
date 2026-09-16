const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription("Cette commande vous permet d'empêcher l'envoi de messages dans un salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel;
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: false
        })
        await interaction.reply(`L'envoi de message a été verouillé par un modérateur`);
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} lock ${channel.id}/${channel.name}`);

    }



}
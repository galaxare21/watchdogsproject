const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription("envoi un poste de création de ticket")
    
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        const confirm = new ButtonBuilder()
			.setCustomId('NewTicket')
			.setLabel('Créer un ticket')
			.setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder() 
			.addComponents(confirm);

            const Embed = new EmbedBuilder() 
            .setColor(0x0099FF)
            .setTitle('Créer un ticket')
            .setDescription('Cliquez sur le bouton pour créer un ticket afin d\'entrer en contact avec le staff');

		await interaction.reply({
			embeds : [Embed],
			components: [row],
            
        });
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} request ticket message in ${interaction.channel.id}/${interaction.channel.name}`);


    }
}
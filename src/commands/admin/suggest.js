const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription("envoi un poste de création de suggestion")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction){

        
        const embed = new EmbedBuilder()
            .setColor(0xFFFF00)
            .setTitle(` suggestion `)
            .setDescription(`Vous pouvez faire des suggestions, que ce soit pour le Discord ou le serveur de jeu, en cliquant sur le bouton ci-dessous.`)
            .setTimestamp()

        const create = new ButtonBuilder()
            .setCustomId('NewSuggest')
            .setLabel('Faire une suggestion')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
	        .addComponents(create);

        await interaction.reply({ embeds : [embed], components: [row] });

        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} request suggest message in ${interaction.channel.id}/${interaction.channel.name}`);
    }



}
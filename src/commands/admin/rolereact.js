const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rolereact')
    .setDescription("Envois le menu permettant de sélectionner le rôle voulu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){

        const select = new StringSelectMenuBuilder()
			.setCustomId('rolereaction')
			.setPlaceholder('choissisez')
            .setMinValues(0)
			.setMaxValues(2)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('ds-changelog')
					.setDescription('Vous serez notifié sur les mises à jour du serveur Discord')
					.setValue('1406750543317176462'),
				new StringSelectMenuOptionBuilder()
					.setLabel('IG-changelog')
					.setDescription('Vous serez notifié sur les mises à jour du serveur Minecraft')
					.setValue('1406750582110294036'),
			);
            
		const row = new ActionRowBuilder()
			.addComponents(select);


        const embed = new EmbedBuilder()
            .setColor(0x0000FF)
            .setTitle(` role selection `)
            .setDescription(`Vous pouvez ici même choisir sur quel type d'annonce vous voulez être mentionné`)
            .addFields(
                { name: `\u200B`, value: `⚠️ note : vous serez quoi qu'il arrive mentionné sur les annonces importantes sous le terme @everyone` }, //Pas sûr si le "@" casse quelque chose...
            )
            .setTimestamp()
    
        await interaction.reply( {embeds: [embed], components: [row]} );
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} request role-selection message in ${interaction.channel.id}/${interaction.channel.name}`);






    }





}
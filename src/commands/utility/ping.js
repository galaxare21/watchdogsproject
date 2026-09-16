
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('affiche le ping du bot'),
	async execute(interaction, client) {
		await interaction.reply({content :`Ping du bot : ${Math.round(interaction.client.ws.ping)} ms`, flags: MessageFlags.Ephemeral});
	},
};
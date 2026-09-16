const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')

module.exports = {
    async execute(interaction){
        const guild = interaction.guild;

                    const confirm = new ButtonBuilder() 
			            .setCustomId('confirm')
			            .setLabel('OUI')
			            .setStyle(ButtonStyle.Danger);

                    const cancel = new ButtonBuilder() 
			            .setCustomId('cancel')
			            .setLabel('Non')
			            .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder()
                        .addComponents(confirm, cancel);



                    const response = await interaction.reply({
                        content: `Êtes vous sûr(e) de vouloir supprimer votre ticket?`,
                        components: [row],
                        withResponse: true,
                    });

                    const collectorFilter = i => i.user.id === interaction.user.id;
                    try {
                        const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                        if (confirmation.customId === 'confirm') {
                            await interaction.channel.delete()
                        } else if (confirmation.customId === 'cancel') {
                            await interaction.channel.bulkDelete(await interaction.channel.messages.fetch({ limit: 1 }));
                        }
                    } catch {
                        await interaction.editReply({ content: 'Aucune réponse reçue, interaction annulée.', components: [] });
                    }

                        }


}
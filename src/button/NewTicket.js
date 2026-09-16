const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } = require('discord.js')
const { guild: { clientId, everyone, ticket_category } } = require(`../../config.json`)

module.exports = {
    async execute(interaction){
        const guild = interaction.guild;
                    const category = guild.channels.cache.get(ticket_category);
                    const ticket = await guild.channels.create({
                        name: `${interaction.user.displayName}'s ticket`, 
                        type: 0,
                        parent: category, 
                        permissionOverwrites: [
                            {
                            id: clientId,
                            allow: ['ViewChannel'] 
                            },
                            {
                            id: interaction.user.id,
                            allow: ["ViewChannel"] 
                            },
                            {
                            id: everyone,
                            deny: ["ViewChannel"] 
                            }

                                        
                            ]
                    });
                    const delet = new ButtonBuilder() 
			            .setCustomId('Delticket')
			            .setLabel('Supprimer le ticket')
			            .setStyle(ButtonStyle.Danger);

                    // const transcript = new ButtonBuilder() 
			        //     .setCustomId('NewTranscript')
			        //     .setLabel('transcription')
			        //     .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder()
                        .addComponents(delet);

                    const Embed = new EmbedBuilder() 
                        .setColor(0x0099FF)
                        .setTitle(`Bienvenue, ${interaction.user.displayName}`)
                        .setDescription('Le staff répondra à votre demande dès que possible')

                    await ticket.send({
                        embeds : [Embed],
                        components: [row],})
                    await interaction.reply({ content: `Votre ticket a été créé avec succès!`, flags: MessageFlags.Ephemeral})

    }


}
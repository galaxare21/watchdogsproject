const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");


module.exports = {

    async execute(interaction){
    const modal = new ModalBuilder()
        .setCustomId("SuggestModal")
        .setTitle("suggestion");

    const title = new TextInputBuilder()
        .setCustomId('SuggestionTitle')
        .setLabel("Titre")
        .setStyle(TextInputStyle.Short) 
        .setMaxLength(50)
        .setRequired(true);

    const body = new TextInputBuilder()
        .setCustomId('SuggestionBody')
        .setLabel("Description")
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(500)
        .setRequired(true);

        const row1 = new ActionRowBuilder().addComponents(title);
        const row2 = new ActionRowBuilder().addComponents(body);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);
    }

}
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags} = require("discord.js");

module.exports = {

    async execute(Interaction){

        const title = Interaction.fields.getTextInputValue('SuggestionTitle');
        const body = Interaction.fields.getTextInputValue('SuggestionBody');

        const firstMessage = (await Interaction.channel.messages.fetch({ limit: 1 })).first();

            const suggestion = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle(` ✅ - suggestion  - ✅`)
            .setDescription(`L'utilisateur <@${Interaction.user.id}> a fait une suggestion`)
            .addFields(
                { name: `${title}`, value: `${body}` },
            )
            .setTimestamp();

            await firstMessage.delete();

        await Interaction.channel.send({embeds: [suggestion]})
        
        await Interaction.reply({ content: "Merci pour ta suggestion!", flags: MessageFlags.Ephemeral });

        const Message = (await Interaction.channel.messages.fetch({ limit: 1 })).first();

        await Message.react("❌");
        await Message.react("➖");
        await Message.react("✅");

        const message = new EmbedBuilder()
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

        await Interaction.channel.send({embeds: [message], components: [row]})


    }

}


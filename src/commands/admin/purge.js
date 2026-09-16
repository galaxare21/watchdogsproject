const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('supprime tout les message demandé')
    .addIntegerOption(option =>
        option.setName("amount")
            .setDescription("Nombre de message(s) à supprimer")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    
    async execute(interaction){
        const amount = interaction.options.getInteger('amount', true);
        if (amount < 1 || amount > 100) {
        return interaction.reply({ content: '⚠️ Entre 1 et 100 messages maximum.', flags: MessageFlags.Ephemeral });
    }
        await interaction.channel.bulkDelete(amount, true);
        interaction.reply({ content: `${amount} message(s) a (ont) correctement été supprimé(s)`, flags: MessageFlags.Ephemeral });
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} purged ${amount} in ${interaction.channel.id}/${interaction.channel.name}`);
    }
    
    
}
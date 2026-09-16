const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('démare a giveaway')
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration in seconds')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('Prize for the giveaway')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const duration = interaction.options.getInteger('duration');
        const prize = interaction.options.getString('prize');


        const giveawayMessage = await interaction.reply({
            content: `🎉 **GIVEAWAY STARTED!** 🎉\nprix: **${prize}**\nréagis avec 🎉 pour participer!\ntemp: **${duration}** seconde`,
            fetchReply: true
        });

        await giveawayMessage.react('🎉');


        setTimeout(async () => {

            const fetchedMessage = await interaction.channel.messages.fetch(giveawayMessage.id);
            const reaction = fetchedMessage.reactions.cache.get('🎉');
            if (!reaction) {
                await interaction.followUp("Personne n'a participé.");
                return;
            }


            const users = await reaction.users.fetch();
            const participants = users.filter(u => !u.bot);

            if (participants.size === 0) {
                await interaction.followUp("Personne n'a participé.");
                return;
            }

            const winner = participants.random();

            await interaction.followUp(`🎉 Félicitation <@${winner.id}>! Tu as gagné **${prize}**!`);
        }, duration * 1000);
    }
    
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('xp-reward')
    .setDescription("affiche la liste des récompense lié a l'XP"),

    async execute(interaction) {
        const guild = interaction.guild;
        const author = interaction.user.displayName;
        const author_icon = interaction.user.displayAvatarURL({ dynamic: true, size: 512 });
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const Embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("Info sur le système d'XP")
        .setAuthor({ name: `${author}`, iconURL: author_icon})
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .addFields(
            { name: "Work In Progress", value: "\u200B" },
        )
        .setTimestamp()
        .setFooter({ text: 'Passez une bonne journée sur notre Discord!', iconURL: guildIcon });
        await interaction.reply({ embeds: [Embed]})
    }

}
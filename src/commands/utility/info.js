const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guild: { galaxare21, defrey }, bloodlie_data: { CGU_link, PP_link} } = require("../../../config.json");


module.exports = {
    data : new SlashCommandBuilder()
    .setName('info')
    .setDescription("affiche des information lié au serveur"),

    async execute(interaction) {
        const guild = interaction.guild;
        const author = interaction.user.displayName;
        const author_icon = interaction.user.displayAvatarURL({ dynamic: true, size: 512 });
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const Embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('Info sur le serveur **bloodlie RPG**')
        .setAuthor({ name: `${author}`, iconURL: author_icon})
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .addFields(
            { name: 'Information géléral', value: "" },
            { name: ``, value: `Nombre d'utilisateurs : **${guild.memberCount - 2}** (sans les bots)` },
            { name: '', value: `Les directeur du serveur sont <@${galaxare21}> et <@${defrey}>` },
            { name: `Système d'expérience`, value: "" },
            { name: "", value: "vous pouvez gagner des niveau en parlant dans les différent chat textuel"},
            { name: "", value: "les niveau gagné vous donneron acces a des récompense exclusive"},
            { name: "", value: "/xp-reward pour plus d'info"},
            { name: `Système monétaire`, value: "" },
            { name: '', value: "D'autre info a venir..." },
            { name: '**lien utile**', value: ' ' },
//            { name: 'politique de confidentialité', value: PP_link },
//            { name: `condition générale d'utilisation`, value: CGU_link },
        )
        .setTimestamp()
        .setFooter({ text: 'Passez une bonne journée sur notre Discord!', iconURL: guildIcon });
        await interaction.reply({ embeds: [Embed]})
    }

}
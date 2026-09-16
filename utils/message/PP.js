const { EmbedBuilder } = require('discord.js');

function message(author, author_icon, guild_icon) {
    const Embed = new EmbedBuilder()
    .setColor(0x000000)
    .setTitle('Politique de confidentialité des données')
    .setURL("https://metrics-groupe.fr/page/PP.html")
    .setAuthor({ name: `${author}`, iconURL: author_icon})
    .setTimestamp()
    .setFooter({ text: 'par metrics-groupe', iconURL: guild_icon });
    return Embed
}



module.exports = message;
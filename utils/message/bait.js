const { EmbedBuilder } = require('discord.js');

function message(author, author_icon, guild_icon) {
    const Embed = new EmbedBuilder()
    .setColor(0x000000)
    .setTitle(":warning: salon d'appat :warning:")
    .addFields(
    { name: ` :shield: Ce salon sert d'appât pour intercepter les bots de spam et les comptes compromis.`, value: ' ' },
    { name: ``, value: ':stop_sign: Ne postez absolument aucun message dans ce salon sous peine de BANNISSEMENT DÉFINITIF ET IMMÉDIAT de ce serveur Discord.' }
    )
    .setTimestamp()
    .setFooter({ text: 'par metrics-groupe', iconURL: guild_icon });
    return Embed
}



module.exports = message;
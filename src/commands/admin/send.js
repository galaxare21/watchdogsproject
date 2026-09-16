const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('send')
    .setDescription("Cette commande vous permet d'envoyer des messages prédéfini")
    .addStringOption( Option => 
        Option.setName('message')
            .setDescription('Message que vous voulez envoyer')
            .setRequired(true)
            .addChoices(
                { name : "règlement", value : "rule" },
                { name : "confidentialité", value : "PP"},
                { name : "CGU", value : "CGU"},
                { name : "Bait", value : "bait"}
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
    const guild = interaction.guild;
    const file = interaction.options.getString('message', true);
    const message = require(`../../message/${file}.js`);
    const channel = interaction.channel;
    const author = interaction.user.displayName;
    const author_icon = interaction.user.displayAvatarURL({ dynamic: true, size: 512 });
    const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
    await channel.send({ embeds: [message(author, author_icon, guildIcon)]});
    await interaction.reply({ content: "Message envoyé avec succès!", flags: MessageFlags.Ephemeral });
    console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} send ${file} in ${channel.id}/${channel.name}`);
    }
    
}
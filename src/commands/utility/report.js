const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js")
const { guild: { report_channel }} = require("../../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('report')
    .setDescription("cette commande permet de signaler un utilisateur")
    .addUserOption( Option => 
        Option.setName('utilisateur')
            .setDescription("utilisateur")
            .setRequired(true)
    )
    .addStringOption( Option => 
        Option.setName('raison')
            .setDescription("Raison du signalement (peut contenir des infos supplémentaires)")
            .setRequired(true)
    ),
    async execute(interaction){
        await interaction.deferReply( { content: `veuillez patienter...`, flags: MessageFlags.Ephemeral} );
        const user = interaction.options.getUser('utilisateur', true);
        const reason = interaction.options.getString('raison', true).toLowerCase();
        const guild = interaction.guild;
        const channel = await guild.channels.fetch(report_channel)
        let connection
        try{
            connection = await pool.getConnection();
            await connection.query("INSERT INTO report (user, author, reason) VALUES (?, ?, ?)", [user.id, interaction.user.id, reason]);
        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if(connection) connection.release();
        }

        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(` 🚨 - Signalement  - 🚨`)
            .setDescription(`L'utilisateur <@${interaction.user.id}> a fait un signalement`)
            .addFields(
                { name: `\u200B`, value: `L'utilisateur <@${user.id}> a été signalé pour **${reason}**.` },
            )
            .setTimestamp();
        
        await channel.send({embeds: [embed]});
        await interaction.editReply( { content: `Votre signalement a bien été pris en compte. Notre équipe de modération examinera votre demande au plus vite`, flags: MessageFlags.Ephemeral} );

    }





}
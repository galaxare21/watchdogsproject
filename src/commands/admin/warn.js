const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");


module.exports = {
    data : new SlashCommandBuilder()
            .setName('warn')
            .setDescription("pour faire un avertissement a un utilisateur")
            .addUserOption( Option => 
                Option.setName('utilisateur')
                .setDescription("Utilisateur")
                .setRequired(true)
            )
            .addStringOption( Option => 
                Option.setName("raison")
                    .setDescription("Raison (peut contenir des infos supplémentaire)")
                    .setRequired(true)
                    .setMaxLength(100)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction){
        await interaction.reply({content: "Mise en place du warn", flags: MessageFlags.Ephemeral})
        const channel = interaction.channel;
        const user = interaction.options.getUser('utilisateur', true);
        const reason = interaction.options.getString('raison', true).toLowerCase();
        let connection;
        try{
            connection = await pool.getConnection();
            await connection.query("INSERT INTO warn (user, author, reason) VALUES (?, ?, ?)", [user.id, interaction.user.id, reason]);
        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if(connection) connection.release();
        }           

        await interaction.followUp({content: "Le warn a bien été appliqué", flags: MessageFlags.Ephemeral});
        await channel.send(`<@${user.id}>, vous avez été averti pour \`${reason}\``);
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} warn ${user.id}/${user.username}`);

    }
        }
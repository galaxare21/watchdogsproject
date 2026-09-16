const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");


module.exports = {
    data : new SlashCommandBuilder()
            .setName('ban')
            .setDescription("Bannit un utilisateur")
            .addUserOption( Option => 
                Option.setName('utilisateur')
                .setDescription("Utilisateur a ban")
                .setRequired(true)
            )
            .addStringOption( Option => 
                Option.setName("raison")
                    .setDescription("Raison du ban")
                    .setRequired(true)
                    .setMaxLength(100)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction){
        await interaction.reply({content: "Nous procédons au bannissement", flags: MessageFlags.Ephemeral})
        const channel = interaction.channel;
        const user = interaction.options.getUser('utilisateur', true);
        const reason = interaction.options.getString('raison', true).toLowerCase();
        const member = interaction.guild.members.cache.get(user.id);
        let connection
        try{
            connection = await pool.getConnection();
            await connection.query("INSERT INTO ban (user, author, reason) VALUES (?, ?, ?)", [user.id, interaction.user.id, reason]);
        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if(connection) connection.release();
        }

        await member.send(`Vous avez été banni du serveur **${interaction.guild.name}** pour ${reason}`);
        await member.ban({ reason: reason });
        await interaction.followUp({content: "L'utilisateur a bien été banni", flags: MessageFlags.Ephemeral});
        await channel.send(`<@${user.id}> a été banni pour \`${reason}\``);
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} banned ${user.id}/${user.username}`);

    }
        }
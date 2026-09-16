const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");


module.exports = {
    data : new SlashCommandBuilder()
            .setName('kick')
            .setDescription("Kick un utilisateur")
            .addUserOption( Option => 
                Option.setName('utilisateur')
                .setDescription("Utilisateur a kick")
                .setRequired(true)
            )
            .addStringOption( Option => 
                Option.setName("raison")
                    .setDescription("Raison du kick")
                    .setRequired(true)
                    .setMaxLength(100)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction){
        await interaction.reply({content: "Nous procédons à l'expulsion", flags: MessageFlags.Ephemeral});
        const channel = interaction.channel;
        const user = interaction.options.getUser('utilisateur', true);
        const reason = interaction.options.getString('raison', true).toLowerCase();
        const member = interaction.guild.members.cache.get(user.id);
        let connection;
        try{
            connection = await pool.getConnection();
            await connection.query("INSERT INTO kick (user, author, reason) VALUES (?, ?, ?)", [user.id, interaction.user.id, reason]);
        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if(connection) connection.release();
        }
        await member.send(`Vous avez été expulsé du serveur **${interaction.guild.name}** pour ${reason}`);
        await member.kick(reason);
        await interaction.followUp({content: "L'utilisateur a bien été expulsé", flags: MessageFlags.Ephemeral});
        await channel.send(`<@${user.id}> a été expulsé pour \`${reason}\``);
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} kick ${user.id}/${user.username}`);

    }
        }
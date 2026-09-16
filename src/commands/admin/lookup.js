const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");

module.exports = {
    data : new SlashCommandBuilder()
            .setName('lookup')
            .setDescription("Sert à vérifier les sanction d'un utilisateur")
            .addUserOption( Option => 
                Option.setName('utilisateur')
                .setDescription("L'utilisateur à lookup")
                .setRequired(true)
            )     
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
            async execute(interaction){
                await interaction.reply( { content: "Préparation de la réponse", flags: MessageFlags.Ephemeral } );
                const user = interaction.options.getUser('utilisateur', true);
                const channel = interaction.channel;
                let warn
                let mute
                let kick
                let ban
                let report
                let connection
                try {
                    connection = await pool.getConnection();
                    warn = await connection.query(`SELECT * FROM warn WHERE user = ?`, [user.id]);
                    mute = await connection.query(`SELECT * FROM mute WHERE user = ?`, [user.id]);
                    kick = await connection.query(`SELECT * FROM kick WHERE user = ?`, [user.id]);
                    ban = await connection.query(`SELECT * FROM ban WHERE user = ?`, [user.id]);
                    report = await connection.query(`SELECT * FROM report WHERE user = ?`, [user.id]);
                } catch (err) {
                    console.error("Erreur MariaDB: " + err);
                } finally {
                    if(connection) connection.release();
                }

                

                await interaction.followUp(`L'utilisateur **${user.username}** a été averti **${warn.length}** fois, rendu muet **${mute.length}** fois, expulsé **${kick.length}**fois, banni **${ban.length}** fois et a été signalé **${report.length}** fois.`);
                await channel.send(`-------------------------------------------------  **warn**  ----------------------------------------------------`);
                for(let i = 0; i < warn.length; i++){
                    const author = warn[i].author;
                    const member = await interaction.client.users.fetch(author);
                    await channel.send(`warn **n°${i+1}**: donné par **${member.username}**, pour la raison **${warn[i].reason}**`);
                }
                await channel.send(`-------------------------------------------------  **mute**  ----------------------------------------------------`);
                for(let i =0; i < mute.length; i++){
                    const author = mute[i].author;
                    console.log("this: "+ author);
                    const member = await interaction.client.users.fetch(author);
                    await channel.send(`mute **n°${i+1}**: donné par **${member.username}**, pour la raison **${mute[i].reason}**`);
                }
                await channel.send(`-------------------------------------------------  **kick**  ----------------------------------------------------`);
                for(let i = 0; i < kick.length; i++){
                    const author = kick[i].author;
                    const member = await interaction.client.users.fetch(author);
                    await channel.send(`kick **n°${i+1}**: donné par **${member.username}**, pour la raison **${kick[i].reason}**`);
                }
                await channel.send(`-------------------------------------------------  **ban**  ----------------------------------------------------`);
                for(let i = 0; i < ban.length; i++){
                    const author = ban[i].author;
                    const member = await interaction.client.users.fetch(author);
                    await channel.send(`ban **n°${i+1}**: donné par **${member.username}**, pour la raison **${ban[i].reason}**`);

                }
                await channel.send(`-------------------------------------------------  **report**  ----------------------------------------------------`);
                for(let i = 0; i < report.length; i++){
                    const author = report[i].author;
                    const member = await interaction.client.users.fetch(author);
                    await channel.send(`report **n°${i+1}**: donné par **${member.username}**, pour la raison **${report[i].reason}**`);
                }
                await interaction.followUp({ content: `Tout l'historique des sanctions de cet utilisateur a été envoyé`, ephemeral: true});
                
                console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} lookup ${user.id}/${user.username}`);
                
            }}
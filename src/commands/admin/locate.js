const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");
let ans;


module.exports = {
    data : new SlashCommandBuilder()
        .setName('locate')
        .setDescription("Cette commande vous permet d'accéder au log des messages")
        .addStringOption( Option =>
            Option.setName('type')
                .setDescription("Le type d'info que vous voulez comparer")
                .setRequired(true)
                .addChoices(
 //                 { name : "id_message", value : "id" },
                 { name : "auteur", value : "author" },
 //                   { name : "salon" , value : "channel" },
                ))
        .addStringOption( Option => 
            Option.setName('element')
                .setDescription("Un élément")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

        async execute(interaction){            
            const type = interaction.options.getString('type', true).toLowerCase();
            const element = interaction.options.getString('element', true).toLowerCase();
            const channel_interaction = interaction.channel;
            let connection;
            try{
                connection = await pool.getConnection();
            switch (type){
                case "id":
                    ans = await connection.query('SELECT * FROM message WHERE message_id = ?', [element]);
                    break;
                case "author":
                    ans = await connection.query('SELECT * FROM message WHERE author = ?', [element]);
                    break;
                case "channel":
                    ans = await connection.query('SELECT * FROM message WHERE channel = ?', [element]);
                    break;
            }
        } catch (err){
            console.error(err);
        } finally {
            if(connection) connection.release();
        }
            await interaction.reply({ content: "Démarage de l'envoi des messages...", flags: MessageFlags.Ephemeral});
            for (let i = 0; i < ans.length; i++){
                const author = ans[i].author;
                const channel_id = ans[i].channel;
                const channel = await interaction.client.channels.fetch(channel_id);
                const user = await interaction.client.users.fetch(author);
                await channel_interaction.send(`**message_id** : ${ans[i].message_id}, **author :** ${user.username}, **content :** ${ans[i].content}, **channel :** ${channel.name}, **edited :** ${ans[i].edited}, **deleted :** ${ans[i].deleted}, **date** : ${ans[i].date}`);
                await channel_interaction.send("-----------------------------------------------------------------------------------------------------------------------------");
            }
            await interaction.followUp({content:"Tous les messages ont été envoyés", flags: MessageFlags.Ephemeral});
        }
        

    


}
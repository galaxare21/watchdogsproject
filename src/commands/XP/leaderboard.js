const discord = require('discord.js')
const { SlashCommandBuilder, MessageFlags, EmbedBuilder, userMention  } = require('discord.js');
const pool = require("../../../MariaDB.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription(`affiche le leaderboard d'XP`),

    async execute(interaction){
    const guild = interaction.guild;

    const author = interaction.user.displayName;
    const author_icon = interaction.user.displayAvatarURL({ dynamic: true, size: 512 });
    const guild_icon = guild.iconURL({ dynamic: true, size: 512 });
        try {
            connection = await pool.getConnection();

            podium = await connection.query(`SELECT * FROM XP ORDER BY xp DESC LIMIT 5`);
            const leaderboard = new EmbedBuilder()
                .setColor(0x6666FF)
                .setTitle('podium')
                .setAuthor({ name: `${author}`, iconURL: author_icon})
                .addFields(
                    { name: 'podium - xp', value: ' ' },
                    { name: '\u200B', value: `:first_place: ${userMention(podium[0].user)} qui est niveau : ${podium[0].level}, avec ${podium[0].xp}xp` },
                    { name: '\u200B', value: `:second_place: ${userMention(podium[1].user)} qui est niveau : ${podium[1].level}, avec ${podium[1].xp}xp` },
                    { name: '\u200B', value: `:third_place: ${userMention(podium[2].user)} qui est niveau : ${podium[2].level}, avec ${podium[2].xp}xp` },
                    { name: '\u200B', value: `:star2: ${userMention(podium[3].user)} qui est niveau : ${podium[3].level}, avec ${podium[3].xp}xp` },
                    { name: '\u200B', value: `:star: ${userMention(podium[4].user)} qui est niveau : ${podium[4].level}, avec ${podium[4].xp}xp` },                    
            
                )
                .setTimestamp()
                .setFooter({ text: 'Passez une bonne journée sur notre Discord!', iconURL: guild_icon });

            await interaction.reply({ embeds: [leaderboard]});

        } catch(err){
            console.error("Erreur MariaDB: ", err);

        } finally {
            if (connection) connection.release();
        }

    }

}
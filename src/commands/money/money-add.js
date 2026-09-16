const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js")
const pool = require("../../../MariaDB.js")
const { getlevel, getxp } = require("../../../utils/utils.js")
const { money:{ name } } = require("../../../config.json")

module.exports = {
    data : new SlashCommandBuilder()
    .setName('money-add')
    .setDescription(`cette commande vous permet de modifier la quantité de bloodcoin que possède un utilisateur`)
    .addUserOption( Option => 
        Option.setName('utilisateur')
        .setDescription('utilisateur')
        .setRequired(true)
    )
    .addIntegerOption( Option => 
        Option.setName('value')
        .setDescription(`la quantité de bloodcoin que vous voulez ajouter`)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur', true);
        const amount = interaction.options.getInteger('value', true);

        let connection;
        let coin;


        
        if(amount <= 0){
        await interaction.reply({ content :`vous ne pouvez pas utiliser de valeur négative`, flags: MessageFlags.Ephemeral}); 
        return;
    }

        try {
            connection = await pool.getConnection();
            await connection.query('INSERT IGNORE INTO money (user, coin) VALUES (?, ?)', [ user.id, 0 ]);
            coin = await connection.query('SELECT * FROM money WHERE user = ?', [ user.id ]);
            
            coin = coin[0].coin + amount

            await connection.query('UPDATE money SET coin = ? WHERE user = ?', [ coin, user.id ])


        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if (connection) connection.release();
        }
        await interaction.reply({ content :`vous avez correctement ajouté ${amount} ${name} a ${user.username}`, flags: MessageFlags.Ephemeral});

    }
    



}
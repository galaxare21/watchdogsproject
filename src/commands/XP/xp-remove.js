const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js")
const pool = require("../../../MariaDB.js")
const { getlevel, getxp } = require("../../../utils/utils.js");
const level = require("./level.js");

module.exports = {
    data : new SlashCommandBuilder()
    .setName('xp-remove')
    .setDescription(`cette commande vous permet de modifier l'xp d'un utilisateur`)
    .addUserOption( Option => 
        Option.setName('utilisateur')
        .setDescription('utilisateur')
        .setRequired(true)
    )
    .addStringOption( Option =>
        Option.setName('type')
        .setDescription('choissisez entre xp et lvl')
        .addChoices(
            { name : "xp", value : "xp"},
            { name : "lvl", value: "lvl"}
        )
        .setRequired(true)
    )
    .addIntegerOption( Option => 
        Option.setName('value')
        .setDescription(`la quantité d'xp/lvl que vous voulez ajouter`)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur', true);
        const type = interaction.options.getString('type', true);
        const amount = interaction.options.getInteger('value', true);

        let connection;
        let new_xp;
        let xp = amount;
        let rest

        if(amount <= 0){
        await interaction.reply({ content :`vous ne pouvez pas utiliser de valeur négative`, flags: MessageFlags.Ephemeral}); 
        return;
    }
        
        try {
            connection = await pool.getConnection();
            await connection.query('INSERT IGNORE INTO XP (user, level, xp) VALUES (?, ?, ?)', [ user.id, 1, 115 ]);
            new_xp = await connection.query('SELECT * FROM XP WHERE user = ?', [ user.id ]);
            if(type === "xp"){
            xp = new_xp[0].xp - xp
        } else {
            xp = new_xp[0].level - xp
            rest = new_xp[0].xp - getxp(new_xp[0].level)
            xp = getxp(xp) + rest
        }
        if(xp < 0 ){
        await interaction.reply({ content :`vous ne pouvez pas retirer autant d'xp`, flags: MessageFlags.Ephemeral}); 
        if (connection) connection.release();
        return;
    }

            await connection.query('UPDATE XP SET level = ?, xp = ? WHERE user = ?', [ getlevel(xp), xp, user.id ])


        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if (connection) connection.release();
        }
        await interaction.reply({ content :`l'xp de l'utilisateur a correctement été changé`, flags: MessageFlags.Ephemeral})

    }
    



}
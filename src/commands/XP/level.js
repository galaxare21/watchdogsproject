const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { createCanvas, loadImage } = require("canvas");
const { draw_xp_card } = require("../../../utils/graphic.js")
const { map, getxp } = require("../../../utils/utils.js")
const pool = require("../../../MariaDB.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription("affiche votre niveau ou celui d'un autre utilisateur")
    .addUserOption( Option => 
                Option.setName('utilisateur')
                .setDescription("utilisateur (votre niveau sera affiché si laissé vide)")
                .setRequired(false)
            ),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur', false) || interaction.user

    let connection;
    let xp;
    let lvl;
    let rank
    /*
    
            ici on récupère les donné dans la base mariadb
    
    */
    try {
            connection = await pool.getConnection();
            await connection.query(`INSERT IGNORE INTO XP (user, level, xp) VALUES (?, ?, ?)`, [ user.id, 0, 0]);
            const data_xp = await connection.query(`SELECT * FROM XP WHERE user = ?`, [ user.id ]);
            rank = await connection.query(`SELECT rang FROM (
                                        SELECT user, RANK() OVER (ORDER BY xp DESC, id ASC) AS rang
                                        FROM XP
                                      ) AS ranked
                                      WHERE user = ?;`, [user.id]);
            rank = rank[0].rang;
            const xp_data = data_xp[0];
            xp = xp_data.xp;
            lvl = xp_data.level;

        } catch(err){
            console.error("Erreur MariaDB: ", err);

        } finally {
            if (connection) connection.release();
        }

    const progress = map(xp - getxp(lvl), 0, getxp(lvl + 1) - getxp(lvl), 0, 100)


    const img = await draw_xp_card(user, xp, lvl, rank, progress);
    

    await interaction.reply({
      files: [{ attachment: img, name: "xp.png" }]
    });
  }
};


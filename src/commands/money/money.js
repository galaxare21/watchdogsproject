const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");
const { draw_money_card } = require("../../../utils/graphic.js")
const { truncateText } = require("../../../utils/utils.js")
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('money')
    .setDescription("affiche vos bloodcoin ou ceux d'un autre utilisateur")
    .addUserOption( Option => 
                Option.setName('utilisateur')
                .setDescription("utilisateur (votre niveau sera affiché si laissé vide)")
                .setRequired(false)
            ),
    async execute(interaction) {
    const user = interaction.options.getUser('utilisateur', false) || interaction.user;


    let connection;
    let coin;
    let rank;

    try {
            connection = await pool.getConnection();
            await connection.query(`INSERT IGNORE INTO money (user, coin) VALUES (?, ?)`, [ user.id, 0]);
            const coin_db = await connection.query(`SELECT * FROM money WHERE user = ?`, [ user.id ]);
            rank = await connection.query(`SELECT rang FROM (
                                        SELECT user, RANK() OVER (ORDER BY coin DESC, id ASC) AS rang
                                        FROM money
                                      ) AS ranked
                                      WHERE user = ?;`, [user.id]);

            coin = coin_db[0].coin;
            rank = rank[0].rang;
        } catch(err){
            console.error("Erreur MariaDB: ", err);

        } finally {
            if (connection) connection.release();
        }

        console.log("coin:", coin, "rank:", rank);
        const img = await draw_money_card(user, coin, rank);

    await interaction.reply({
      files: [{ attachment: img, name: "xp.png" }]
    });


}}
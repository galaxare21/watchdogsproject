const { Events } = require('discord.js');
const { guild: { clientId } } = require("../../config.json");
const pool= require("../../MariaDB.js")

module.exports = {
    name: Events.MessageUpdate,
    async execute(message){
        if(message.author.id !== clientId){
            let connection;
            try{
                connection = await pool.getConnection();
                await connection.query("UPDATE message SET edited = edited + 1 WHERE message_id = ?", [message.id ]);
            } catch (err) {
                console.error("Erreur MariaDB: ", err);
            } finally {
                if(connection) connection.release();
            }
        }
    }
}
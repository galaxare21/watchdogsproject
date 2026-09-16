const { Events } = require('discord.js');
const { client: { clientId } } = require("../../config.json");
const pool= require("../../MariaDB")


module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.author.id !== clientId){
        let connection
        try{
            connection = await pool.getConnection();
            await connection.query("UPDATE message SET deleted = 1 WHERE message_id = ?", [message.id]);
        } catch (err){
            console.error("Erreur MariaDB: " + err);
        } finally {
            if(connection) connection.release();
        }
    }
    }
}
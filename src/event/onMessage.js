const { Events } = require("discord.js");
const { client: { clientId, clientTestId }, guild:{ bait_channel }, xp:{ cooldowns, xp_gain, xp_gain_long, long_message_characters } } = require("../../config.json");
const { getlevel } = require("../../utils/utils.js")
const pool = require("../../MariaDB.js")
const xpCooldowns = new Map();



module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.id !== clientId && message.author.id !== clientTestId){
        let connection;
        try {
            connection = await pool.getConnection();   


            let new_xp;
            let new_level;
            const lastXpTime = xpCooldowns.get(message.author.id) || 0;
            const now = Date.now();
            
            if( now - lastXpTime < cooldowns * 1000 ){
                await connection.query(`INSERT INTO message (message_id, author, content, channel, edited, deleted, date) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.id, message.author.id, message.content, message.channel.id, 0, 0, new Date().toLocaleDateString()]);
                console.log("cooldown")
            } else {
            
                await connection.query(`INSERT INTO message (message_id, author, content, channel, edited, deleted, date) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.id, message.author.id, message.content, message.channel.id, 0, 0, new Date().toLocaleDateString()]);
                await connection.query(`INSERT IGNORE INTO XP (user, level, xp) VALUES (?, ?, ?)`, [ message.author.id, 0, 0]);
                let data_xp = await connection.query(`SELECT * FROM XP WHERE user = ?`, [ message.author.id ]);
                const xp_data = data_xp[0];
                if(message.content.length >= long_message_characters){
                    new_xp = xp_data.xp + xp_gain_long;
                } else {
                    new_xp = xp_data.xp + xp_gain;
                }
                new_level = getlevel(new_xp);
                await connection.query("UPDATE XP SET level = ?, xp = ? WHERE user = ?", [new_level, new_xp, message.author.id]);
                xpCooldowns.set(message.author.id, now)
                console.log("ca marche ")
            }


        } catch(err){
            console.error("Erreur MariaDB: ", err);

        } finally {
            if (connection) connection.release();
        }
        if (message.channel.id == bait_channel)
        {
           try{
                connection = await pool.getConnection();
                await connection.query("INSERT INTO ban (user, author, reason) VALUES (?, ?, ?)", [message.author.id, clientId, "send a message in bait channel"]);
            } catch (err) {
                console.error("Erreur MariaDB: " + err);
            } finally {
                if(connection) connection.release();
            } 

            try{
            const member = await message.guild.members.fetch(message.author.id);
            await member.ban({ reason: "send a message in bait channel" });
            } catch (err) {
                console.error("Erreur ban: ", err);
            }
            
        
        }
    }}

}

const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const pool = require("../../../MariaDB.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Cette commande vous permet de rendre muet un utilisateur")
    .addUserOption( Option => 
        Option.setName('utilisateur')
        .setDescription("Utilisateur a mute")
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName("time")
            .setDescription("Durée du mute")
            .setRequired(true)
    )
    .addStringOption( Option =>
        Option.setName('type')
            .setDescription('Type de durée à utiliser')
            .setRequired(true)
            .addChoices(
                { name: "s", value: "second" },
                { name: "mi", value: "minute"},
                { name: "h", value: "hour"},
                { name: "d", value: "day"},
                { name: "w", value: "week"},
                { name: "mo", value: "month"},
                { name: "y", value: "year"},
            ))
        .addStringOption( Option => 
            Option.setName("raison")
                .setDescription("Raison du mute")
                .setRequired(true)
                .setMaxLength(100)
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
        
    async execute(interaction){
        await interaction.reply( { content: "Préparation du mute", flags: MessageFlags.Ephemeral } );
        const user = interaction.options.getUser('utilisateur', true);
        const time = interaction.options.getInteger('time', true);
        const type = interaction.options.getString('type', true);
        const reason = interaction.options.getString('raison', true).toLowerCase();
        const member = interaction.guild.members.cache.get(user.id);
        let duration;
        let connection
        try{
            connection = await pool.getConnection();
            await connection.query("INSERT INTO mute (user, author, reason) VALUES (?, ?, ?)", [user.id, interaction.user.id, reason]);
        } catch (err) {
            console.error("Erreur MariaDB: " + err);
        } finally {
            if(connection) connection.release();
        }

        switch (type){
            case "second":
                duration = time * 1000
                break
            case "minute":
                duration = time * 60 * 1000
                break
            case "hour":
                time * 3600 * 1000
                break
            case "day":
                duration = time * 86400 * 1000
                break
            case "week":
                duration = time * 604800 * 1000
                break
            case "month":
                duration = time * 2419200 * 1000
                break
            case "year":
                duration = time * 29030400 * 1000
                break
        }
        await member.timeout(duration, reason);
        await interaction.channel.send(`<@${user.id}>, vous avez été réduit au silence pour **${reason}**, vous pourrez à nouveau parler dans <t:${Math.floor((Date.now()+duration)/1000)}:R>`);
        await interaction.followUp({ content: "L'utilisateur a correctement été réduit au silence", flags: MessageFlags.Ephemeral});
        console.log(`[INFO]: User ${interaction.user.username}/${interaction.user.id} muted ${user.id}/${user.username}`);



    }








}
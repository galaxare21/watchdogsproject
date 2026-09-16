const { MessageFlags } = require('discord.js');

module.exports = {

    async execute(Interaction){

        const roleId = ["1406750543317176462","1406750582110294036"];
        try{
            await Interaction.member.roles.remove(roleId);
            await Interaction.member.roles.add(Interaction.values);

        await Interaction.reply({content : `Vos roles ont correctement été modifiés`, flags: MessageFlags.Ephemeral});
        } catch(e) {
            console.log(e);

    }
    }

}

const { Events, MessageFlags } = require('discord.js');
const path = require('node:path');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()){
            try {
            const command = interaction.client.commands.get(interaction.commandName)

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
                await command.execute(interaction, client);
                console.log(`[INFO]: user <${interaction.user.username}> with the id <${interaction.user.id}> has executed the command <${interaction.commandName}>`)
            } catch (error) {
                console.error(error)
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral});
                } else {
                    await interaction.reply({ content: 'There was a error while executing this command!', flags: MessageFlags.Ephemeral});
                }
            }
        } else if (interaction.isButton()){
            try {
                const id = interaction.customId;
                if(id != "confirm" && id != "cancel"){
                const button = require(`../button/${id}.js`);

                button.execute(interaction);
                }
            } catch (e) {
                console.error(e);
            }

        } else if (interaction.isStringSelectMenu()){
            try {
                const id = interaction.customId;
                const selectMenu = require(`../selectMenu/${id}.js`);

                selectMenu.execute(interaction);

            } catch (e) {
                console.error(e);
            }

        } else if (interaction.isModalSubmit()){
            try {
                const id = interaction.customId;
                const modal = require(`../modal/${id}.js`);

                modal.execute(interaction);

            } catch (e) {
                console.error(e);
            }
        }
}}
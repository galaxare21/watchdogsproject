const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { guild: { galaxare21 } } = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload-admin')
        .setDescription("Cette commande permet d'en recharger une autre")
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Command that you would reload')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        console.log(interaction.user.id)
        if (interaction.user.id === galaxare21) {
            const commandName = interaction.options.getString('command', true).toLowerCase()
            const command = interaction.client.commands.get(commandName)

            if (!command) {
                await interaction.reply(`La commande \`${commandName}\` n'existe pas`);
                try{
                    const newCommand = require(`./${command.data.name}.js`)
                    interaction.client.commands.set(newCommand.data.name, newCommand);
                    await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
                } catch (err) {
                    console.error(err);
                    await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``)
                }
            }
            delete require.cache[require.resolve(`./${command.data.name}`)]

            try {
                const newCommand = require(`./${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
            } catch (error) {
                console.error(error);
                await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
            }
        } else {
            await interaction.reply({ content:"You dont have the permission to execute this command", flags: MessageFlags.Ephemeral });
        }
        
    },


}
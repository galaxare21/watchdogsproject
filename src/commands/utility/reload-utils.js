const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { guild: { galaxare21 } } = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload-utility')
        .setDescription("Cette commane permet d'en recharger une autre")
        .addStringOption(option =>
            option.setName('command')
            .setDescription('The command that you would reload')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        if (interaction.user.id === galaxare21) {
            const commandName = interaction.options.getString('command', true).toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply(`La commande \`${commandName}\` n'existe pas`);
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
            await interaction.reply({ content:"You dont have the permission to execute this command", flags: MessageFlags.Ephemeral })
        }
        
    },


}
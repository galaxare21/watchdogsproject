const { REST, Routes } = require('discord.js');
const { client: { clientId, clientTestId, inTest }, guild: { guildId } } = require('./config.json');
const { token, tokentest} = require('./token.json');
const fs = require('node:fs');
const path = require('node:path');


const commands = []
const commands_logger = []
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
			commands_logger.push(command.data.name);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
    
	}
   
    
}
let rest;
let client;
if(inTest === false){
	rest = new REST().setToken(token);
	client = clientId
} else {
	rest = new REST().setToken(tokentest);
	client = clientTestId;
}



(async () => {
	try {
		console.log(commands_logger)
		console.log('\x1b[33m%s\x1b[0m', `Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(client, guildId),
            { body: commands },

        )

		console.log('\x1b[32m%s\x1b[0m', `Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
	process.exit(0);
})();


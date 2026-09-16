
const sfs = require("node:fs");
const fs = require("fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { client: { inTest } } = require("../config.json");
const { token, tokentest } = require("../token.json");






const client = new Client({
    intents: Object.values(GatewayIntentBits),

})

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'event');
const eventFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
console.log(eventFile);
for (const file of eventFile) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));

    }


}

if (inTest === false){
    client.login(token)
} else {
    client.login(tokentest)
}
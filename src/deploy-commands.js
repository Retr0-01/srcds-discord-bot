const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildIds, token } = require("../config.json");
const { readdirSync } = require("fs");

module.exports =
{
	update()
	{
		// Our final command array which will be sent to the API
		const commands = [];

		const commandFiles = readdirSync(`${__dirname}/commands/`).filter(file => file.endsWith(".js"));

		for (const file of commandFiles)
		{
			const command = require(`${__dirname}/commands/${file}`);

			commands.push(command.data.toJSON());
			console.log(`[SLASH COMMANDS] - Command "${command.data.name}" loaded`);
		}

		const rest = new REST({ version: "9" }).setToken(token);

		// For each guild we will update our basic slash command info
		for (const guildId of guildIds)
		{
			console.log(`Deploying commands on guild ${guildId}`);
			rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
				.then(() => console.log("Successfully registered all application commands"))
				.catch(console.error);
		}
	}
};

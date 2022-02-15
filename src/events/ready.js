const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, guildIds, clientId } = require("../../config.json");

module.exports =
{
	name: "ready",
	once: true,
	execute(client)
	{
		//
		// Slash Command Permissions Update
		//
		const rest = new REST({ version: "9" }).setToken(token);
		const allCommands = client.commands;

		for (const guildId of guildIds)
		{
			rest.get(Routes.applicationGuildCommands(clientId, guildId))
				.then(allGuildCmds => allGuildCmds.forEach(async appCommand =>
				{
					// We fetch each command individually, then get its perms from our collection...
					const command = await client.guilds.cache.get(guildId)?.commands.fetch(appCommand.id);
					const commandPerms = allCommands.get(appCommand.name).permissions;

					if (commandPerms.length > 0)
					{
						// And set them.
						await command.permissions.set({ permissions: commandPerms });

						console.log(`Permissions for slash command "${command.name}" on guild ${guildId} updated`);
					}
				}))
				.catch(console.error);
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);

		// If we are running with PM2, signal PM2 that we are ready to run
		if (process.send)
		{
			process.send("ready");
		}
	},
};

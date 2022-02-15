const { readdirSync } = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("../config.json");

// Init, create our client and the collection for our commands.
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

//
// Command Handler
//
const commandFiles = readdirSync(`${__dirname}/commands/`).filter(file => file.endsWith(".js"));

for (const file of commandFiles)
{
	const command = require(`${__dirname}/commands/${file}`);

	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	console.log(`Command "${command.data.name}" loaded`);
}

//
// Event Handler
//
const eventFiles = readdirSync(`${__dirname}/events`).filter(file => file.endsWith(".js"));

for (const file of eventFiles)
{
	const event = require(`${__dirname}/events/${file}`);
	console.log(`Event "${event.name}" loaded`);

	if (event.once)
	{
		client.once(event.name, (...args) => event.execute(...args));
	}
	else
	{
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//
// Update guild commands and perms.
//
require("./deploy-commands").update();

//
// PM2 Graceful Actions
// This will allow a graceful restart/reload/stop of the process
process.on("SIGINT", () =>
{
	console.log("RECEIVED A 'SIGINT' SIGNAL - SHUTTING DOWN");
	client.destroy();
	process.exit();
});

// The same thing but for Windows because it can't receive the other messages
if (process.platform === "win32")
{
	process.on("message", async (msg) =>
	{
		if (msg === "shutdown")
		{
			console.log("RECEIVED A 'SHUTDOWN' SIGNAL - SHUTTING DOWN");
			client.destroy();
			process.exit();
		}
	});
}

// Login to Discord
client.login(token);

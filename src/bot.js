const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const { existsSync, readdir, readdirSync } = require("fs");

// First things first, create our Discord client.
const client = new Client();

// Let's make sure we have a config file.
if(existsSync(`${__dirname}/config.json`))
{
	console.log("Config file successfully found.");
}
else
{
	console.log("Config file not found. Make sure you have a valid 'config.json' file in the same directory.");
	process.exit(1);
}

// Create a collection for commands and aliases.
client.commands = new Collection();
client.aliases = new Collection();

// Command Handler
readdirSync(`${__dirname}/commands/`).forEach(dir =>
{
	// Get and filter the commands.
	const commands = readdirSync(`${__dirname}/commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (let file of commands)
	{
		// Pull the commands and add them to the collection.
		let pull = require(`${__dirname}/commands/${dir}/${file}`);
		if (pull.name)
		{
			client.commands.set(pull.name, pull);
			console.log(`Command "${file.split(".")[0]}" loaded.`);
		}
		else
		{
			// If a file has errors, log this and continue.
			console.log(`Command "${file.split(".")[0]}" failed to load.`);
			continue;
		}
		// Get every alias.
		if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
	}
});

// Event Handler
readdir(`${__dirname}/events/`, (err, files) =>
{
	if (err) return console.error(err);
	files.forEach(file =>
	{
		// Define every event.
		const event = require(`${__dirname}/events/${file}`);
		// Get every event name.
		let eventName = file.split(".")[0];
		// Bind the events.
		client.on(eventName, event.bind(null, client));
		// Log every event.
		console.log(`Event "${eventName}" loaded.`);
	});
});

// And finally, login the client.
client.login(token);

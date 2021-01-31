const Discord = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

// First things first, create our Discord client.
const client = new Discord.Client();

// Let's make sure we have a config file.
if(fs.existsSync("./config.json"))
{
	console.log("Config file successfully found.");
}
else
{
	console.log("Config file not found. Make sure you have a valid 'config.json' file in the same directory.");
	process.exit(1);
}

// Create a collection for commands and aliases.
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Command Handler
fs.readdirSync("./commands/").forEach(dir =>
{
	// Get and filter the commands.
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (let file of commands)
	{
		// Pull the commands and add them to the collection.
		let pull = require(`./commands/${dir}/${file}`);
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
fs.readdir("./events/", (err, files) =>
{
	if (err) return console.error(err);
	files.forEach(file =>
	{
		// Define every event.
		const event = require(`./events/${file}`);
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

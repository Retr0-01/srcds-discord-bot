const { prefix } = require("../config.json");

module.exports = (client, message) =>
{
	// If the message was not send in a guild, return.
	if (!message.guild) return;

	// If the message was send by the system (e.g. welcome messages), return.
	if (message.system) return;

	// If the message's author is a bot return.
	if (message.author.bot) return;

	// If the message doesn't start with our prefix return.
	if (!message.content.startsWith(prefix)) return;

	// Fetch the member that sent the message if it cannot be found (when the member is invisible).
	if (!message.member) message.member = message.guild.fetchMember(message);

	// Definition of arguments and commands.
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	// If there is no command, return.
	if (cmd.length === 0) return;

	// Fetch the commands using the handler.
	let command = client.commands.get(cmd);
	// If no command is found, fetch by alias.
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	// Run the command.
	if (command)
	{
		command.run(client, message, args);
	}
};

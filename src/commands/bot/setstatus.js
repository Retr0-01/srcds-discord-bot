const { MessageEmbed } = require("discord.js");
const { botManagers } = require("../../config.json");

module.exports =
{
	name: "setstatus",
	aliases: ["client_status"],
	description: "Set the bot's status.",
	category: "Bot Management",
	usage: "['online' | 'idle' | 'invisible' | 'dnd']",
	run: async (client, message, args) =>
	{
		// Define the status types.
		let statusTypes = ["online", "idle", "invisible", "dnd"];

		// If the author is not a bot manager and the command is not unlocked to everyone, return this.
		const noPermEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Invalid Permissions")
			.setDescription("You can't execute this command.")
			.setTimestamp();
		if (!botManagers.includes(message.author.id) && !botManagers.includes("any")) return message.reply(noPermEmbed);

		// If there is no status type provided return this.
		const noTypeEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription("Please provide the status type.")
			.setTimestamp();
		if (!args[0]) return message.reply(noTypeEmbed);

		// If the argument doesn't match the status types return this.
		const invalidTypeEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription(`That's not a valid type.\nThe status types are: ${statusTypes}`)
			.setTimestamp();
		if (!statusTypes.includes(args[0])) return message.reply(invalidTypeEmbed);

		// Set the bot's status.
		client.user.setStatus(args[0]);

		const defaultAvatarSetEmbed = new MessageEmbed()
			.setColor("GREEN")
			.setDescription(`Successfully set the bot's status to "${args[0]}".`)
			.setTimestamp();
		message.channel.send(defaultAvatarSetEmbed)
			.then(console.log(`${message.author.tag} changed the bot's status.`));
	}
};

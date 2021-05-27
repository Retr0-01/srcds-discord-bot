const { MessageEmbed } = require("discord.js");
const { botManagers } = require("../../config.json");

module.exports =
{
	name: "shutdown",
	aliases: ["sd"],
	description: "Terminates the connection with Discord and stops the process.",
	category: "Bot Management",
	run: async (client, message) =>
	{
		// If the author is not a bot manager and the command is not unlocked to everyone, return this.
		const noPermEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Invalid Permissions")
			.setDescription("You can't execute this command.")
			.setTimestamp();
		if (!botManagers.includes(message.author.id) && !botManagers.includes("any")) return message.reply(noPermEmbed);

		// Sent the confirmation embed.
		const shutdownEmbed = new MessageEmbed()
			.setColor("#2c3334")
			.setTitle("Bot Shutdown")
			.setDescription(`${message.author.username} has terminated ${client.user.username}.`);
		await message.channel.send(shutdownEmbed);

		console.log(`\nAPPLICATION TERMINATED BY ${message.author.tag}`);

		// Destroy our client and terminate the process.
		client.destroy();
		process.exit(0);
	}
};

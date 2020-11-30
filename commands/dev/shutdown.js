const Discord = require("discord.js");
const { trusted } = require("../../config.json");

module.exports =
{
	name: "shutdown",
	aliases: ["sd"],
	description: "Terminates the connection with Discord and stops the process.",
	run: async (client, message) =>
	{
		// If the author is not trusted return this.
		const noPermEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("Invalid Permissions")
			.setDescription("This command can only be executed by trusted users.")
			.setTimestamp();
		if (!trusted.includes(message.author.id)) return message.reply(noPermEmbed);

		// Sent the confirmation embed.
		const shutdownEmbed = new Discord.MessageEmbed()
			.setColor("DEFAULT")
			.setTitle("Bot Shutdown")
			.setDescription(`${message.author.username} has terminated ${client.user.username}.`);
		await message.channel.send(shutdownEmbed);

		console.log(`APPLICATION TERMINATED BY ${message.author.tag}`);

		// Terminate the connection. (1 sec delay so it sends the embed).
		client.destroy();
		process.exit(0);
	}
};

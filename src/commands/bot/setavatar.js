const { MessageEmbed } = require("discord.js");
const { botManagers } = require("../../config.json");

module.exports =
{
	name: "setavatar",
	aliases: ["client_avatar"],
	description: "Set the bot's avatar.",
	category: "Bot Management",
	usage: "[image link]",
	run: async (client, message, args) =>
	{
		// If the author is not a bot manager and the command is not unlocked to everyone, return this.
		const noPermEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Invalid Permissions")
			.setDescription("You can't execute this command.")
			.setTimestamp();
		if (!botManagers.includes(message.author.id) && !botManagers.includes("any")) return message.reply(noPermEmbed);

		// If there is no attachment provided return this.
		const noImageEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription("Please provide an image **link** for the avatar.")
			.setTimestamp();
		if (!args[0]) return message.reply(noImageEmbed);

		try
		{
			client.user.setAvatar(args[0]);

			const avatarSetEmbed = new MessageEmbed()
				.setColor("GREEN")
				.setDescription("Successfully set the bot's avatar.")
				.setTimestamp();
			message.channel.send(avatarSetEmbed)
				.then(console.log(`${message.author.tag} changed the bot's avatar.`));
		}
		catch
		{
			const invalidImageEmbed = new MessageEmbed()
				.setColor("RED")
				.setTitle("Error")
				.setDescription("Couldn't set the bot's avatar. Make sure it's a valid image link.")
				.setTimestamp();
			message.channel.send(invalidImageEmbed);
		}
	}
};

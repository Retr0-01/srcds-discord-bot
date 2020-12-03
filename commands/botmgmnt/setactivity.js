const Discord = require("discord.js");
const { botManagers } = require("../../config.json");

module.exports =
{
	name: "setactivity",
	aliases: ["client_activity"],
	description: "Set the bot's activity.",
	category: "Bot Management",
	usage: "['playing' | 'streaming' | 'listening' | 'watching' | 'competing'] [text to display]",
	run: async (client, message, args) =>
	{
		// Define the activity types.
		let activityTypes = ["playing", "streaming", "listening", "watching", "competing"];

		// If the author is not a bot manager and the command is not unlocked to everyone, return this.
		const noPermEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("Invalid Permissions")
			.setDescription("You can't execute this command.")
			.setTimestamp();
		if (!botManagers.includes(message.author.id) && !botManagers.includes("any")) return message.reply(noPermEmbed);

		// If there is no activity type provided return this.
		const noTypeEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription("Please provide the type of the activity.")
			.setTimestamp();
		if (!args[0]) return message.reply(noTypeEmbed);

		// If the argument doesn't match the activity types return this.
		const invalidTypeEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription(`That's not a valid type.\nThe activity types are: ${activityTypes.join(", ")}.`)
			.setTimestamp();
		if (!activityTypes.includes(args[0])) return message.reply(invalidTypeEmbed);

		// If there is no second argument (the text to display) provided return this.
		const noTextEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription("Please provide more arguments.")
			.setTimestamp();
		if (!args[1]) return message.reply(noTextEmbed);

		// Set the bot's activity.
		client.user.setActivity(args.slice(1).join(" "), { type: args[0].toUpperCase() });

		const activitySetEmbed = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setDescription("Successfully set the bot's activity.")
			.setTimestamp();
		message.channel.send(activitySetEmbed)
			.then(console.log(`${message.author.tag} changed the bot's activity to "${args[0]} ${args.slice(1).join(" ")}".`));
	}
};

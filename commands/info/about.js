const Discord = require("discord.js");
const info = require("../../package.json");

module.exports =
{
	name: "about",
	aliases: ["botinfo"],
	description: "Shows info about the bot.",
	run: async (client, message) =>
	{
		// Define the days, hours, minutes and second for the uptime.
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;

		// Create and send the embed.
		const aboutEmbed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle(client.user.username)
			.setDescription(info.description)
			.addFields
			(
				{ name: "Version", value: info.version, inline: true },
				{ name: "Uptime", value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: true },
				{ name: "Library", value: `[Discord.js](https://discord.js.org/#/) - ${info.dependencies["discord.js"]}`, inline: true },
				{ name: "Developer", value: info.author, inline: true },
				{ name: "Source", value: `[GitHub](${info.homepage})`, inline: true },
				{ name: "Bugs", value: `[Issue Tracker](${info.bugs.url})`, inline: true },
			)
			.setTimestamp();
		message.channel.send(aboutEmbed);
	}
};

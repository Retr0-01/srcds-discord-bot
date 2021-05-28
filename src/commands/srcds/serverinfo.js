const { MessageEmbed } = require("discord.js");
const { query } = require("gamedig");
const { serverManagers, servers, targetGame } = require("../../config.json");

module.exports =
{
	name: "serverinfo",
	alias: "si",
	description: "Get information from one of your game servers.",
	category: "Game Server",
	usage: "[server name]",
	run: async (client, message, args) =>
	{
		// If the author is not a server manager and the command is not unlocked to everyone, return this.
		const noPermEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Invalid Permissions")
			.setDescription("You can't execute this command.")
			.setTimestamp();
		if (!serverManagers.includes(message.author.id) && !serverManagers.includes("any")) return message.reply(noPermEmbed);

		// If there is no server provided return this.
		const noImageEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("Error")
			.setDescription("Please provide the server's name.")
			.setTimestamp();
		if (!args[0]) return message.reply(noImageEmbed);

		for (let i = 0; i < servers.length; i++)
		{
			const element = servers[i];

			if (element.name == args[0])
			{
				query({
					type: targetGame,
					host: servers[i].ip,
					port: servers[i].port,
					requestRules: false
				}).then((state) =>
				{
					const infoEmbed = new MessageEmbed()
						.setColor("RANDOM")
						.setTitle(state.name)
						.setDescription(`IP: ${servers[i].ip}:${servers[i].port}`)
						.addFields
						(
							{ name: "Players", value:  state.raw.numplayers + " / " + state.maxplayers, inline: true },
							{ name: "Map", value: state.map, inline: true },
							{ name: "Connect", value: `steam://connect/${state.connect}}` },
						)
						.setTimestamp();

					switch (targetGame)
					{
					case "tf2":
						infoEmbed.setColor("FB8637");
						infoEmbed.setThumbnail("https://github.com/Retr0-01/srcds-discord-bot/blob/main/assets/images/tf2.png");
						break;

					case "csgo":
						infoEmbed.setColor("5D79AE");
						infoEmbed.setThumbnail("https://github.com/Retr0-01/srcds-discord-bot/blob/main/assets/images/csgo.png");
						break;

					default:
						break;
					}

					return message.channel.send(infoEmbed);
				}).catch((error) =>
				{
					console.log(error);
				});
			}
			else
			{
				const serverNotFoundEmbed = new MessageEmbed()
					.setColor("RED")
					.setTitle("Error")
					.setDescription("This server's name is not specified.")
					.setTimestamp();
				return message.reply(serverNotFoundEmbed);
			}
		}

	}
};

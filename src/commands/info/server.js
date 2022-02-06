const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Get info about the current server.")
		.setDefaultPermission(true),
	permissions: [],
	async execute(interaction)
	{
		const server = interaction.guild;
		if (!server.available) return;

		const serverCreated = server.createdAt.toString().split(" ");

		const serverInfoEmbed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle(server.name)
			.setDescription(server.description ?? "*No description provided.*")
			.setThumbnail(server.iconURL({ dynamic: true }))
			.addFields
			(
				{ name: "Owner", value: `<@${server.ownerId}>`, inline: true },
				{ name: "Created at", value: serverCreated[2] + " " + serverCreated[1] + " " + serverCreated[3], inline: true },
				{ name: "Members", value: server.memberCount.toString(), inline: true },
				{ name: "Channels", value: server.channels.cache.size.toString(), inline: true },
				{ name: "Roles", value: server.roles.cache.size.toString(), inline: true },
				{ name: "Emojis", value: server.emojis.cache.size.toString(), inline: true }
			)
			.setFooter({ text: `Server ID: ${server.id}` })
			.setTimestamp();
		await interaction.reply({ embeds: [serverInfoEmbed] });
	},
};

const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Get info about one server from the server list.")
		.setDefaultPermission(true)
		.addStringOption(option =>
			option.setName("name")
				.setDescription("The server's name.")
				.setRequired(true)
		),
	permissions: [],
	async execute(interaction)
	{
		const nameOption = interaction.options.getString("name");
		const filePath = path.resolve(__dirname, `../servers/${nameOption}.json`);

		if (fs.existsSync(filePath))
		{
			const fileData = fs.readFileSync(filePath);
			const serverData = JSON.parse(fileData.toString());

			const serverInfoEmbed = new MessageEmbed()
				.setColor("GREEN")
				.setTitle(nameOption)
				.setThumbnail(`https://spaceretr0.com/public/images/projects/${serverData.game}.png`)
				.addFields
				(
					{ name: "Address", value: serverData.address, inline: true },
					{ name: "Added By", value: `<@${serverData.addedById}>`, inline: true },
					{ name: "Game", value: serverData.game, inline: true },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [serverInfoEmbed] });
		}
		else
		{
			await interaction.reply("The server you have entered does not exist.");
		}
	},
};

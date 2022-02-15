const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("listservers")
		.setDescription("List all servers added.")
		.setDefaultPermission(true),
	permissions: [],
	async execute(interaction)
	{
		const folderPath = path.resolve(__dirname, "../../servers/");
		const allServerFiles = fs.readdirSync(folderPath).filter(file => path.extname(file) === ".json");
		let finalServers = "";

		allServerFiles.forEach(file =>
		{
			const fileData = fs.readFileSync(path.join(folderPath, file));
			const json = JSON.parse(fileData.toString());
			finalServers += `**Server Name:**  ${file.split(".").slice(0, -1).join(".")} \nAddress: ${json.address} \nAdded By: <@${json.addedById}>\n\n`;
		});

		const serverInfoEmbed = new MessageEmbed()
			.setColor("GREEN")
			.setTitle("Added Servers")
			.setDescription(finalServers)
			.setTimestamp();
		await interaction.reply({ embeds: [serverInfoEmbed] });
	},
};

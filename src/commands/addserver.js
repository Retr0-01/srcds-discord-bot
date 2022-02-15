const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("addserver")
		.setDescription("Add a new server to the server list.")
		.setDefaultPermission(true)
		.addStringOption(option =>
			option.setName("name")
				.setDescription("The server's name which will be referred to as.")
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName("address")
				.setDescription("The server's full address, IP and port. For example: 127.0.0.1:27015")
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName("password")
				.setDescription("The server's RCON password.")
				.setRequired(true)
		),
	permissions: [],
	async execute(interaction)
	{
		const nameOption = interaction.options.getString("name");
		const addressOption = interaction.options.getString("address");
		const passwordOption = interaction.options.getString("password");
		const filePath = path.resolve(__dirname, `../../servers/${nameOption}.json`);

		let json = {
			address: addressOption,
			password: passwordOption,
			addedBy: interaction.user.tag,
			addedById: interaction.user.id
		};

		let data = JSON.stringify(json);
		fs.writeFileSync(filePath, data);

		await interaction.reply({ content: "Server added successfully!", ephemeral: true });
	},
};

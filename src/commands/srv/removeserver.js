const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("path");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("removeserver")
		.setDescription("Remove a server from the server list.")
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
		const filePath = path.resolve(__dirname, `../../servers/${nameOption}.json`);

		if (fs.existsSync(filePath))
		{
			fs.unlink(filePath, async (err) =>
			{
				if (err)
				{
					await interaction.reply(`Something went wrong...\nError Code: \`\`${err.code}\`\``);
					console.error(err);
					return;
				}

				await interaction.reply("Server removed successfully!");
			});
		}
		else
		{
			await interaction.reply("The server you have entered does not exist.");
		}
	},
};

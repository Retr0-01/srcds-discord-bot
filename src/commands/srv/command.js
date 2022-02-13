const { SlashCommandBuilder } = require("@discordjs/builders");
const RCON = require("srcds-rcon");
const fs = require("fs");
const path = require("path");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("command")
		.setDescription("Initiate an RCON connection to a server and send a command.")
		.setDefaultPermission(true)
		.addStringOption(option =>
			option.setName("server")
				.setDescription("The server's name you have set.")
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName("command")
				.setDescription("Your desired command.")
				.setRequired(true)
		),
	permissions: [],
	async execute(interaction)
	{
		const serverName = interaction.options.getString("server");
		const command = interaction.options.getString("command");
		const filePath = path.resolve(__dirname, `../../servers/${serverName}.json`);
		let rawData;

		if (fs.existsSync(filePath))
		{
			rawData = fs.readFileSync(filePath);
			const json = JSON.parse(rawData);

			const rcon = RCON({
				address: json.address,
				password: json.password
			});

			await interaction.reply("Connecting...");

			rcon.connect().then(
				() => rcon.command(command).then(async res =>
				{
					// Various commands like `map mapname` have no response.
					if (!res) return await interaction.editReply("``SERVER RESPONSE``\nThe command successfully executed but no response was received.");

					await interaction.editReply(`\`\`SERVER RESPONSE\`\`\n\`\`\`${res}\`\`\``);
				})
			).then(async () =>
			{
				rcon.disconnect();
				await interaction.followUp("Disconnected. Operation finished.");
			}
			).catch(async err =>
			{
				await interaction.followUp(`Something went wrong...\nError Code: \`\`${err.code}\`\``);
				console.error(err);
			});
		}
		else
		{
			await interaction.reply("The server you have entered does not exist.");
		}
	},
};

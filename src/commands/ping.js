const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pong!")
		.setDefaultPermission(true),
	permissions: [],
	async execute(interaction)
	{
		await interaction.reply(`Pong! \n> API Latency: **${Math.round(interaction.client.ws.ping)}ms**`);
	},
};

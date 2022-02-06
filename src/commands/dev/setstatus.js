const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("setstatus")
		.setDescription("[DEV] Set the bot's status.")
		.setDefaultPermission(false)
		.addStringOption(option =>
			option.setName("status")
				.setDescription("The status")
				.setRequired(true)
				.addChoice("Online", "online")
				.addChoice("Idle", "idle")
				.addChoice("Do Not Disturb", "dnd")
				.addChoice("Invisible", "invisible")
		),
	permissions: [],
	async execute(interaction)
	{
		const status = interaction.options.getString("status");
		interaction.client.user.setStatus(status);
		await interaction.reply("Done!");
	},
};

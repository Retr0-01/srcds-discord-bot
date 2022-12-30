import Event from "../classes/Event";
import { Interaction } from "discord.js";
import Command from "../classes/Command";

export default class interactionCreate extends Event
{
	name = "interactionCreate";

	async execute(interaction: Interaction)
	{
		if (interaction.isChatInputCommand())
		{
			const command = this.client.interactions.get(interaction.commandName) as Command;

			if (!command) return;

			try
			{
				command.execute(interaction);
			}
			catch (error)
			{
				console.error(error);
				await interaction.reply({ content: `There was an error while executing slash command ${interaction.commandName}`, ephemeral: true });
			}
		}
		else if (interaction.isAutocomplete())
		{
			const command = this.client.interactions.get(interaction.commandName) as Command;

			if (!command) return;

			await interaction.respond(
				command.autocomplete(interaction).map(choice => ({ name: choice, value: choice })),
			);
		}
	}
}
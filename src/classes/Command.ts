import { ChatInputCommandInteraction,
	AutocompleteInteraction,
	SlashCommandBuilder,
	SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import DiscordClient from "./DiscordClient";

/**
 * Derive from this class to create a new slash command interaction.
 * https://discordjs.guide/interactions/slash-commands.html
 */
export default class Command
{
	readonly client: DiscordClient;

	data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = new SlashCommandBuilder()
	global = false;

	constructor(client: DiscordClient)
	{
		this.client = client;
	}

	execute(interaction: ChatInputCommandInteraction)
	{
		throw new Error(`Method not implemented for interaction: ${interaction.commandName}`);
	}

	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		throw new Error(`Autocomplete not implemented for interaction: ${interaction.commandName}`);
	}
}

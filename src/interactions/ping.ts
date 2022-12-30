import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../classes/Command";

export default class PingCmd extends Command
{
	data = new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pong!")
	global = true;

	async execute(interaction: ChatInputCommandInteraction)
	{
		const rtt = Math.abs(Date.now() - interaction.createdTimestamp);
		const websocketHeartbeat = Math.floor(this.client.ws.ping);

		return interaction.reply(`Pong! \n> Websocket Heartbeat: **${websocketHeartbeat}ms**\n> Roundtrip Latency: **${rtt}ms**`);
	}
}

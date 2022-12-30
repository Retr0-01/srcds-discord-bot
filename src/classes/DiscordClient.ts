import { Client, GatewayIntentBits, Partials } from "discord.js";
import ProcessManager from "./ProcessManager";
import EventHandler from "../handlers/EventHandler";
import InteractionHandler from "../handlers/InteractionHandler";
import { token } from "../config.json";

export default class DiscordClient extends Client
{
	public events = new EventHandler(this);
	public interactions = new InteractionHandler(this);

	constructor()
	{
		super({
			intents: [
				GatewayIntentBits.Guilds,
			],
			partials: [
				Partials.Channel,
			],
		});

		new ProcessManager(this);
		this.login(token);
	}
}
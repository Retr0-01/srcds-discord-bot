import DiscordClient from "../classes/DiscordClient";
import Event from "../classes/Event";
import { join } from "path";
import { readdirSync } from "fs";
import { Collection } from "discord.js";

export default class EventHandler extends Collection<string, Event>
{
	readonly client: DiscordClient;

	constructor(client: DiscordClient)
	{
		super();

		this.client = client;
		this.init();
	}

	private async init()
	{
		const path = join(__dirname, "..", "events");
		const files = readdirSync(path);

		files.forEach((file) =>
		{
			const eventClass = ((r) => r.default || r)(require(join(path, file)));
			const event: Event = new eventClass(this.client);

			this.set(event.name, event);

			this.client[event.once ? "once" : "on"](
				event.name,
				(...args: unknown[]) => event.execute(...args),
			);

			console.log(`Loaded event "${event.name}"`);
		});
	}
}
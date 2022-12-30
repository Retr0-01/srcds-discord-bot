import DiscordClient from "../classes/DiscordClient";

export default class Event
{
	readonly client: DiscordClient;
	name = "";
	once = false;

	constructor(client: DiscordClient)
	{
		this.client = client;
	}

	execute(..._args: unknown[])
	{
		throw new Error(`Method not implemented for event ${this.name} with args ${_args.toString()}.`);
	}
}

import DiscordClient from "./DiscordClient";

export default class ProcessManager
{
	readonly client: DiscordClient;

	constructor(client: DiscordClient)
	{
		this.client = client;

		// This will allow a graceful restart/reload/stop of the process.
		process.on("SIGINT", () =>
		{
			console.log("RECEIVED A 'SIGINT' SIGNAL - SHUTTING DOWN");
			client.destroy();
			process.exit();
		});

		// The same thing but for Windows because it can't receive the other messages
		if (process.platform === "win32")
		{
			process.on("message", async (msg) =>
			{
				if (msg === "shutdown")
				{
					console.log("RECEIVED A 'SHUTDOWN' SIGNAL - SHUTTING DOWN");
					client.destroy();
					process.exit();
				}
			});
		}
	}
}

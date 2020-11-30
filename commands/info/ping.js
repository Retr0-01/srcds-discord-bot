module.exports =
{
	name: "ping",
	description: "Pong!",
	run: async (client, message) =>
	{
		// Post a message.
		const msg = await message.channel.send("Ping....");

		// Edit the message so we can determine the latency.
		msg.edit(`Pong! - **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms**`);
	}
};

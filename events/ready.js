const { botStatus } = require("../config.json");

module.exports = (client) =>
{
	console.log(`Successfully connected to Discord! ${client.user.username} is now online.`);

	// If the activity type is invalid, return early.
	let aTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"];
	if (!aTypes.includes(botStatus.activityType)) return console.log("Invalid activity type detected! Check the config file.");

	client.user.setActivity(botStatus.activity, { type: botStatus.activityType });
};
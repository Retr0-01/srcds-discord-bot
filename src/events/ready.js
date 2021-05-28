const { botStatus } = require("../config.json");

module.exports = (client) =>
{
	console.log(`Successfully connected to Discord! ${client.user.username} is now online.`);

	// Return early if we don't have any activity specified.
	if (!botStatus.activity && !botStatus.activityType) return;

	// If the activity type is invalid, return early.
	let activityTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"];
	if (!activityTypes.includes(botStatus.activityType)) return console.log("Invalid activity type detected! Check the config file.");

	client.user.setActivity(botStatus.activity, { type: botStatus.activityType });
};

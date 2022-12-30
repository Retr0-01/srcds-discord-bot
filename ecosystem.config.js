module.exports =
{
	apps :
	[{
		name: "srcds-discord-bot",
		script: "./build/index.js",
		wait_ready: true,
		shutdown_with_message: true,
		ignore_watch: ["src", "db", "logs", "node_modules", ".vscode", ".github", ".git"],
		log_date_format: "DD-MM-YYYY HH:mm Z",
		error_file: "./logs/error.log",
		out_file: "./logs/output.log",
	}],
};

import { ChatInputCommandInteraction,
	SlashCommandBuilder,
	AutocompleteInteraction,
	EmbedBuilder,
	PermissionFlagsBits } from "discord.js";
import EasyTable from "easy-table";
import { writeFileSync, unlinkSync, createWriteStream } from "fs";
import path from "path";
import Command from "../classes/Command";
import Sqlite from "../classes/Sqlite";
import Server from "../types/Server";
const RCON = require("srcds-rcon");

export default class ServerCmd extends Command
{
	data = new SlashCommandBuilder()
		.setName("server")
		.setDescription("The root command to manage your SRCDS servers.")
		.addSubcommand(cmd =>
			cmd.setName("add")
				.setDescription("Add a new server to the database.")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The server's name which will be referred to as.")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("address")
						.setDescription("The server's full address, IP and port. For example: 127.0.0.1:27015")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("password")
						.setDescription("The server's RCON password.")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("game")
						.setDescription("The game this server is running.")
						.setRequired(true)
						.addChoices(
							{ name: "Team Fortress 2", value: "tf2" },
							{ name: "Counter-Strike: Global Offensive", value: "csgo" },
						)))
		.addSubcommand(cmd =>
			cmd.setName("remove")
				.setDescription("Remove a server from the database.")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The server's name.")
						.setRequired(true)
						.setAutocomplete(true)))
		.addSubcommand(cmd =>
			cmd.setName("edit")
				.setDescription("Edit a server added. Change its address, password, etc.")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The server's name.")
						.setRequired(true)
						.setAutocomplete(true))
				.addStringOption(option =>
					option.setName("address")
						.setDescription("The server's new address."))
				.addStringOption(option =>
					option.setName("password")
						.setDescription("The server's new RCON password."))
				.addStringOption(option =>
					option.setName("game")
						.setDescription("The new target game this server is running.")
						.addChoices(
							{ name: "Team Fortress 2", value: "tf2" },
							{ name: "Counter-Strike: Global Offensive", value: "csgo" },
						)))
		.addSubcommand(cmd =>
			cmd.setName("get")
				.setDescription("Get a server from the database.")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The server's name.")
						.setRequired(true)
						.setAutocomplete(true)))
		.addSubcommand(cmd =>
			cmd.setName("rcon")
				.setDescription("Initiate an RCON connection to a server and send a command.")
				.addStringOption(option =>
					option.setName("name")
						.setDescription("The target server's name.")
						.setRequired(true)
						.setAutocomplete(true))
				.addStringOption(option =>
					option.setName("command")
						.setDescription("Your command.")
						.setRequired(true)))
		.addSubcommand(cmd =>
			cmd.setName("rcon_all")
				.setDescription("Send an RCON command to all your servers.")
				.addStringOption(option =>
					option.setName("command")
						.setDescription("Your command.")
						.setRequired(true)))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

	async execute(interaction: ChatInputCommandInteraction)
	{
		const action = interaction.options.getSubcommand(true);

		if (action === "add")
		{
			const nameOption = interaction.options.getString("name", true);
			const addressOption = interaction.options.getString("address", true);
			const passwordOption = interaction.options.getString("password", true);
			const gameOption = interaction.options.getString("game", true);

			const query = Sqlite.prepare("INSERT OR IGNORE INTO 'servers' (serverName, serverAddress, rconPassword, targetGame, createdBy, createdAt) VALUES (?, ?, ?, ?, ?, datetime('now'))");
			const res = query.run(nameOption, addressOption, passwordOption, gameOption, interaction.user.id);

			if (res.changes == 0)
			{
				return await interaction.reply({ content: "Failed to add server. You have probably inserted data that already exists.\nTIP: The ``name`` and ``address`` fields must be unique.", ephemeral: true });
			}
			else
			{
				return await interaction.reply({ content: "Server successfully added.", ephemeral: true });
			}
		}
		else if (action === "remove")
		{
			const serverName = interaction.options.getString("name", true);

			// Ensure it exists first.
			let query = Sqlite.prepare("SELECT id FROM 'servers' WHERE serverName=(?)");
			const server: Server = query.get(serverName) as Server;
			if (!server) return await interaction.reply({ content: "Server not found.", ephemeral: true });

			query = Sqlite.prepare("DELETE FROM 'servers' WHERE id=(?)");
			query.run(server.id);

			return await interaction.reply({ content: "Server successfully removed.", ephemeral: true });
		}
		else if (action === "edit")
		{
			const serverName = interaction.options.getString("name", true);

			let query = Sqlite.prepare("SELECT id FROM 'servers' WHERE serverName=(?)");
			const server: Server = query.get(serverName) as Server;
			if (!server) return await interaction.reply({ content: "Server not found.", ephemeral: true });

			const addressOption = interaction.options.getString("address");
			const passwordOption = interaction.options.getString("password");
			const gameOption = interaction.options.getString("game");

			if (!addressOption && !passwordOption && !gameOption) return await interaction.reply({ content: "No changes detected.", ephemeral: true });

			let queryString = "UPDATE 'servers' SET ";
			if (addressOption) queryString += `serverAddress = '${addressOption}', `;
			if (passwordOption) queryString += `rconPassword = '${passwordOption}', `;
			if (gameOption) queryString += `targetGame = '${gameOption}', `;
			queryString += "modifiedBy = (?), modifiedAt = datetime('now') WHERE id = (?)";

			query = Sqlite.prepare(queryString);
			query.run(interaction.user.id, server.id);

			return await interaction.reply({ content: "Server successfully updated.", ephemeral: true });
		}
		else if (action === "get")
		{
			const serverName = interaction.options.getString("name", true);

			const query = Sqlite.prepare("SELECT * FROM 'servers' WHERE serverName=(?)");
			const server: Server = query.get(serverName) as Server;
			if (!server) return await interaction.reply({ content: "Server not found.", ephemeral: true });

			let editString = "Never";
			if (server.modifiedAt) editString = `By <@${server.modifiedBy}> at ${server.modifiedAt}`;

			const serverEmbed = new EmbedBuilder()
				.setTitle(`Server: ${server.serverName}`)
				.setDescription(`Added by <@${server.createdBy}> at ${server.createdAt}\nLatest Edit: ${editString}`)
				.addFields(
					{ name: "Address", value: server.serverAddress, inline: true },
					{ name: "Game", value: server.targetGame, inline: true },
					{ name: "Password", value: `||${server.rconPassword}||`, inline: true },
				)
				.setTimestamp();

			switch (server.targetGame)
			{
			case "tf2":
				serverEmbed.setColor("Orange");
				break;
			case "csgo":
				serverEmbed.setColor("Navy");
				break;
			default:
				break;
			}

			return await interaction.reply({ embeds: [serverEmbed], ephemeral: true });
		}
		else if (action === "rcon")
		{
			const serverName = interaction.options.getString("name", true);
			const command = interaction.options.getString("command", true);

			const query = Sqlite.prepare("SELECT serverAddress, rconPassword FROM 'servers' WHERE serverName=(?)");
			const server: Server = query.get(serverName) as Server;

			if (!server) return await interaction.reply({ content: "Server not found.", ephemeral: true });

			await interaction.deferReply();

			const rcon = RCON({
				address: server.serverAddress,
				password: server.rconPassword,
			});

			await rcon.connect().then(async () =>
			{
				await rcon.command(command).then(async (res: string) =>
				{
					if (!res) return await interaction.editReply("The command successfully executed but no response was received.");

					// In case we have a response from a cmd (such as cvarlist) which
					// goes over Discord's body limit (2000 chars) we will upload it as a file.
					if (res.length > 2000)
					{
						const tempFilePath = path.resolve(__dirname, "rcon_response.txt");
						writeFileSync(tempFilePath, res);
						await interaction.editReply({ content: "``SERVER RESPONSE``", files: [tempFilePath] });
						unlinkSync(tempFilePath);
					}
					else
					{
						await interaction.editReply(`\`\`SERVER RESPONSE\`\`\n\`\`\`${res}\`\`\``);
					}
				});
			}).then(async () =>
			{
				await rcon.disconnect();
			}).catch(async (err: Error) =>
			{
				await interaction.editReply(`Something went wrong...\nError: \`\`${err.message}\`\``);
			});
		}
		else if (action === "rcon_all")
		{
			const command = interaction.options.getString("command", true);
			const query = Sqlite.prepare("SELECT id, serverName, serverAddress, rconPassword FROM 'servers'");
			const allServers: Server[] = query.all() as Server[];
			const table = new EasyTable;

			const tempFilePath = path.resolve(__dirname, "rcon_all_responses.txt");

			await interaction.deferReply();

			const stream = createWriteStream(tempFilePath, { flags:"a" });

			for (const server of allServers)
			{
				table.cell("ID", server.id);
				table.cell("SERVER NAME", server.serverName);
				table.cell("SERVER ADDRESS", server.serverAddress);

				const rcon = RCON({
					address: server.serverAddress,
					password: server.rconPassword,
				});

				stream.write("==============================================\n")
				stream.write(`SERVER: "${server.serverName}" @ ${server.serverAddress}\n`);
				stream.write("==============================================\n")

				await rcon.connect().then(async () =>
				{
					await rcon.command(command).then(async (res: string) =>
					{
						table.cell("EXECUTED", "YES");

						if (res)
						{
							stream.write(res + "\n");
							table.cell("RESPONDED", "YES")
						}
						else
						{
							stream.write("NO RESPONSE\n\n");
							table.cell("RESPONDED", "NO");
						}
						table.cell("ERROR", "-");
					});
				}).then(async () =>
				{
					await rcon.disconnect();
				}).catch((err: Error) =>
				{
					stream.write(`ERROR: ${err.message}\n\n`);
					table.cell("EXECUTED", "NO");
					table.cell("RESPONDED", "-");
					table.cell("ERROR", "YES");
				}),

				table.newRow();
			}

			stream.close();

			await interaction.editReply({ content: `\`\`\`${table.toString()}\`\`\``, files: [tempFilePath] });
			unlinkSync(tempFilePath);
		}
	}

	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		const focusedOption = interaction.options.getFocused(true);
		const choices: string[] = [];

		if (focusedOption.name === "name")
		{
			const query = Sqlite.prepare("SELECT serverName FROM servers LIMIT 25");
			const serverList: Server[] = query.all() as Server[];
			serverList.forEach(server =>
			{
				choices.push(server.serverName);
			});
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		return filtered;
	}
}

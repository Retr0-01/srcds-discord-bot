<p align="center">
  <img src="./assets/images/srcds-bot-banner-smaller.png" title="SRCDS Discord Bot">
</p>

# Source Dedicated Server Discord Bot &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Retr0-01/srcds-discord-bot/blob/main/LICENCE.md)
> A Discord bot that allows you to communicate with your Source Dedicated Server.

Bringing Source server management into Discord. This simple bot allows you to run any kind of console commands using Valve's **R**emote **CON**sole protocol to one or more of your game servers, or simply just the current status of them.<br>
**THIS IS A WORK IN PROGRESS SO A LOT OF COMMANDS MENTIONED HERE ARE INCOMPLETE OR NOT YET IMPLEMENTED**


## Contents
* [**Getting Started**](https://github.com/Retr0-01/srcds-discord-bot#getting-started)
    * [**Prerequisites**](https://github.com/Retr0-01/srcds-discord-bot#prerequisites)
    * [**Installing**](https://github.com/Retr0-01/srcds-discord-bot#installing)
    * [**Building**](https://github.com/Retr0-01/srcds-discord-bot#building)
* [**Configuration**](https://github.com/Retr0-01/srcds-discord-bot#configuration)
    * [**Required Options**](https://github.com/Retr0-01/srcds-discord-bot#required-options)
    * [**Other Options**](https://github.com/Retr0-01/srcds-discord-bot#other-options)
* [**Running**](https://github.com/Retr0-01/srcds-discord-bot#running)
* [**Commands**](https://github.com/Retr0-01/srcds-discord-bot#commands)
    * [**Info**](https://github.com/Retr0-01/srcds-discord-bot#info)
    * [**Game Server**](https://github.com/Retr0-01/srcds-discord-bot#game-server)
    * [**Bot Management**](https://github.com/Retr0-01/srcds-discord-bot#bot-management)
* [**Miscellaneous**](https://github.com/Retr0-01/srcds-discord-bot#miscellaneous)
    * [**Built With**](https://github.com/Retr0-01/srcds-discord-bot#built-with)
    * [**Licensing**](https://github.com/Retr0-01/srcds-discord-bot#licensing)


## Getting Started

### Prerequisites
* [Node.js](https://nodejs.dev/) - 14.15.1 (LTS)  
* [Git](https://git-scm.com/) - If you want to install the bot using method 2.

### Installing
*Method 1*
1. Download the [ZIP file](https://github.com/Retr0-01/srcds-discord-bot/archive/main.zip) containing the source code.
1. Extract it to your preferable location.
1. Delete the ZIP file if you want, we won't need it.

*Method 2*
1. Run GitBash in the directory you want the bot to install.
2. Type:
```batch
git clone https://github.com/Retr0-01/srcds-discord-bot.git
```
This will create a new directory which will contain the source code for the bot.

### Building
Assuming you have Node.js installed and you are in the directory the bot is located, open command prompt (or terminal) and type:
```batch
npm i
```
This will install all the required dependencies the bot needs to function.


## Configuration
Now that the bot is properly installed we need to configurate it. Before doing anything, copy and rename the `config_template.json` file to `config.json`.

### Required Options
Option | Description
------------ | -------------
prefix | The prefix the bot will respond to. It can be anything you want.
token | If you don't know what this is, check out [this section](https://discordjs.guide/preparations/setting-up-a-bot-application.html) of the Discord.js guide.
serverManagers | An array of Discord user IDs. This grants access to the game server commands. If you don't want the commands to be locked, enter the word *any*.
botManagers | An array of Discord user IDs. This grants access to the bot management commands. If you don't want the commands to be locked, enter the word *any*.
targetGame | The game your server run on, either `tf2` or `csgo`

### Server Options
The `servers` array is a list of all the servers you want your bot to access.

Option | Description
------------ | -------------
name | A **unique** identifier for the specific server, this is how you will access it through the bot.
ip | Your server's IP.
port | Your server's port.
rconPassword | The RCON password used to connect to the server and execute commands.

### Other Options
Option | Description
------------ | -------------
logChannel | An ID of a Discord channel where all command executed will be logged in.
botStatus.activityType | Must be one of the following options: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
botStatus.activity | The text that will be displayed along with the bot's activity type.


## Running
In order to run the bot, simply open the command prompt (or terminal) and type:
```batch
npm run bot
```
If everything went well, you should see a "successfully connected to Discord" message.


## Commands
The list of bot commands. This can be executed by appending your bot's prefix in the start of a message. For example: ``s!ping`` if your prefix is set to ``s!``. You can view all the commands by using the ``help`` command and get specific help on a command by using ``help commandName``.

### Info
Command | Description
------------ | -------------
about | Shows info about the bot.
help | As mentioned above, shows every command available.
ping | Pong!

### Source Game Server
Command | Description
------------ | -------------
rcon | The RCON command.
serverinfo | Get information from one of your game servers.

### Bot Management
Command | Description
------------ | -------------
shutdown | Terminates the connection with Discord and stops the process.
setstatus | Set the bot's status.
setavatar | Set the bot's avatar.
setactivity | I believe it's self explanatory at this point.


## Miscellaneous

### Built With
* [Discord.js](https://www.npmjs.com/package/discord.js) 
* [GameDig](https://www.npmjs.com/package/gamedig)
* [SRCDS RCON](https://www.npmjs.com/package/srcds-rcon)

### Licensing

This repository is licensed under the MIT Licence. [Learn more.](https://github.com/Retr0-01/srcds-discord-bot/blob/main/LICENCE.md)

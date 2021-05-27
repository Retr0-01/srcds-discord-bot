<img src="./assets/images/srcds-bot-banner-smaller.png" title="SRCDS Discord Bot" align="center">

# Source Dedicated Server Discord Bot &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Retr0-01/srcds-discord-bot/blob/main/LICENCE.md)
> A Discord bot that allows you to communicate with your Source Dedicated Server.

Bringing Source server management into Discord. When connected through a server using Valve's **R**emote **CON**sole protocol, this simple bot allows you to run a set of predefined bot commands (such as ``map mapname``) which are sent to your game server and executed or even your own rcon commands directly. It also allows you to log various types of events to different channels in your Discord server such as kill events, server info events or errors.  
**THIS IS A WORK IN PROGRESS SO A LOT OF FEATURES/COMMANDS MENTIONED HERE ARE INCOMPLETE OR NOT YET IMPLEMENTED**


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
Now that the bot is properly installed we need to configurate it. Before doing anything, rename the `config_template.json` file to `config.json`.

### Required Options
Option | Description
------------ | -------------
prefix | The prefix the bot will respond to. It can be anything you want.
token | If you don't know what this is, check out [this section](https://discordjs.guide/preparations/setting-up-a-bot-application.html) of the Discord.js guide.
gserverManagers | An array of Discord user IDs. This grants access to the game server commands. If you don't want the commands to be locked, enter the word *any*.
botManagers | An array of Discord user IDs. This grants access to the bot management commands. If you don't want the commands to be locked, enter the word *any*.

### Other Options
Option | Description
------------ | -------------
logs.commands | A Discord channel ID. This is where bot command executions will be logged.
logs.gserverKills | Logs every kill that took place in the game server.
logs.gserverInfo | Any kind of information printed to the game server's console will be logged there.
logs.gserverErrors | Any errors threw by the game server will be logged there.
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
findserver | Search a Source game server. 

### Source Game Server
Command | Description
------------ | -------------
rcon | The base RCON command.
serverinfo | Get information from the game server is bot is currently connected to.
map | Change the map of the game server is bot is currently connected to.
kick | Kick a member from the game server is bot is currently connected to.
ban | Same with kick but it bans.

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
* [SRCDS Log Receiver](https://www.npmjs.com/package/@srcds/log-receiver)
* [SRCDS Log Parser](https://www.npmjs.com/package/@srcds/log-parser)  

### Licensing

This repository is licensed under the MIT Licence. [Learn more.](https://github.com/Retr0-01/srcds-discord-bot/blob/main/LICENCE.md)

<p align="center">
  <img src="./assets/images/srcds-bot-banner-smaller.png" title="SRCDS Discord Bot">
</p>

# Source Dedicated Server Discord Bot  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Retr0-01/srcds-discord-bot/blob/main/LICENCE.md)
![GitHub issues](https://img.shields.io/github/issues/Retr0-01/srcds-discord-bot?style=flat-square)
> A Discord bot that allows you to communicate with your Source Dedicated Server.

Bringing Source server management into Discord. This simple bot allows you to run any kind of console commands using Valve's **R**emote **CON**sole protocol to your game servers through Discord.  

- [Source Dedicated Server Discord Bot](#source-dedicated-server-discord-bot)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Building](#building)
  - [Configuration](#configuration)
    - [Required Options](#required-options)
  - [Running](#running)
  - [Usage](#usage)
  - [Miscellaneous](#miscellaneous)
    - [FAQ](#faq)
    - [Built With](#built-with)
    - [Licensing](#licensing)

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/download/) - v16.9.0 or higher
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
Assuming you have Node.js installed and you are in the directory you installed the bot, open a command prompt and type:
```batch
npm install
```
This will install all the required dependencies the bot needs to function.

## Configuration
Now that the bot is properly installed we need to configurate it. Copy and rename the `example_config.json` file to `config.json`.

### Required Options
Option | Description
------------ | -------------
token | If you don't know what this is, check out [this section](https://discordjs.guide/preparations/setting-up-a-bot-application.html) of the Discord.js guide.
clientId | The client ID of your bot client.
guildIds | An array of Discord server IDs. This is the servers that will have the bot slash commands.

## Running
In order to run the bot, simply open the command prompt (or terminal) and type:
```batch
npm run start
```
If everything went well, you should see a the bot online, up and running.

## Usage
Everything on the bot is done using slash commands. Simply type `/` on a channel, click on the bot icon you have applied and you will see the list of available commands.

## Miscellaneous

### FAQ
**Q: Why don't you use a database like SQLite for the server list?**  
A: I wanted to avoid using SQLite for the simple reason of making the installation process easier for someone with not that much of experience with Node. In other words, I wanted to avoid the node-gyp stuff. The bot doesn't store so much data so using JSON files as a "database" seemed like an ideal solution to it.  

### Built With
* [Discord.js](https://www.npmjs.com/package/discord.js)
* [SRCDS RCON](https://www.npmjs.com/package/srcds-rcon)

### Licensing
This repository is licensed under the MIT Licence. [Learn more.](https://github.com/Retr0-01/srcds-discord-bot/blob/main/LICENCE.md)

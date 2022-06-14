/**
 * @fileoverview This file contains the code for the WikiQuote bot.
 * This bot accesses pages from the WikiQuote site based on queries
 * given to it by users and returns a random quote from that page.
 * This quote is sent as a message by the bot to the channel that 
 * the search command was sent in.
 * 
 * @author Katherine Wilson
 *
 * Dependencies:
 * 		- .env file 		- Contains "TOKEN", the unique code for accessing the Discord bot
 *		- wq_search.js file	- Contains classes for the WikiQuote "search engine"
 *  	- dotenv    		- Package for loading environmental variables
 *  	- discord.js		- Module that enables interactions with the Discord API
 *
 * Limitations:
 * This bot may have issues discerning quotes from other text (such 
 * as source descriptions) due to inconsistencies in the WikiQuote
 * website's formatting.
 *
 * References:
 * - https://beebom.com/how-make-discord-bot/
 * - http://javascript.internet.com/snippets/remove-html-tags.html		-- now defunct, but can be accessed through an internet archive
 */

require('dotenv').config();
const Discord = require("discord.js");
const wqSearch = require('./wq_search.js')
const searchEngine = new wqSearch.WikiQuoteSearch();
startBot();

/**
 * Boots up the bot and connects to clients. Actively listens for 
 * messages that contain the command keyword- "!wq". 
 *
 * Base code from:
 * https://beebom.com/how-make-discord-bot/
 */
function startBot() {
	const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
	client.on("ready", () => {
		console.log(`Logged in as ${client.user.tag}!`)
		client.user.setActivity('speeches | !wq help', {type: "LISTENING"});
	});
	
		
	client.on("message", msg => {
		if (msg.content.substring(0, 3) === "!wq") {		// processes message if it starts with "!wq"	
			processCommand(msg);
		}
	});
		
	client.login(process.env.TOKEN);	
}

/** 
 * Determines what command was specified by the user and handles it
 * accordingly.
 *
 * Valid commands are as follows:
 *		- !wq info
 *		- !wq help 
 *		- !wq search [Name of Quotee/Topic] 
 *
 * @param {!Message} msg Message sent by a user in a server this bot
 *                       is a member of
 * @return {boolean} Whether or not the message content matches this
 *                   bot's valid commands
 */
function processCommand(msg) {
	if (!msg.author.bot) {		// bot will ignore messages sent by bots
		if (msg.content === "!wq info") {							// DMs the user an embed with bot info, notifies them in the server of the DM
			const infoEmbed = new Discord.MessageEmbed()
				.setColor('#6ea1d0')
				.setAuthor({ name: 'Unofficial WikiQuote Bot', 
				             iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/300px-Wikiquote-logo.svg.png?20061124173848', 
							 url: 'https://github.com/katherine-wilson/unofficial-wiki-quote-bot-discord' })
				.setTitle('Github')
				.setURL('https://github.com/katherine-wilson/unofficial-wiki-quote-bot-discord')
				.setDescription('A tool for retrieving data from the WikiQuote website. This bot is not affiliated with the WikiQuote team.')
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/300px-Wikiquote-logo.svg.png?20061124173848')
				.setFooter({ text: '"If you want the answer—ask the question." • Lorii Myers'});
			msg.author.send({embeds: [infoEmbed] });
			
			msg.channel.send("<@" + msg.author.id + ">: Information about this bot has been privately messaged to you.");
			
		} else if (msg.content === "!wq help") {					// DMs the user an embed with command info, notifies them in the server of the DM
			const commandsEmbed = new Discord.MessageEmbed()
				.setColor('#6ea1d0')
				.setTitle('Commands')
				.setDescription('-------------------------------------------------------------------\n' +
								'\t`!wq info` - displays info about this bot\n' +
								'\t`!wq help` - display commands\n' +
								'\t`!wq search [full name/topic]` - retrieve a random quote from the specified source\n' +
								'-------------------------------------------------------------------\n')
				.setTimestamp()
				.setFooter({ text: 'Thank you for using the Unofficial WikiQuote Bot.'});
			
			msg.author.send({embeds: [commandsEmbed] });
			
			msg.channel.send("<@" + msg.author.id + ">: Check your private messages for the commands.");
		
		} else if (msg.content.match("!wq search .*")) {			// searches WikiQuote using the query and sends a quote to the channel
			searchEngine.lookup(msg, sendQuote);
			
			//searchWikiQuote(msg);
		
		} else {
			msg.channel.send('*Unrecognized command. Use  *`!wq help` *to view a list of valid commands.*'); 
		}
	}
	return false;
}

/** 
 * Retrieves a random quote from the given array and sends it as
 * as a reply to the user. Nothing will be sent if the array is 
 * empty.
 *
 * @param {!Message} msg Message sent by the user that the bot will reply to.
 * @param {Array.String} List of quotes gathered from the user's query.
 */
function sendQuote(msg, quotes) {
	if (quotes.length != 0) {
		msg.channel.send('```" ' + quotes[Math.floor(Math.random() * quotes.length)] + ' "```');
	} else {
		msg.channel.send("*No quotes found for this person/topic.*");
	}
}
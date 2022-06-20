# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/300px-Wikiquote-logo.svg.png?20061124173848%27" width="27" height="31"> WikiQuote Bot for Discord 
This bot was built for use on the [Discord](https://discord.com/) social platform. Its purpose is to retrieve a random quote from the [WikiQuote](https://en.wikiquote.org/wiki/) site based on user queries. The results are to be returned to the user as in the form of a message, which is sent to the same channel as the user's query. This small project is not affiliated with WikiQuote and was programmed using **Node.js**.


#### Contents
- [Setup](#how-to-set-up-this-bot)
  - [Inviting the default instance through Discord](#through-discord)
  - [Hosting this bot yourself](#running-it-yourself)
- [Commands](#how-to-use-this-bot)
- [How this bot works](#how-this-bot-works)
- [Limitations](#limitations)
- [References](#references)


<br>

# How to Set Up This Bot
## Through *Discord* 
Using Discord to try out this bot is very straight-forward. All you need is a Discord account and a server that you have permission to invite the bot to.<br><br>
<p align="center">
  <img src=https://user-images.githubusercontent.com/106413749/173713191-87e74101-9fdd-49be-a7dc-2a63aa2fb80d.png width=313 height=410></img>
</p>

### &nbsp;&nbsp;&nbsp;Steps:
<ol> 
  <li>Use this link to invite the <b>WikiQuote Bot</b> to your server: <a href=https://discord.com/api/oauth2/authorize?client_id=980643350044614759&permissions=116800&scope=bot title="Invite WikiQuote Bot">Invite Link</a></li>
  <li>Select the server you plan on adding the bot to from the dropdown menu. After clicking continue, make sure the bot is authorized.</li>
  <li>Once it's in the server, the bot is ready for use for as long as it's online.</li>
</ol>

<p align="center">
  <img src=https://user-images.githubusercontent.com/106413749/173714414-03679f07-ca1a-4431-ad3d-19a64ac135ff.png>
</p><br>

---

## Running It Yourself
Setting up your own version of this bot will be a little more complicated than following the steps above to use mine. This involves utilizing Discord's [Developer Portal](https://discord.com/developers/applications/) to register an application for the bot. I found this [guide](https://beebom.com/how-make-discord-bot/) to be particularly helpful for this process.

Almost all files necessary for creating a replica of this bot can be found in the "files" folder. Once you have set up the bot application through the Developer Portal, you must link it to the program files using your application's unique token. 

Please note that in addition to the files provided by this repo, you will have to create an additional file for environmental variables in order to link the code to Discord. This is used to store the aforementioned token, which acts as a unique identifier for the Discord application you are creating. This token should be stored as an environmental variable in a file titled ".env". The contents of the file should follow the format below:<br>
<p align="center">
<img src=https://user-images.githubusercontent.com/106413749/173716378-d95f769a-ef7a-40ae-9f4c-d96b38ca94f5.png>
</p><br>
Finally, "npm install" should be used in the command line in the directory of your local copy of this repo's files to install the packages used for this project. Once this is complete, "node bot.js" can be used to run the bot from the command line. If your bot is still offline after using this command, double check that you followed all of the steps outlined above and in the linked guide. 


---

Once access is gained to the bot (through one method or another), you can read through the [commands](#how-to-use-this-bot) below to understand how to use it.

# How to Use This Bot
At the moment, this bot supports the use of 3 different commands.
<ul>
  <li><b>Help</b><br>
         The <code>!wq help</code> command is used to retrieve the list of valid commands that this bot will respond to. When this command is sent to a text channel that the bot has access to, the bot will privately message an <a href=https://discordjs.guide/popular-topics/embeds.html#embed-preview>embed</a> to the user that sent the command. The received embed contains a list of commands and a brief description of each.
  <p align="center">
    <img src=https://user-images.githubusercontent.com/106413749/173964283-77683b5c-73a4-41d0-ae7f-aed22569a5dd.PNG width=632 height=229>
  </p>
  </li>
  
  <li><b>Info</b><br>
         The <code>!wq info</code> command is used to receive information about this bot. When this command is sent to a text channel that the bot has access to, the bot will privately message an <a href=https://discordjs.guide/popular-topics/embeds.html#embed-preview>embed</a> to the user that requested the information. The received embed contains a brief description of this bot's purpose and links the user to this GitHub repo.
  <p align="center">
    <img src=https://user-images.githubusercontent.com/106413749/173963756-46d5cef3-9a2d-4e96-837e-b8e9d97de587.PNG width=631 height=205>
  </p>
  </li>

  <li><b>Search</b><br>
         The <code>!wq search [query]</code> command is used to invoke this bot's main functionality: searching WikiQuote for a random quote related to the given query. The query should either be a person (full name) or a topic (ex. "motivation"). If a page exists for the given query on the WikiQuote site, a random quote will be chosen from it and sent to the channel that the command was originally sent in. Should the page not exist or be of an unsupported format, a message will be sent to the user informing them that there was an error. Although WikiQuote has quotes for many different types of media (films, people, musicals, etc.), this bot currently only supports pages designed for people and topics.  
      
  <p align="center">
    <img src=https://user-images.githubusercontent.com/106413749/173971806-7952ccee-fc98-4c4d-871e-c66dfebdd1e4.png width=838 height=155>
  </p>
  </li>
  
</ul>

# How This Bot Works

# Limitations

# References

# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/300px-Wikiquote-logo.svg.png?20061124173848%27" width="27" height="31"> WikiQuote Bot for Discord 
This bot was built for use on the [Discord](https://discord.com/) social platform. Its purpose is to retrieve a random quote from the [WikiQuote](https://en.wikiquote.org/wiki/) site based on user queries. The results are to be returned to the user as in the form of a message, which is sent to the same channel as the user's query. This small project is not affiliated with WikiQuote and was programmed using **Node.js**.


#### Contents
- [Setup](#how-to-set-up-this-bot)
  - [Inviting the default instance through Discord](#through-discord)
  - [Hosting this bot yourself](#running-it-yourself)
- [Using this bot](#how-to-use-this-bot)
- [How this bot works](#how-this-bot-works)
- [References](#references)


<br>

# How to Set Up This Bot
## Through *Discord* 
Using Discord to try out this bot is very straight-forward. All you need is a Discord account and a server that you have permission to invite the bot to.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=https://user-images.githubusercontent.com/106413749/173713191-87e74101-9fdd-49be-a7dc-2a63aa2fb80d.png width=313 height=410></img>
### &nbsp;&nbsp;&nbsp;Steps:
<ol> 
  <li>Use this link to invite the <b>WikiQuote Bot</b> to your server: <a href=https://discord.com/api/oauth2/authorize?client_id=980643350044614759&permissions=116800&scope=bot title="Invite WikiQuote Bot">Invite Link</a></li>
  <li>Select the server you plan on adding the bot to from the dropdown menu. After clicking continue, make sure the bot is authorized.</li>
  <li>Once it's in the server, the bot is ready for use for as long as it's online.</li>
</ol>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![online-c](https://user-images.githubusercontent.com/106413749/173714414-03679f07-ca1a-4431-ad3d-19a64ac135ff.png)<br>

---

## Running It Yourself
Setting up your own version of this bot will be a little more complicated than following the steps above to use mine. This involves utilizing Discord's [Developer Portal](https://discord.com/developers/applications/) to register an application for the bot. I found this [guide](https://beebom.com/how-make-discord-bot/) to be particularly helpful for this process.

Almost all files necessary for creating a replica of this bot can be found in the "files" folder. Once you have set up the bot's application through the Developer Portal, you must link it to the program files using your application's unique token. 

Please note that in addition to the files provided by this repo, you will have to create an additional file for environmental variables in order to link the code to Discord. This is used to store the aforementioned token, which acts as a unique identifier for the Discord application you are creating. This token should be stored as an environmental variable in a file titled ".env". The contents of the file should follow the format below:<br>
![env-c](https://user-images.githubusercontent.com/106413749/173716378-d95f769a-ef7a-40ae-9f4c-d96b38ca94f5.png)<br>
Finally, "npm install" should be used in the command line in the directory of your local copy of this repo's files to install the packages used for this project. Once this is complete, "node bot.js" can be used to run the bot from the command line. If your bot is still offline after using this command, double check that you followed all of the steps outlined above and in the linked guide. 


---

Once access is gained to the bot (through one method or another), you can read through the [commands](#how-to-use-this-bot) below to understand how to use it.

# How to Use This Bot

# How This Bot Works

# References

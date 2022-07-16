# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/300px-Wikiquote-logo.svg.png?20061124173848%27" width="27" height="31"> WikiQuote Bot for Discord 
This bot was built for use on the [Discord](https://discord.com/) social platform. Its purpose is to retrieve a random quote from the [WikiQuote](https://en.wikiquote.org/wiki/) site based on user queries. The results are to be returned to the user as in the form of a message, which is sent to the same channel as the user's query. This small project is not affiliated with WikiQuote and was programmed using **Node.js**.


#### Contents
- [Setup](#how-to-set-up-this-bot)
  - [Inviting the default instance through Discord](#through-discord)
  - [Hosting this bot yourself](#running-it-yourself)
- [Commands](#how-to-use-this-bot)
- [How this bot works](#how-this-bot-works)
- [Limitations](#limitations)
- [Future](#future)
- [Packages](#packages)
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

### DISCORD API - 
  - Connects this bot to Discord
  - Processes the text content of every message in the Discord servers it's present in
  - Checks if the content matches the given commands exactly
### WEB SCRAPING + REGEX -
  - WikiQuote URL is formed based on the Discord user's query
      - The query is converted to title case, underscores are used to separate words, and appended to the end of this string: "https://en.wikiquote.org/wiki/"
  - Request-Promise package is used to retrieve the HTML from that URL
  - HTML is processed with Regular Expressions (Regex) to retrieve all of the quotes from that webpage
      - This was the most difficult part of the project as WikiQuote doesn't use a clear-cut format for placing quotes on each of its pages. While scraping similar quotation sites such as [BrainyQuote](https://www.brainyquote.com/) would have been much more straight-forward and consistent, I wanted a challenge. After observing different pages across the site, I found that WikiQuote tends to store its quotes after an "h2" HTML tag (titled "Quotes" if the page is for a person and a single letter (A-Z) for pages about topics) in an unordered list (marked by "ul" HTML tags). Quotes are typically found at the first "level" of a nested unordered list (AKA the leftmost bullet point on the page visually). The subsequent nested unordered lists are typically used to provide sources, translations, etc.
      - In order to extract these quotes, I used a variable titled "ulDepth" to track what level of unordered lists the function's "cursor" is currently scanning. When a "ul" tag is found, 1 is added to the depth, and when a "/ul" tag is found, 1 is subtracted from the depth. Any content found at a ulDepth of 1 will have its HTML tags removed and be added to the list of quotes gathered from that page. However, as previously mentioned, not all pages store quotes this way, so this method will not accurately scrape quotes off of every page (see the [Limitations](#limitations) section of this document).
### LRU Cache + Linked Lists -
  - Once quotes are found, this program stores them in an LRU cache. This cache was created using the following classes:
    - Doubly-Linked List Node 
    - Fixed-Capacity Doubly-Linked List Wrapper Class
    - Cache (Linked List + Map)
    - Search Engine (Cache + Methods that retrieve data from/add data to the cache)
  - The UML Diagram below showcases the functionality of and relationships between these classes: 
  
  - The purpose of the LRU cache is to speed up the retrieval of quotes from sources that have been recently scraped. Rather than having to load and scrape a website's HTML every time a quote from the same page is retrieved, the search engine can retrieve its cached quotes in O(1)-O(50) time (the cache has a capacity of 50 pages). 

# Limitations
The biggest limiting factor of this small project was WikiQuote's inconsistent format across its open-collaboration platform. Because of this, there's no definitive way to scrape quotes from any page on the site with 100% accuracy. Sometimes sources and translations get mixed in with what's considered a "quote" by this bot as a result. This, unfortunately, limits the [future](#future) of this project as the types of pages not covered by the current version of this bot (ex. movies) tend to have even less consistency than the ones that have.

# Future
- Give users ability to resolve disambiguations (ex. pages like [this](https://en.wikiquote.org/wiki/John_Smith))
- Broaden the "types" of pages this bot can scan (ex. video games, musicals, movies, etc.)
- Cite sources for quotes (especially for topic pages that contain quotes from many authors)

# Packages
- [request-promise](https://www.npmjs.com/package/request-promise)
- [discord.js](discord.js.org)

# References
- https://beebom.com/how-make-discord-bot/
  - Discord Bot setup code
- [http://javascript.internet.com/snippets/remove-html-tags.html](https://web.archive.org/web/20110923215741/http://javascript.internet.com:80/snippets/remove-html-tags.html)
  - Source for Regex that removes HTML tags
- https://www.interviewcake.com/concept/java/lru-cache
  - Conceptual resource for building the LRU cache 

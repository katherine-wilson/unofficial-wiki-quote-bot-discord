/**
 * @fileoverview This file contains the code for a WikiQuote "search
 * engine". The file contains 4 classes. 
 *
 * The WikiQuoteSearch class provides users with all of the tools
 * necessary for searching the website with the lookup(msg, sendQuote)
 * function. This class utilizes basic HTML-scraping to gather a list
 * of quotes from the webpage found based on the given user query.
 * It is also backed by a LRU cache to speed up search/scrape times
 * for repeated queries. This is the only exportable class in this file.
 *
 * Data structures and their components make up the remainder of the classes
 * in this file (LRU cache, doubly-linked + fixed-capacity linked list, 
 * linked-list node). I used the link below as a resource to learn about and
 * eventually construct the underlying cache data structure.
 * 
 * @author Katherine Wilson
 *
 * Dependencies:
 *		- request-promise	- Package for retrieving HTML source from URLs
 *
 * References:
 * - https://www.interviewcake.com/concept/java/lru-cache
 */


/**
 * A node that can be used to build a doubly-linked list. 
 * Stores a label, data, and previous/next pointers to 
 * other nodes.
 */
class Node {	
	/**
	 * Constructs a single instance of a node for a doubly-linked list. 
	 *
	 * @param {*} label A tag that can be used to identify what this node stores
	 * @param {*} data All data stored by this node
	 */
	constructor(label, data) {
		this.label = label;
		this.data = data;
		this.prev = null;
		this.next = null;
	}
}


/**
 * Wrapper class for a fixed-capacity doubly-linked list to be used with a map in a cache. 
 * Keeps track of the head of the list, the tail of the list, and the size of the list.
 * New nodes can only be added to the head of the list. When the capacity of this list
 * is reached, the tail node will be discarded with each node added. If a node is accessed,
 * it should be sent to the front of this linked list using sendToHead().
 */
class LinkedList {
	head = null;					// first element in LL
	tail = null;					// last element in LL
	size = 0;						// # of elements currently in LL
	
	/**
	 * Constructs a doubly-linked list with a node capacity equal
	 * to the value passed in to this constructor.
	 *
	 * @param {number} capacity Maximum number of nodes that can be stored in this linked list
	 */
	constructor(capacity) {
		this.capacity = capacity;	// max # of elements the LL can store (discards tail when limit reached)
	}
	
	/**
	 * Adds a node to the front of this linked list. If the
	 * list is at maximum capacity, then the tail node will
	 * be discarded and returned.
	 *
	 * @param {Node} newHead Node to be added to the list
 	 * @return {(Node|null)} Node removed from this list due to overflow 
						   (null if no removals were made)
	 */
	addHead(newHead) {
		if (this.size == 0) {				// if no elements added yet-- initialize tail pointer
			this.tail = newHead;
		} else {							// otherwise-- set old head's prev pointer to new node
			this.head.prev = newHead;
		}
		
		newHead.next = this.head;			// sets new node's next pointer
		this.head = newHead;				// updates list's head pointer
		
		this.size++;		
		console.log("size: " + this.size);
		if (this.size > this.capacity) {	// removes tail node and returns it
			let removed = this.tail;
			this.tail = this.tail.prev;
			this.tail.next = null;
			this.size--;
			return removed;
		} else {							// no removals necessary, returns null
			return null;
		}
	}
	
	/**
	 * Moves the given node to the front of the linked list.
	 *
	 * @param {Node} Node to be sent to the front of this linked list.
	 */
	sendToHead(node) {
		if (node != this.head) {		// if the node isn't already at the head of the list...
		
			// resets pointers of adjacent nodes
			node.prev.next = node.next;		
			if (node != this.tail) {				// if the node is not the tail of the list...
				node.next.prev = node.prev;				// reset the next node's prev pointer
			} else {								// otherwise
				this.tail = this.tail.prev;				// update tail pointer
				this.tail.next = null;
			}
			
			// resets this node's pointers
			node.prev = null;
			node.next = this.head;
			
			// updates head pointer
			this.head.prev = node;
			this.head = node;
		}	
	}
}


/**
 * LRU cache backed by a Map and a doubly-linked list. This
 * cache is specifically designed to store queries and results
 * for the WikiQuoteSearch object. Query results can be retrieved
 * from this cache using retrieve(query). If not found, then the
 * query and its results should be added using add(query, quotes). 
 */
class Cache {
	#map = new Map();				// maps queries to linked list nodes that store results
	#list = new LinkedList(50);		// list of up to 50 nodes that store web results and are labelled with their query
	
	/**
	 * Retrieves the results of the given query if it's stored in
	 * the cache. 
	 *
	 * @param {string} query Search query associated with the results
	 * @return {(String[]|null)} List of results found for the query or null
	 *						   if they haven't been added to the cache yet
	 */
	retrieve(query) {					
		if (this.#map.get(query.toUpperCase()) != null) {					// if item exists in cache...
			this.#list.sendToHead(this.#map.get(query.toUpperCase()));		// move item to head of LL
			return this.#map.get(query.toUpperCase()).data;					// return data stored at node
		}
		return null;
	}
	
	/**
	 * Adds a new entry to the cache. Queries are stored using all
	 * uppercase letters to allow case-insensitive searches.
	 *
	 * @param {string} query Search query that leads to the results
	 * @param {string[]} results Results of the query
	 */
	add(query, results) {
		// creates and adds LL node to cache's LL
		let newNode = new Node(query.toUpperCase(), results);
		let removed = this.#list.addHead(newNode);
		if (removed != null) {
			this.#map.delete(removed.label);		// deletes the removed LL node from the map	
		}
		
		// maps query to the new LL node
		this.#map.set(query.toUpperCase(), newNode);
	}	
}


/**
 * "Search engine" for the WikiQuote website. Used to search for quotes
 * based on the given Discord message object. This class utilizes a LRU
 * cache to quickly retrieve quotes that have been searched for before.
 */
class SearchEngine {
	#cache = new Cache();		// LRU cache that stores previously-searched-for quotes
	
	/**
	 * Selects a quote from the given list and sends it to the channel 
	 * that the given Discord message object was sent in.
	 * 
	 * @name sendQuote
	 * @param {Object} msg Message sent by the user containing the query
	 * @param {String[]} quotes List of possible quotes to be sent to the user
	 */
	
	/**
	 * Retrieves quotes based on the following query (if results are found)
	 * and runs the provided function afterwards.
	 * 
	 * @param {Object} msg Discord Message sent by the user containing the query.
	 * @param {function(Object, string[])} sendQuote Function that handles Discord output to the user
	 *												 upon completion of the search.
	 */
	lookup(msg, sendQuote) {
		let quotes = this.#cache.retrieve(msg.content);
		if (quotes == null) {					// if quotes not in cache, search for them
			quotes = this.#searchWikiQuote(msg, sendQuote);
		} else {								// if quotes found in cache, pick one
			sendQuote(msg, quotes);
		}
	}
	
	/** 
	 * Generates the URL needed to retrieve quotes from based on the user's
	 * query.
	 *
	 * @param {string} query Full search command entered by the user.
	 * @return {string} URL that the quote is retrieved from.
	 */
	#fetchURL(query) {
		let queryWords = query.split(' ');
		let url = "https://en.wikiquote.org/wiki/";		// base URL for WikiQuote
		
		// adds each word to the URL in title case with underscores between them
		for (let i = 2; i < queryWords.length; i++) {
			url += queryWords[i].charAt(0).toUpperCase() + queryWords[i].substring(1).toLowerCase();	// query must be in title case
			
			if (i != queryWords.length-1) {		// no underscore after last word in query
				url += "_";
			}
		}
		
		return url;
	}

	/**
	 * Extracts quotes from the designated WikiQuote page. It starts by taking the given
	 * message object and converting its query into a usable URL (according to the format
	 * of WikiQuote URLs). The request-promise package is used to retrieve the HTML code 
	 * of the page stored at the generated URL. If the URL doesn't exist, this function will
	 * exit. If the URL exists and it stores quotes for a topic or person, then those quotes
	 * will be extracted from the HTML and sent to the sendQuote() function to form a reply
	 * to the user. The results will also be added to the cache.
	 *
	 * @param {!Message} Message sent by the user that contains the search query for the site.
	 * @param {sendQuote} sendQuote Function that handles Discord output to the user upon completion
	 *								of the search.
	 */
	#searchWikiQuote(msg, sendQuote) {
		const request = require("request-promise");
		let quotes = [];		// array of quotes on the page
		request(this.#fetchURL(msg.content), (error, response, html) => {
			if (!error && response.statusCode == 200) {
				let lines = html.split("\n");		// splits html of page into separate lines
				let quotesFound = false;			// true when a section of quotes is currently being searched
				let searchEnded = false;			// ends search for quotes
				let ulDepth = 0;					// keeps track of <ul> depth, quotes are generally at depth 1
				
				// iterates over each line in the html, creates a list of quotes
				lines.forEach( line => {
					if (!searchEnded) {
						if (quotesFound && !line.match(".*<h2>.*")) {														// searches for a quote if the line is within a quote-containing section
							// counts the number of <ul> tags in the current line, increases depth accordingly
							let ulStarts = line.match(/<ul>/g);
							if (ulStarts != null) {
								ulDepth += ulStarts.length;
							}
							
							// removes HTML tags from the quote and adds it to the array of quotes
							if (ulDepth == 1) {	
								let quote = line.replace(/<br \/>/g, "\n").replace(/\s{2,}/g, " ").replace(/[”"“]/g, "'");					// replaces line breaks with \n, removes extra spaces, replaces " with '
								quote = quote.replace(/<\/?[^>]+(>|$)/g, "")																// removes html tags-- regex source: http://javascript.internet.com/snippets/remove-html-tags.html
								quote = quote.replace("&#8212;", "--").replace("&#160;", " ").replace("&#8205;", "").replace("&amp;", "&");	// replaces misc chars
								if (quote.length != 0 && quote.length <= 2000) {	// Discord messages cannot be longer than 2000 chars
									quotes.push(quote);
								}
							}
							
							// counts the number of </ul> tags in the current line, decreases depth accordingly
							let ulEnds = line.match(/<\/ul>/g);
							if (ulEnds != null) {
								ulDepth -= ulEnds.length;
							}
						} else if (line.match('<h2><span class="mw-headline" id="Quotes">Quotes</span>.*') || 			
								   line.match('<h2><span class="mw-headline" id="[A-Z]">\[A-Z]</span>.*')) {			// signals to the loop that a section containing quotes has been reached
							quotesFound = true;
						} else if (line.match(".*<h2>.*") && 
								   quotesFound &&
								   !line.match('<h2><span class="mw-headline" id="[A-Z]">\[A-Z]</span>.*')) {			// signals to the loop that the end of a "quote section" has been reached
							quotesFound = false;
							searchEnded = true;
						}
					}
				});	
				console.log("Number of quotes: " + quotes.length);
				sendQuote(msg, quotes);
				this.#cache.add(msg.content, quotes);
			} else {
				msg.channel.send("*Person/Topic could not be found. Try another search term.*");
			}
		});
	}
}


// EXPORTS:
module.exports = { SearchEngine };
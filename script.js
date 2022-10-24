const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
	setTimeout(function () {
		console.log("Delay");
	}, 5000);
}

function removeLoadingSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
	showLoadingSpinner();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}
	// Check Quote length to determine the styling
	if (quote.text.length > 100) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}

	// Set Quote, hide loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
}

//  Get Quotes from API
async function getQuotes() {
	showLoadingSpinner();
	const apiUrl =
		"https://jacintodesign.github.io/quotes-api/data/quotes.json";
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch Error Here
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();

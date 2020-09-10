const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const instagramBtn = document.getElementById('instagram');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");
//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Get Quote from API
async function getQuote() {
    loading();
    // We need to use a Proxy URL to make our API call in order to avoid a CORS error
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add "Unknown"
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce Font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Stop Loader
        complete();
    } catch (error) {
        getQuote();
    }
}
//  Quote
const quote = quoteText.innerText;
const author = authorText.innerText;

function tweetQuote(quote, author) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function facebookQuote(quote, author) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?text=${quote} - ${author}`;
    window.open(facebookUrl, '_blank');
}

function instagramQuote(quote, author) {
    const twitterUrl = `https://instagram.com/intent/feed?text=${quote} - ${author}`;
    window.open(instagramUrl, '_blank');
}

//Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', facebookQuote);
instagramBtn.addEventListener('click', instagramQuote);
newQuoteBtn.addEventListener('click', getQuote);
// On the load 
getQuote();
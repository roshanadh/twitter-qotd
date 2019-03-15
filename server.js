const express = require('express');
const request = require('request');
const Twit = require('twit');
const PORT = process.env.PORT || 3000;
const URL = 'https://quotes.rest/qod';
 
const T = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

function tweetIt(){
    let tweetMsg = '';
    let hashTags = ' #DailyQuotes #QuoteOfTheDay'
    var lenQuote, lenAuthor, lenHashTags, lenTweetMsg, isAlreadyTweeted;
    request.get(URL, (err, res, body) => {
        if(err) console.log(err);

        let parsedBody = JSON.parse(body);
        let quote = parsedBody.contents.quotes[0].quote;
        let author = parsedBody.contents.quotes[0].author;

        lenQuote = quote.length;
        lenAuthor = author.length;
        lenHashTags = hashTags.length;

        if(lenQuote + lenAuthor + lenHashTags <= 280)
            tweetMsg = `'${quote}' - ${author}` + `${hashTags}`;
        else if(lenQuote + lenAuthor <= 280 && lenQuote + lenAuthor + lenHashTags > 280)
            tweetMsg = `'${quote}' - ${author}`;
        else 
            tweetMsg = 'Have a good day everyone!' + hashTags;

        lenTweetMsg = tweetMsg.length;
        console.log(tweetMsg, lenTweetMsg);

        // Search if the tweet has already been tweeted by the account
        T.get('search/tweets', { q: '"' + tweetMsg +'" from:daytheofquote', count: 100 }, function(err, data, response) {
            if(data.statuses.length == 0){
                // Tweet does not exist as of yet
                console.log("Tweet IS NOT a duplicate!");
                T.post('statuses/update', { status: tweetMsg }, function(err, data, response) {
                    if(err) console.log(err, tweetMsg);
                });
            }
            else{
                // Tweet already exists
                console.log("Tweet IS a duplicate!");
            }
          });
    });
}
const app = express();
app.all('/of_qotd', (req, res) => {
    res.status(200).send("This is the response!");
    tweetIt();
    
});
app.listen(PORT, () => {
    console.log(`Server is now listening to port ${PORT}`);
});

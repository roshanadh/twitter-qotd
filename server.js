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
    request.get(URL, (err, res, body) => {
        if(err) console.log(err);

        let parsedBody = JSON.parse(body);
        let quote = parsedBody.contents.quotes[0].quote;
        let author = parsedBody.contents.quotes[0].author;
        tweetMsg = `'${quote}' - ${author}` + `${hashTags}`;
        console.log(tweetMsg);
        
        T.post('statuses/update', { status: tweetMsg }, function(err, data, response) {
            if(err){
                console.log(err);
                if(err.code == 186){
                    tweetMsg = `'${quote}' - ${author}`;
                    T.post('statuses/update', { status: tweetMsg }, function(err, data, response) {
                        if(err) console.log(err);            
                    });
                }
            }

        });
    })
}
const app = express();
app.all('/of_qotd', (req, res) => {
    res.status(200).send("This is the response!");
    tweetIt();
    
});
app.listen(PORT, () => {
    console.log(`Server is now listening to port ${PORT}`);
});

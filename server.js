const express = require('express');
const request = require('request');
const Twit = require('twit');
const PORT = process.env.PORT || 3000;
const URL = 'https://quotes.rest/qod';
 
const T = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY || 'E18SMHf0oz0ssyf2XeU3FChJA',
    consumer_secret: process.env.BOT_CONSUMER_SECRET || 'skaZBYcLcAGsOSPod9JDgniBqSzLSbE3reRS0neMa85LvYY36q',
    access_token: process.env.BOT_ACCESS_TOKEN || '1103973630520655872-dQncd31f2aOgJNzEA61kayyWKiLgd0',
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET || 'wm4Y6MS6mvFrqrfpHPdGpP1xQxrIsJb6c3LM3SCkzUgZ1',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

function tweetIt(){
    let tweetMsg = 'test 02';
    request.get(URL, (err, res, body) => {
        if(err) console.log(err);

        let parsedBody = JSON.parse(body);
        let quote = parsedBody.contents.quotes[0].quote;
        let author = parsedBody.contents.quotes[0].author;
       // tweetMsg = `'${quote}' - ${author}`;
        console.log(tweetMsg);
        
        T.post('statuses/update', { status: tweetMsg }, function(err, data, response) {
            if(err)
                console.log(err);
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

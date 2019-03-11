# twitter-qotd
Tweets Quote of the day from *TheySaidSo*.
* Makes GET request to the https://quotes.rest/qod API
* Parses the response into a JavaScript object
* Tweets the quote followed by the author name

## Deployment
Uses *Heroku* for deployment.

Twitter account: https://twitter.com/of_qotd

Twitter API does not allow duplicate status updates within a certain interval of time.

So, https://uptimerobot.com/ is used to invoke the tweet function in definite intervals.



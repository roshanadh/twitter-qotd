# twitter-qotd
Tweets Quote of the day from *TheySaidSo*.
* Makes GET request to the https://quotes.rest/qod API
* Parses the response into a JavaScript object
* Tweets the quote followed by the author name

## Deployment
Uses *Heroku* for deployment.

Heroku app URL: https://roshan-qotd.herokuapp.com/

Twitter account: https://twitter.com/of_qotd

Make **GET** requests to https://roshan-qotd.herokuapp.com/of_qotd for invoking the tweet function. 
However, Twitter API does not allow duplicate status updates within a certain interval of time.

So, https://uptimerobot.com/ makes the requests in definite intervals to invoke the function.



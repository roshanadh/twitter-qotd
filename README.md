# twitter-qotd 
[![Assertible status](https://assertible.com/apis/07dfcd2c-23b7-43fd-831e-63e1df7f1204/status?api_token=iSBLmckiZ7PFMxXU)](https://assertible.com/dashboard#/services/07dfcd2c-23b7-43fd-831e-63e1df7f1204/results)

Tweets Quote of the day from *TheySaidSo*.
* Makes GET request to the https://quotes.rest/qod API
* Parses the response into a JavaScript object
* Tweets the quote followed by the author name

## Deployment
Uses *Heroku* for deployment.

Twitter account: https://twitter.com/daytheofquote

Twitter API does not allow duplicate status updates within a certain interval of time.

So, https://assertible.com/ is used to monitor the API endpoint daily which invokes the tweet function.



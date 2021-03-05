const Twitter = require('twitter')
require('dotenv').config()

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
})

const fetchTweets = async () => {
    try {
        const tweets = await client.get('statuses/user_timeline', {
            user_id: '1207689379835191296',
            count: 4,
        })
        return tweets
    } catch (error) {
        console.log(error)
    }
}

module.exports = async function () {
    return await fetchTweets()
}

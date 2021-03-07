const Twitter = require('twitter')
require('dotenv').config()

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const fetchTweets = async () => {
    try {
        const tweets = await client.get('statuses/user_timeline', {
            user_id: '1207689379835191296',
            exclude_replies: true,
        })
        return tweets.slice(0, 4)
    } catch (error) {
        console.log(error)
    }
}

module.exports = async function () {
    return await fetchTweets()
}

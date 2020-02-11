const axios = require("axios")

const IFTTT_TWITTER_MAKER_EVENT = process.env.IFTTT_TWITTER_MAKER_EVENT
const IFTTT_TWITTER_MAKER_KEY = process.env.IFTTT_TWITTER_MAKER_KEY

module.exports = async function (msg) {
    if (!IFTTT_TWITTER_MAKER_EVENT) {
        console.warn("IFTTT_TWITTER_MAKER_EVENT is not set")
        return
    }

    if (!IFTTT_TWITTER_MAKER_KEY) {
        console.warn("IFTTT_TWITTER_MAKER_KEY is not set")
        return
    }

    await axios.post(
        `https://maker.ifttt.com` +
        `/trigger/${IFTTT_TWITTER_MAKER_EVENT}` +
        `/with/key/${IFTTT_TWITTER_MAKER_KEY}`,
        { value1: msg },
    )
}
require("dotenv/config")
const { pickRandomFromArray, readIntoArray } = require("./utils")
const postOnFacebook = require("./connectors/ifttt-facebook")
const postOnTwitter = require("./connectors/ifttt-twitter")

const modifiers = readIntoArray(__dirname + "/../data/0-modifiers.txt")
const left = readIntoArray(__dirname + "/../data/1-left.txt")
const right = readIntoArray(__dirname + "/../data/3-right.txt")


function generateNew() {
    return `${pickRandomFromArray(modifiers, 0.25)}` +
        `${pickRandomFromArray(left)} ` +
        `${pickRandomFromArray(modifiers, 0.25)}` +
        `${pickRandomFromArray(right)}`
}

exports.generateNew = async (req, res) => {
    if (req.method === "GET") {
        return res.status(200).send(generateNew())
    }

    if (req.method === "POST") {
        try {
            await Promise.all([
                postOnFacebook(generateNew()),
                postOnTwitter(generateNew()),
            ])
        } catch (err) {
            console.error(err)
            return res.status(500).send("Something went wrong")
        }

        return res.status(200).send("OK")
    }
}

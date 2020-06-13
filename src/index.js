require("dotenv/config")
const { pickRandomFromArray, readIntoArray } = require("./utils")
const postOnFacebook = require("./connectors/ifttt-facebook")
const postOnTwitter = require("./connectors/ifttt-twitter")
const express = require("express")

const modifiers = readIntoArray(__dirname + "/../data/0-modifiers.txt")
const left = readIntoArray(__dirname + "/../data/1-left.txt")
const right = readIntoArray(__dirname + "/../data/3-right.txt")


function generateNew() {
    return `${pickRandomFromArray(modifiers, 0.25)}` +
        `${pickRandomFromArray(left)} ` +
        `${pickRandomFromArray(modifiers, 0.25)}` +
        `${pickRandomFromArray(right)}`
}

const app = express()

app.get("/", async (req, res, next) => {
    try {
        const result = generateNew()
        return res.status(200).send(result)
    } catch (err) {
        return next(err)
    }
})

app.post("/", async (req, res, next) => {
    try {
        await Promise.all([
            postOnFacebook(generateNew()),
            postOnTwitter(generateNew()),
        ])

        return res.status(200).send("OK")
    } catch (err) {
        return next(err)
    }
})

app.use((err, req, res, next) => {
    console.error(err)
    if (res.headersSent) return next(err)
    res.status(500).send("Something went wrong")
})

exports.entry = app

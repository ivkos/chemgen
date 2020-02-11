const fs = require("fs")

function pickRandomFromArray(arr, probabilityOfEmpty = 0) {
    if (Math.random() < probabilityOfEmpty) {
        return ""
    }

    return arr[~~(Math.random() * arr.length)]
}

function readIntoArray(filename) {
    const file = fs.readFileSync(filename, "utf-8")

    return file.split("\n")
        .map(str => str.trim())
        .filter(str => str !== "")
}

module.exports = {
    pickRandomFromArray,
    readIntoArray,
}
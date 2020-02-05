const fs = require("fs")
const axios = require("axios")
const modifiers = readIntoArray("./0-modifiers.txt")
const left = readIntoArray("./1-left.txt")
const right = readIntoArray("./3-right.txt")

const MAKER_EVENT = process.env.MAKER_EVENT || "MAKER_EVENT"
const MAKER_KEY = process.env.MAKER_KEY || "MAKER_KEY"

exports.generateNew = async (req, res) => {
	const chem = generateNew()
	if (req.method === "GET") {
		return res.status(200).send(chem);
	} else if (req.method === "POST") {
		try {
			await axios.post(`https://maker.ifttt.com/trigger/${MAKER_EVENT}/with/key/${MAKER_KEY}`, {
				value1: chem
			})
		} catch (err) {
			console.error(err)
			return res.status(500).send("Something went wrong")
		}

		return res.status(200).send(chem);
	}
};

function generateNew() {
	return `${pick(modifiers, 0.25)}${pick(left)} ${pick(modifiers, 0.25)}${pick(right)}`
}

function pick(arr, probabilityOfEmpty = 0) {
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
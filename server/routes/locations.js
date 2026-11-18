const Location = require("../models/locations");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//--------LocationS-----------
//CREATE Location
router.post("/", async (req, res) => {

	const location = new Location(req.body);

	try {
		await location.save()
		res.status(201).send(location);
	} catch(e) {
		res.status(400).send(e)
	}
});

//GET ALL LocationS
router.get("/", async (req, res) => {


	try {
		const locations = await Location.find(req.query);
		return res.status(200).send(locations)
	} catch(e) {
		return res.status(404).send(e);
	}
});

//GET ONE Location
router.get("/:id", async (req, res) => {

	try {
		const location = await Location.findById(req.params.id)
		return res.status(200).send(location)
	} catch(e) {
		return res.status(404).send(e);
	}
})

//UPDATE A Location
router.patch("/:id/update", async (req, res) => {

	const updates = Object.keys(req.body)

	const allowedUpdates = ["name", "isArchived"]

	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
}

	try {
		const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if(!location) {
			return res.status(404).send("Location doesn't exist!")
		}
		return res.send(location);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//ARCHIVE A LOCATION
router.patch("/:id/archive", auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = [
		"isArchived"
	]
	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
	}
	try {
		const location = await Location.findByIdAndUpdate(req.params.id, {isArchived: true}, { new: true });
		if(!location) {
			return res.status(404).send("Location doesn't exist!")
		}
		return res.send(location);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//UNARCHIVE A LOCATION
router.patch("/:id/unarchive", auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = [
		"isArchived"
	]
	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
	}
	try {
		const location = await Location.findByIdAndUpdate(req.params.id, {isArchived: false}, { new: true });
		if(!location) {
			return res.status(404).send("Location doesn't exist!")
		}
		return res.send(location);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//SOFT DELETE A Location
router.delete("/:id", async (req, res) => {

	try {
		const location = await Location.findByIdAndDelete(req.params.id)
		return res.status(200).send(location)
	} catch(e) {
		return res.status(500).send(e.message)
	}
})

//EXPORT ROUTER
module.exports = router;
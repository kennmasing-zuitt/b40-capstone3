const Building = require("../models/buildings");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//--------BuildingS-----------
//CREATE Building
router.post("/", async (req, res) => {
	const building = new Building({
		...req.body,
		locationId: req.body.locationId
		});

	try {
		await building.save()
		res.status(201).send(building);
	} catch(e) {
		res.status(400).send(e)
	}
});

// GET ALL 
router.get("/", async (req, res) => {
	try {
		const buildings = await Building.find(req.query).populate({
			path: 'locationId',
			select: 'name'
		});
		return res.status(200).send(buildings)
	} catch(e) {
		return res.status(404).send(e);
	}
});

// GET ALL 
router.get("/:id", async (req, res) => {
	try {
		const buildings = await Building.find({locationId : req.params.id}).populate({
			path: 'locationId',
			select: 'name'
		});
		return res.status(200).send(buildings)
	} catch(e) {
		return res.status(404).send(e);
	}
});

//GET ONE Building
router.get("/:id/one", async (req, res) => {

	try {
		const building = await Building.findById(req.params.id)
		return res.status(200).send(building)
	} catch(e) {
		return res.status(404).send(e);
	}
})

//UPDATE A Building
router.patch("/:id", async (req, res) => {
	const updates = Object.keys(req.body)

	const allowedUpdates = ["name", "isArchived", "locationId"]

	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
	}
	try {
		const building = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if(!building) {
			return res.status(404).send("Building doesn't exist!")
		}
		return res.send(building);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//ARCHIVE A building
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
		const building = await Building.findByIdAndUpdate(req.params.id, {isArchived: true}, { new: true });
		if(!building) {
			return res.status(404).send("building doesn't exist!")
		}
		return res.send(building);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//UNARCHIVE A building
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
		const building = await Building.findByIdAndUpdate(req.params.id, {isArchived: false}, { new: true });
		if(!building) {
			return res.status(404).send("building doesn't exist!")
		}
		return res.send(building);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//SOFT DELETE A Building
router.delete("/:id/softdelete", async (req, res) => {
	try {
		const building = await Building.findByIdAndUpdate(
			req.params.id,
			{isArchived: true},
			{new: true}
		)
		return res.status(200).send(building)
	} catch(e) {
		return res.status(500).send(e.message)
	}
})

//PERMANENTLY DELETE A building
router.delete("/:id/delete", async (req, res) => {

	try {
		const building = await Building.findByIdAndDelete(req.params.id)
		return res.status(200).send(building)
	} catch(e) {
		return res.status(500).send(e.message)
	}
})

//EXPORT ROUTER
module.exports = router;
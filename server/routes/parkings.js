const Parking = require("../models/parkings");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//--------ParkingS-----------
//CREATE Parking
router.post("/", async (req, res) => {
	// console.log("Create new Parking")

	const parking = new Parking({
		...req.body,
		locationId: req.body.locationId,
		buildingId: req.body.buildingId
	});

	try {
		await parking.save()
		res.status(201).send(parking);
	} catch(e) {
		res.status(400).send(e)
	}
});

// GET ALL PARKINGS
router.get("/", async (req, res) => {
	// console.log("GET ALL PARKINGS")
	try {
		const parkings = await Parking.find(req.query)
			.populate({ path: 'locationId', select: 'name'})
			.populate({ path: 'buildingId', select: 'name'})
			.exec();
		return res.status(200).send(parkings)
	} catch(e) {
		res.status(500).send(e)
	}
})

//GET ALL PARKINGS WITH PAGINATION
router.get("/paginate", async (req, res) => {
	// console.log("GET ALL PARKINGS")
	let where = {}
	let limit = 0
	let skip = 0

	// if(req.query.buildingId){
	// 	where = {buildingId: req.query.buildingId}
	// }

	// if(rq.query.locationId){
	// 	where = {locationId: req.query.locationId}
	// }

	// if(req.query.isArchived == "true"){
	// 	where = {isArchived: true}
	// } else if(req.query.isArchived == "false") {
	// 	where = { isArchived : false }
	// }

	if(req.query.limit){
		limit = parseInt(req.query.limit)
	}

	if(req.query.skip){
		skip = parseInt(req.query.skip)
	}

	try {
		const parkings = await Parking.find(where)
			.limit(limit)
			.skip(skip)
			.populate({ path: 'locationId', select: 'name'})
			.populate({ path: 'buildingId', select: 'name'})
			.exec()

		const total = await Parking.estimatedDocumentCount();
		return res.status(200).send({total, parkings})
	} catch(e) {
		res.status(404).send(e)
	}
})


//GET ALL AVAILABLE PARKINGS
router.get("/:id", async (req, res) => {
	// console.log("Get all Parkings")
	// console.log(req.query)
	try {
		if(!req.query.isAvailable) {
			const parkings = await Parking.find({buildingId : req.params.id})
				.populate({ path: 'locationId', select: 'name'})
				.populate({ path: 'buildingId', select: 'name'})
				.exec();
			return res.status(200).send(parkings)
		}
		const parkings = await Parking.find({buildingId : req.params.id} && {isAvailable:req.query.isAvailable})
			.populate({ path: 'locationId', select: 'name'})
			.populate({ path: 'buildingId', select: 'name'})
			.exec();
		return res.send(parkings)
	} catch(e) {
		return res.status(404).send(e);
	}
});

//GET ONE Parking
router.get("/:id/one", async (req, res) => {

	try {
		const parking = await Parking.findById(req.params.id)
			.populate({ path: 'locationId', select: 'name'})
			.populate({ path: 'buildingId', select: 'name'})
			.exec();
		return res.status(200).send(parking)
	} catch(e) {
		return res.status(404).send(e);
	}
})

//UPDATE A PARKING
router.patch("/:id/update", auth, async (req, res) => {
	// console.log("Update a Parking")	
	const updates = Object.keys(req.body)

	const allowedUpdates = [
		"name",
		"locationId",
		"buildingId",
		"isAvailable",
		"isArchived"
	]

	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
}

	try {
		const parking = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if(!parking) {
			return res.status(404).send("Parking doesn't exist!")
		}
		return res.send(parking);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//DISABLE A PARKING
router.patch("/:id/disable", async (req, res) => {
	// console.log("DISABLE A Parking")	
	const updates = Object.keys(req.body)
	const allowedUpdates = [
		"isAvailable"
	]
	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
	}
	try {
		const parking = await Parking.findByIdAndUpdate(req.params.id, {isAvailable: false}, { new: true });
		if(!parking) {
			return res.status(404).send("Parking doesn't exist!")
		}
		return res.send(parking);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//ENABLE A PARKING
router.patch("/:id/enable", async (req, res) => {
	// console.log("ENABLE A Parking")	
	const updates = Object.keys(req.body)
	const allowedUpdates = [
		"isAvailable"
	]
	const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
	if(!isValidUpdate) {
		return res.status(400).send({error : "Invalid update!"})
	}
	try {
		const parking = await Parking.findByIdAndUpdate({_id: req.params.id}, {isAvailable: true}, { new: true });
		if(!parking) {
			return res.status(404).send("Parking doesn't exist!")
		}
		return res.send(parking);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//SOFT DELETE A Parking
// router.patch("/:id", async (req, res) => {
// 	// console.log("Delete a Parking")
// 	try {
// 		const parking = await Parking.findByIdAndUpdate(
// 			req.params.id,
// 			{isArchived: true},
// 			{new: true}
// 		)
// 		return res.status(200).send(parking)
// 	} catch(e) {
// 		return res.status(500).send(e.message)
// 	}
// })

//PERMANENTLY DELETE A Parking
router.delete("/:id/delete", async (req, res) => {

	try {
		const parking = await Parking.findByIdAndDelete(req.params.id)
		return res.status(200).send(parking)
	} catch(e) {
		return res.status(500).send(e.message)
	}
})

//ARCHIVE A PARKING
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
		const parking = await Parking.findByIdAndUpdate(req.params.id, {isArchived: true}, { new: true });
		if(!parking) {
			return res.status(404).send("parking doesn't exist!")
		}
		return res.send(parking);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//UNARCHIVE A PARKING
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
		const parking = await Parking.findByIdAndUpdate(req.params.id, {isArchived: false}, { new: true });
		if(!parking) {
			return res.status(404).send("Parking doesn't exist!")
		}
		return res.send(parking);
	} catch(e) {
		return res.status(500).send(e)
	}
})

//EXPORT ROUTER
module.exports = router;
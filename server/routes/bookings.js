const Booking = require("../models/bookings");
// const Parking = require("../models/parkings");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//---------BOOKINGS-----------
//CREATE NEW BOOKING
router.post("/", auth, async (req, res) => {
	const booking = new Booking({
		...req.body,
		userId: req.user._id,
		locationId: req.body.locationId,
		buildingId: req.body.buildingId,
		parkingId: req.body.parkingId,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		amount: req.body.amount
	});

	try {
		await booking.save();
		res.status(201).send(booking);
	} catch(e) {
		res.status(400).send(e);
	}
});

//GET ALL BOOKINGS BY PARKING SLOT
router.get("/:id/parking", auth, async (req, res) => {
	try {
		const bookings = await Booking.find({parkingId: req.params.id})
			.populate({ path: 'userId', select: ['firstName', 'lastName', 'email', 'roleId'] })
			.populate({ path: 'locationId', select: 'name' })
			.populate({ path: 'buildingId', select: 'name' })
			.populate({ path: 'parkingId', select: ['name','isAvailable'] })
			.populate({ path: 'statusId', select: ['name', 'statusCode'] })
			.exec()
		return res.status(200).send(bookings)
	} catch(e) {
		return res.status(404).send(e);
	}
});

//GET ONE BOOKING
router.get("/:id", auth, async (req, res) => {
	// console.log("GET ONE BOOKING")
	try {
		const booking = await Booking.findById(req.params.id)
			.populate({ path: 'userId', select: ['firstName', 'lastName', 'email', 'roleId'] })
			.populate({ path: 'locationId', select: 'name' })
			.populate({ path: 'buildingId', select: 'name' })
			.populate({ path: 'parkingId', select: ['name','isAvailable'] })
			.populate({ path: 'statusId', select: ['name', 'statusCode'] })
			.exec()
		return res.status(200).send(booking)
	} catch(e) {
		return res.status(404).send(e);
	}
});

// //EXPORT ROUTER
module.exports = router;

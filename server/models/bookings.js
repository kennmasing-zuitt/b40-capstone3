//DECLARE DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// const uniqueValidator = require("mongoose-unique-validator");

const bookingSchema = new Schema(
	{
		name: {
			type: String
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		startDate: {
			type: Date,
			default: null
		},
		endDate: {
			type: Date,
			default: null
		},
		schedule: {
			type: Date,
			default: null
			// required: true
		},
		amount: {
			type: Number,
			default: 999000
		},
		locationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location"
		},
		buildingId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Building"
		},
		parkingId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Parking"
		},
		statusId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Status",
			// default: "5e95f8fd319c3d2e10b9229e" //LOCAL DB
			default: "5e5fac721c84eb4bf42d4879" //REMOTE DB
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		isCompleted: {
			type: Boolean,
			default: false
		},
		isArchived: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
	}
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

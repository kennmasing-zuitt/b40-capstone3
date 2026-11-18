//DECLARE DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// const uniqueValidator = require("mongoose-unique-validator");

const parkingSchema = new Schema(
	{
		name: {
			type: String,
			minlength: 1,
			maxlength: 3,
			required: [true, "Slot number is required!"],
			validate(value) {
				if(validator.isLength(value) > 3 ) {
					throw new Error("Cannot be more than 999!")
				}

				if(validator.isLength(value) < 1 ) {
					throw new Error("Cannot be a negative number!")
				}

				if(!validator.isNumeric(value, {no_symbols: true})) {
					throw new Error("Slot number invalid! Use only numeric characters!")
				}
			}
		},
		locationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location",
			required: [true, "Must have a location id!"]
		},
		buildingId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Building",
			required: [true, "Must have a building id!"]
		},
		isAvailable: {
			type: Boolean,
			default: true
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

//VIRTUAL RELATIONSHIP
parkingSchema.virtual("bookings", {
	ref: "Booking",
	localField: "_id",
	foreignField: "parkingId"
})

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;
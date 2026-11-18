//DECLARE DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// const uniqueValidator = require("mongoose-unique-validator");

const buildingSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 30,
			unique: true,
			validate(value) {
				if(validator.isLength(value) > 30 ) {
					throw new Error("Max character for building name is 30!")
				}
			}
		},
		locationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location",
			required: [true, "Must have a location id!"]
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
buildingSchema.virtual("parkings", {
	ref: "Parking",
	localField: "_id",
	foreignField: "buildingId"
})

//VIRTUAL RELATIONSHIP
buildingSchema.virtual("bookings", {
	ref: "Booking",
	localField: "_id",
	foreignField: "buildingId"
})

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;
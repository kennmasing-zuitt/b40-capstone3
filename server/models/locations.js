//DECLARE DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// const uniqueValidator = require("mongoose-unique-validator");

const locationSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minlength: 1,
			maxlength: 20,
			unique: true,
			validate(value) {
				if(validator.isLength(value) > 20 ) {
					throw new Error("Max character for location name is 20!")
				}
				if(validator.isLength(value) < 1 ) {
					throw new Error("Minimum character for location name is 3!")
				}
			}
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
locationSchema.virtual("buildings", {
	ref: "Building",
	localField: "_id",
	foreignField: "locationId"
})

//VIRTUAL RELATIONSHIP
locationSchema.virtual("parkings", {
	ref: "Parking",
	localField: "_id",
	foreignField: "locationId"
})

//VIRTUAL RELATIONSHIP
locationSchema.virtual("bookings", {
	ref: "Booking",
	localField: "_id",
	foreignField: "locationId"
})

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
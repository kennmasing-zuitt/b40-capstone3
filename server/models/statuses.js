//DECLARE DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// const uniqueValidator = require("mongoose-unique-validator");

const statusSchema = new Schema(
	{
		name: {
			type: String
		},
		statusCode: {
			type: Number
		}
	},
	{
		timestamps: true,
	}
);

//VIRTUAL RELATIONSHIP
statusSchema.virtual("bookings", {
	ref: "Booking",
	localField: "_id",
	foreignField: "statusId"
})

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;

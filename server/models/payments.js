const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const paymentSchema = new Schema(
	{	
		source: {
			type: String
		},
		amount: {
			type: Number
		},
		email: {
			type: String
		},
		currency: {
			type: String,
			default: "PHP"
		}
	},
	{
		timestamps: true,
	}
);

// paymentSchema.virtual("buildings", {
// 	ref: "Building",
// 	localField: "_id",
// 	foreignField: "paymentId"
// })

// paymentSchema.virtual("parkings", {
// 	ref: "Parking",
// 	localField: "_id",
// 	foreignField: "paymentId"
// })

// paymentSchema.virtual("bookings", {
// 	ref: "Booking",
// 	localField: "_id",
// 	foreignField: "paymentId"
// })

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
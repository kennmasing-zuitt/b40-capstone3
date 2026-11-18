
//DECLARE DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


//DEFINE SCHEMA
const userSchema = new Schema(
	{
		firstName: {
		type: String,
		trim: true,
		minlength: 1,
		maxlength: 20,
		default: "User",
		validate(value) {
				if(validator.isLength(value) > 20 ) {
					throw new Error("Max character for first name is 30!")
				}
				if(validator.isLength(value) < 1 ) {
					throw new Error("Minimum character for first name is 1!")
				}
			}
		},
		lastName: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 20,
			default: "Last Name",
			validate(value) {
				if(validator.isLength(value) > 30 ) {
					throw new Error("Max character for last name is 30!")
				}
				if(validator.isLength(value) < 1 ) {
					throw new Error("Minimum character for last name is 1!")
				}
			}
		},
		username: {
			type: String,
			required: true,
			trim: true,
			maxlength: 15,
			unique: true,
			// index: true,

			validate(value) {
				if(validator.isLength(value) > 15 ) {
					throw new Error("Max character for Username is 15!")
				}

				if(!validator.isAlphanumeric(value, 'en-US')) {
					throw new Error("Username is invalid! Use only alphanumeric characters!")
				}
			}
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			validate(value) {
				if(!validator.isEmail(value)) {
					throw new Error("Email is invalid!")
				} 
			}
		},
		password: {
			type: String,
			required: [true, "Password is required!"],
			minlength: [8, "Password must have at least 5 characters!"]
		},
		roleId: {
			type: Number,
			default: 3,
			validate(value) {
				if(value >= 4) {
					throw new Error("Invalid Role ID!")
				}
			}
		},
		isArchived: {
			type: Boolean,
			default: false
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
)

//HASH PASSWORD WHEN CREATING AND UPDATING USER
userSchema.pre("save", async function(next) {
	const user = this

	if(user.isModified('password')) {
		//SALT
		const salt = await bcrypt.genSalt(10);
		//HASH
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

//FIND BY CREDENTIALS USING STATICS
userSchema.statics.findByCredentials = async (email, username, password) => {
	

	//CHECK IF EMAIL EXISTS
	const user = await User.findOne({ email } || { username });
		console.log(user);
		function myError(message) {
		this.message = message
		}

  		myError.prototype = new Error();
		
		if(!user) {
			throw new myError("Email or username is wrong!") //FOR NOW
		}

	//COMPARING REQUEST PASSWORD VD DATABASE PASSWORD
	const isMatch = await bcrypt.compare(password, user.password);

		if(!isMatch) {
			throw new myError("Wrong password!")//FOR NOW
		}

		return user
};

//GENERATE TOKENS
userSchema.methods.generateAuthToken = async function() {
	const user = this
	
	const token = jwt.sign({_id: user._id.toString()}, "batch40", { expiresIn: '14 days'});

	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;

};

//(OPTIONAL) SET RELATIONSHIP
userSchema.virtual("bookings", {
	ref: "Booking",
	localField: "_id",
	foreignField: "userId"
});


//EXPORT MODEL
const User = mongoose.model("User", userSchema);
module.exports = User;
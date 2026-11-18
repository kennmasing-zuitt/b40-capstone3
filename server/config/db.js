//CONNECT TO DATABASE
const mongoose = require("mongoose"); 

const remoteDB = (process.env.MONGODB_URI || "").trim();
if (!remoteDB) {
	throw new Error("MONGODB_URI is required. See server/README.md.");
}

//FUNCTION THAT CONNECTS TO DATABASE
const connectToRemoteDB = async() => {
	try{
		await mongoose.connect(remoteDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		console.log("MongoDB Atlas is connected")
	}catch(e){
		console.log(e.message)
	}
}

//EXPORT
module.exports = connectToRemoteDB;
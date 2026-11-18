//DECLARE DEPENDENCIES
const express = require("express")
const app = express();
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const graphQLSchema = require("./gql-schema");
const cors = require("cors");
const connectToRemoteDB = require("./config/db");
const auth = require("./jwt-auth");

//CONNECT TO LOCAL DATABASE
// mongoose.connect("mongodb://localhost:27017/merng-capstone3", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// 	useCreateIndex: true
// });
// mongoose.connection.once("open", ()=> {
// 	console.log("Now connected to local MongoDB");
// });

//CONNECT TO REMOTE DATABASE
connectToRemoteDB();

//APPLY MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({  extended:true }));
app.use(cors());

// ON APOLLO SERVER
// ERROR HANDLER
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};
app.use(errorHandler);

app.use("/graphql", graphqlHTTP((req, res) => ({
	schema: graphQLSchema,
	graphiql: true,
	context: {
		request: req,
		currentUser: auth.verify(req.headers.authorization)
	}
})))

//CREATE ROUTES / ENDPOINTS - REST
// const usersRoute = require("./routes/users");
// app.use("/users", usersRoute);

// const bookingsRoute = require("./routes/bookings");
// app.use("/bookings", bookingsRoute);

// const statusesRoute = require("./routes/statuses");
// app.use("/statuses", statusesRoute);

// const hoursRoute = require("./routes/hours");
// app.use("/hours", hoursRoute);

// const locationsRoute = require("./routes/locations");
// app.use("/locations", locationsRoute);

// const buildingsRoute = require("./routes/buildings");
// app.use("/buildings", buildingsRoute);

// const parkingsRoute = require("./routes/parkings");
// app.use("/parkings", parkingsRoute);

// const paymentsRoute = require("./routes/payments");
// app.use("/payments", paymentsRoute);


//INITIALIZE SERVE
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Now listening to port ${port} CAPSTONE-3`)
})
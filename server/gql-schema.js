//DECLARE DEPENDENCIES
const bcrypt = require('bcrypt');
const auth = require('./jwt-auth');
const graphql = require("graphql");
const sendgrid = require("./middleware/sendgrid");
const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || "").trim();
if (!stripeSecretKey) {
	throw new Error("STRIPE_SECRET_KEY is required. See server/README.md.");
}
const stripe = require('stripe')(stripeSecretKey);

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLList,
	GraphQLSchema
} = graphql;
const graphQLISODate = require("graphql-iso-date");
const { GraphQLDateTime } = graphQLISODate;

//DECLARE THE MODELS
const Payment = require("./models/payments");
const User = require("./models/users");
const Booking = require("./models/bookings");
const Status = require("./models/statuses");
const Location = require("./models/locations");
const Building = require("./models/buildings");
const Parking = require("./models/parkings");

const pending = "5e5fac721c84eb4bf42d4879"
const approved = "5e5fac7f1c84eb4bf42d487a"
const declined = "5e5fac881c84eb4bf42d487b"

//CREATE TYPES
//----------------------P A Y M E N T S------------------------
const PaymentType = new GraphQLObjectType({
	name: "Payment",
	fields: () => ({
		token: {type: GraphQLString},
		amount: {type: GraphQLInt},
		response: {type: GraphQLBoolean}
	})
})
//--------------------------U S E R S--------------------------
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		limit: {type: GraphQLInt},
		skip: {type: GraphQLInt},
		total: {type: GraphQLInt},
		_id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		roleId: { type: GraphQLInt },
		isArchived: { type: GraphQLBoolean },
		token: { type: GraphQLString },
		tokens: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})
//------------------------B O O K I N G S-----------------------
const BookingType = new GraphQLObjectType({
	name: "Booking",
	fields: () => ({
		limit: {type: GraphQLInt},
		skip: {type: GraphQLInt},
		total: {type: GraphQLInt},
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		userId: {
			type: UserType,
			resolve: (parent, args) => {
				return User.findById(parent.userId)
			}
		},
		locationId: {
			type: LocationType,
			resolve: (parent, args) => {
				return Location.findById(parent.locationId)
			}
		},
		buildingId: {
			type: BuildingType,
			resolve: (parent, args) => {
				return Building.findById(parent.buildingId)
			}
		},
		parkingId: {
			type: ParkingType,
			resolve: (parent, args) => {
				return Parking.findById(parent.parkingId)
			}
		},
		statusId: {
			type: StatusType,
			resolve: (parent, args) => {
				return Status.findById(parent.statusId)
			}
		},
		startDate: { type: GraphQLDateTime },
		endDate: { type: GraphQLDateTime },
		schedule: { type: GraphQLDateTime },
		amount: { type: GraphQLInt },
		isPaid: { type: GraphQLBoolean },
		isCompleted: { type: GraphQLBoolean },
		isArchived: { type: GraphQLBoolean },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})
//----------------------L O C A T I O N S-----------------------
const LocationType = new GraphQLObjectType({
	name: "Location",
	fields: () => ({
		limit: {type: GraphQLInt},
		skip: {type: GraphQLInt},
		total: {type: GraphQLInt},
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		isArchived: { type: GraphQLBoolean },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})
//----------------------B U I L D I N G S-----------------------
const BuildingType = new GraphQLObjectType({
	name: "Building",
	fields: () => ({
		total: { type: GraphQLInt },
		limit: { type: GraphQLInt },
		skip: { type: GraphQLInt },
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		isArchived: { type: GraphQLBoolean },
		locationId: {
			type: LocationType,
			resolve: (parent, args) => {
				return Location.findById(parent.locationId)
			}
		},
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})
//------------------------P A R K I N G S-----------------------
const ParkingType = new GraphQLObjectType({
	name: "Parking",
	fields: () => ({
		limit: { type: GraphQLInt },
		skip: { type: GraphQLInt },
		total: { type: GraphQLInt },
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		locationId: {
			type: LocationType,
			resolve: (parent, args) => {
				return Location.findById(parent.locationId)
			}
		},
		buildingId: {
			type: BuildingType,
			resolve: (parent, args) => {
				return Building.findById(parent.buildingId)
			}
		},
		isArchived: { type: GraphQLBoolean },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})
//------------------------S T A T U S E S-----------------------
const StatusType = new GraphQLObjectType({
	name: "Status",
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		statusCode: { type: GraphQLInt },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})

//CREATE (ROOT) QUERIES - GET ALL, GET ONE
const RootQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		//--------------------------U S E R S--------------------------
		users: {
			type: new GraphQLList(UserType),
			args: {
				_id: { type: GraphQLID },
				limitName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				username: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
				roleId: { type: GraphQLInt },
				isArchived: { type: GraphQLBoolean },
				tokens: { type: GraphQLString },
				createdAt: { type: GraphQLDateTime },
				updatedAt: { type: GraphQLDateTime }				
			},
			resolve: (parent, args) => {
				return User.find()
			}
		},
		usersByRoleId: {
			type: new GraphQLList(UserType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				isArchived: { type: GraphQLBoolean},
				roleId: { type: GraphQLInt }
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.roleId != null && args.isArchived == true){
					where = {
						roleId: args.roleId,
						isArchived: true
					}
				} else if(args.roleId != null && args.isArchived == false){
					where = {
						roleId: args.roleId,
						isArchived: false
					}
				} else if(args.roleId){
					where = {
						roleId: args.roleId
					}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const usersLength = await User.find(where)

				const users = await User.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(usersLength.length)

				args.total = total

				users.map(user => {
					user.total = args.total
				})

				return users
			}
		},
		user: {
			type: UserType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return User.findById(args._id)
			}
		},
		userCurrent: {
			type: UserType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return User.findById(args._id)
			}
		},
		//------------------------B O O K I N G S-----------------------
		bookings: {
			type: new GraphQLList(BookingType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type: GraphQLInt },
				name: { type: GraphQLString },
				userId: { type: GraphQLID },

				locationId: { type: GraphQLID },
				buildingId: { type: GraphQLID },
				parkingId: { type: GraphQLID },
				statusId: { type: GraphQLID },
				isPaid: { type: GraphQLBoolean },
				isCompleted: { type: GraphQLBoolean },
				isArchived: { type: GraphQLBoolean },
				startDate: { type: GraphQLDateTime },
				endDate: { type: GraphQLDateTime },
				schedule: { type: GraphQLDateTime },
				amount: { type: GraphQLInt }
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				const now = new Date()
				const bookingsBeforeFilter = await Booking.find()

				const filterApproval = await Booking.updateMany({statusId: pending, isPaid: true}, {$set: {statusId: approved}})
				const filterCompletion = await Booking.updateMany({statusId: approved, isCompleted: false, endDate: {$lte: now}}, {$set: {isCompleted: true}})
				const filterArchival = await Booking.updateMany({isArchived: false, isCompleted: true, endDate: {$lte: now}}, {$set: {isArchived: true}})

				const bookingsToDeleteByPayment = await Booking.find({ isPaid: false, endDate: {$lte: now} })
				const bookingByPaymentIds = bookingsToDeleteByPayment.map(booking => booking._id)
				await Booking.deleteMany({
					_id: {
						$in: bookingByPaymentIds
					}
				})

				const bookingsToDeleteByStatus = await Booking.find({ statusId:declined, endDate: {$lte: now} })
				const bookingByStatusIds = bookingsToDeleteByStatus.map(booking => booking._id)
				await Booking.deleteMany({
					_id: {
						$in: bookingByStatusIds
					}
				})

				if(args.userId){
					where = {userId: args.userId}
				}
				if(args.locationId){
					where = {locationId: args.locationId}
				}
				if(args.buildingId){
					where = {buildingId: args.buildingId}
				}
				if(args.parkingId){
					where = {parkingId: args.parkingId}
				}

				if(args.statusId == pending){
					where = {statusId: pending}
				} else if(args.statusId == approved){
					where = {statusId: approved}
				} else if(args.statusId ==declined){
					where = {statusId:declined}
				}

				if(args.isPaid == true){
					where = {isPaid: true}
				} else if(args.isPaid == false){
					where = {isPaid: false}
				}

				if(args.isCompleted == true){
					where = {isCompleted: true}
				} else if(args.isCompleted == false){
					where = {isCompleted: false}
				}

				if(args.isArchived == true){
					where = {isArchived: true}
				} else if(args.isArchived == false){
					where = {isArchived: false}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const bookingsLength =  await Booking.find(where)

				const bookings = await Booking.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(bookingsLength.length)

				args.total = total

				bookings.map(booking => {
					booking.total = args.total
				})

				return bookings
			}
		},
		userBookings: {
			type: new GraphQLList(BookingType),
			args: {
				userId: { type: GraphQLID },
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type: GraphQLInt },
				locationId: { type: GraphQLID },
				buildingId: { type: GraphQLID },
				parkingId: { type: GraphQLID },
				statusId: { type: GraphQLID },
				isPaid: { type: GraphQLBoolean },
				isCompleted: { type: GraphQLBoolean },
				isArchived: { type: GraphQLBoolean },
				startDate: { type: GraphQLDateTime },
				endDate: { type: GraphQLDateTime },
				schedule: { type: GraphQLDateTime },
				amount: { type: GraphQLInt }
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				const now = new Date()

				const bookingsBeforeFilter = await Booking.find()

				const filterApproval = await Booking.updateMany({statusId: pending, isPaid: true}, {$set: {statusId: approved}})
				const filterCompletion = await Booking.updateMany({statusId: approved, isCompleted: false, endDate: {$lte: now}}, {$set: {isCompleted: true}})
				const filterArchival = await Booking.updateMany({isArchived: false, isCompleted: true, endDate: {$lte: now}}, {$set: {isArchived: true}})

				const bookingsToDelete = await Booking.find({ statusId:declined, endDate: {$lte: now} })
				const bookingIds = bookingsToDelete.map(booking => booking._id)
				await Booking.deleteMany({
					_id: {
						$in: bookingIds
					}
				})

				/*-----------------------I S  P A I D--------------------------*/
				if(args.userId != null && args.isPaid == true){
					where = {
						userId: args.userId,
						isPaid: true
					}
				} else if(args.userId != null && args.isPaid == false){
					where = {
						userId: args.userId,
						isPaid: false
					}
				}  else if(args.userId != null && args.isCompleted == true){
					where = {
						userId: args.userId,
						isCompleted: true
					}
				} else if(args.userId != null && args.isCompleted == false){
					where = {
						userId: args.userId,
						isCompleted: false
					}
				} else if(args.userId != null && args.isArchived == true){
					where = {
						userId: args.userId,
						isArchived: true
					}
				} else if(args.userId != null && args.isArchived == false){
					where = {
						userId: args.userId,
						isArchived: false
					}
				} else if(args.userId != null && args.statusId == pending){
					where = {
						userId: args.userId,
						statusId: pending
					}
				} else if(args.userId != null && args.statusId == approved){
					where = {
						userId: args.userId,
						statusId: approved
					}
				} else if(args.userId != null && args.statusId ==declined){
					where = {
						userId: args.userId,
						statusId:declined
					}
				} else if(args.userId != null && !args.isPaid && !args.isCompleted && !args.isArchived && !args.statusId) {
					where = {
						userId: args.userId
					}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const bookingsLength =  await Booking.find(where)

				const bookings = await Booking.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(bookingsLength.length)

				args.total = total

				bookings.map(booking => {
					booking.total = args.total
				})

				return bookings
			}
		},
		bookingsByLocation: {
			type: new GraphQLList(BookingType),
			args: {
				locationId: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return Booking.find({ locationId: args.locationId })
			}
		},
		bookingsByBuilding: {
			type: new GraphQLList(BookingType),
			args: {
				buildingId: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return Booking.find({ buildingId: args.buildingId })
			}
		},
		bookingsByParking: {
			type: new GraphQLList(BookingType),
			args: {
				parkingId: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return Booking.find({ parkingId: args.parkingId })
			}
		},
		booking: {
			type: BookingType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return Booking.findById(args._id)
			}
		},
		//------------------------L O C A T I O N S-----------------------
		locations: {
			type: new GraphQLList(LocationType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				isArchived: { type: GraphQLBoolean}
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.isArchived == true){
					where = {isArchived: true}
				} else if(args.isArchived == false){
					where = {isArchived: false}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const locationsLength =  await Location.find(where)

				const locations = await Location.find(where)
					.limit(limit)
					.skip(skip)

				const total = await parseInt(locationsLength.length)
				
				args.total = total

				locations.map(location => {
					location.total = args.total
				})

				return locations
			}
		},
		location: {
			type: LocationType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return Location.findById(args._id)
			}
		},
		//------------------------B U I L D I N G S-----------------------
		buildings: {
			type: new GraphQLList(BuildingType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				isArchived: { type: GraphQLBoolean}
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.isArchived == true){
					where = { isArchived: true }
				} else if(args.isArchived == false){
					where = { isArchived: false }
				} 

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const buildingsLength =  await Building.find(where)

				const buildings = await Building.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(buildingsLength.length)
				
				args.total = total

				buildings.map(building => {
					building.total = args.total
				})

				return buildings
			}
		},
		building: {
			type: BuildingType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return Building.findById(args._id)
			}
		},
		buildingsLocation: {
			type: new GraphQLList(BuildingType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				locationId: { type: GraphQLID },
				isArchived: { type: GraphQLBoolean}
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.locationId != null && args.isArchived == true){
					where = {
						locationId: args.locationId,
						isArchived: true
					}
				} else if(args.locationId != null && args.isArchived == false){
					where = {
						locationId: args.locationId,
						isArchived: false
					}
				} else if(args.locationId){
					where = {
						locationId: args.locationId
					}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const buildingsLength =  await Building.find(where)

				const buildings = await Building.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(buildingsLength.length)
				
				args.total = total

				buildings.map(building => {
					building.total = args.total

				})

				return buildings
			}
		},
		//------------------------P A R K I N G S-----------------------
		parkings: {
			type: new GraphQLList(ParkingType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				isArchived: { type: GraphQLBoolean}
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.isArchived == true){
					where = { isArchived: true }
				} else if(args.isArchived == false){
					where = { isArchived: false }
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const parkingsLength =  await Parking.find(where)

				const parkings = await Parking.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(parkingsLength.length)
				
				args.total = total

				parkings.map(parking => {
					parking.total = args.total
				})

				return parkings
			}
		},
		parkingsBuilding: {
			type: new GraphQLList(ParkingType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				locationId: { type: GraphQLInt },
				buildingId: { type: GraphQLID },
				isArchived: { type: GraphQLBoolean}
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.buildingId != null && args.isArchived == true){
					where = {
						buildingId: args.buildingId,
						isArchived: true
					}
				} else if(args.buildingId != null && args.isArchived == false){
					where = {
						buildingId: args.buildingId,
						isArchived: false
					}
				} else if(args.buildingId){
					where = {
						buildingId: args.buildingId
					}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const parkingsLength =  await Parking.find(where)

				const parkings = await Parking.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(parkingsLength.length)
				
				args.total = total

				parkings.map(parking => {
					parking.total = args.total

				})

				return parkings
			}
		},
		parking: {
			type: ParkingType,
			args: {
				_id: { type: GraphQLID }
			},

			resolve: (parent, args) => {
				return Parking.findById(args._id)
			}
		},
		//------------------------S T A T U S E S-----------------------
		statuses: {
			type: new GraphQLList(StatusType),
			resolve: (parent, args) => {
				return Status.find()
			}
		}
	}
})

//CREATE MUTATIONS - POST. UPDATE, DELETE
const Mutations = new GraphQLObjectType({
	name: "Mutations",
	fields: {
		//--------------------------U S E R S--------------------------
 		login: {
 			type: UserType,
 			args: {
 				username: { type: new GraphQLNonNull(GraphQLString) },
 				password: { type: new GraphQLNonNull(GraphQLString) }
 			},
 			resolve: (parent, args) => {
 				let query = User.findOne({ username: args.username })

 				return query.then(user => user).then(user => {
 					if (user == null) { return null }

 					let isPasswordMatched = bcrypt.compareSync(args.password, user.password)

 					if(isPasswordMatched){
 						user.token = auth.createToken(user.toObject())
 						return user
 					} else {
 						return null
 					}
 				})
 			}
 		},
 		createUser: {
			type: UserType,
			args: {
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				username: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				roleId: { type: GraphQLInt },
				isArchived: { type: GraphQLBoolean }
			},
			resolve: async (parent, args) => {
				let user = new User({...args})
				await user.save()
				console.log("USER", user)
				console.log("USERNAME", user.username)
				console.log("EMAIL", user.email)
				return sendgrid.sendRegisterConfirmation(user.username, user.email)
			}
		},
		updateUser: {
			type: UserType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				username: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
				roleId: { type: GraphQLInt },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return User.findByIdAndUpdate(
					{ _id: args._id },
					{ ...args },
					{ new: true }
				)
			}
		},
		archiveUser: {
			type: UserType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: async (parent, args) => {

				if(args.isArchived == true) {
					const bookings = await Booking.find({ userId: args._id })
					const bookingIds = bookings.map(booking => booking._id)
					await Booking.updateMany({
						_id: {
							$in: bookingIds
						}
					},
					{ isArchived: true },
					{ new: true }
					)
				}else{
					const bookings = await Booking.find({ userId: args._id })
					const bookingIds = bookings.map(booking => booking._id)
					await Booking.updateMany({
						_id: {
							$in: bookingIds
						}
					},
					{ isArchived: false },
					{ new: true }
					)
				}
				
				return User.findByIdAndUpdate(
					{ _id: args._id },
					{ isArchived: args.isArchived },
					{ new: true }
				)
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: async (parent, args) => {
				//GET ALL bookings_ids OF THIS USER
				const bookings = await Booking.find({ userId: args._id })

				//MAP bookings_ids
				const bookingIds = bookings.map(booking => booking._id)

				//DELETE THE BOOKINGS WITHIN THE GIVEN bookings_ids
				await Booking.deleteMany({
					_id: {
						$in: bookingIds
					}
				})

				//DELETE THE USER
				return User.findByIdAndRemove({_id: args._id})
			}
		},
		//------------------------B O O K I N G S-----------------------
		createBooking: {
			type: BookingType,
			args: {
				name: { type: GraphQLString },
				userId: { type: GraphQLID },
				locationId: { type: GraphQLID },
				buildingId: { type: GraphQLID },
				parkingId: { type: GraphQLID },
				statusId: { type: GraphQLID },
				isPaid: { type: GraphQLBoolean },
				isCompleted: { type: GraphQLBoolean },
				isArchived: { type: GraphQLBoolean },
				startDate: { type: GraphQLDateTime },
				endDate: { type: GraphQLDateTime },
				schedule: { type: GraphQLDateTime },
				amount: { type: GraphQLInt }
			},
			resolve: (parent, args) => {
				let booking = new Booking({...args})
				return booking.save()
			}
		},
		pendingBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				statusId: { type: GraphQLID },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndUpdate(
					{ _id: args._id },
					{ statusId: pending },
					{ new: true }
				)
			}
		},
		approveBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				statusId: { type: GraphQLID },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndUpdate(
					{ _id: args._id },
					{ statusId: approved },
					{ new: true }
				)
			}
		},
		declineBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				statusId: { type: GraphQLID },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndUpdate(
					{ _id: args._id },
					{ statusId:declined },
					{ new: true }
				)
			}
		},
		payBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isPaid: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndUpdate(
					{ _id: args._id },
					{ isPaid: args.isPaid },
					{ new: true }
				)
			}
		},
		completeBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isCompleted: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndUpdate(
					{ _id: args._id },
					{ isCompleted: args.isCompleted },
					{ new: true }
				)
			}
		},
		archiveBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndUpdate(
					{ _id: args._id },
					{ isArchived: args.isArchived },
					{ new: true }
				)
			}
		},
		deleteBooking: {
			type: BookingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (parent, args) => {
				return Booking.findByIdAndRemove({_id: args._id})
			}
		},
		//------------------------L O C A T I O N S-----------------------
		createLocation: {
			type: LocationType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				let location = new Location({...args})
				return location.save()
			}
		},
		updateLocation: {
			type: LocationType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Location.findByIdAndUpdate(
					{ _id: args._id },
					{ ...args },
					{ new: true }
				)
			}
		},
		archiveLocation: {
			type: LocationType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: async (parent, args) => {

				if(args.isArchived == true){
					//(1) GET BUILDINGS
					const buildings = await Building.find({ locationId: args._id })

					//(2) MAP BUILDINGS
					const buildingIds = buildings.map(building => building._id)

					//(3) DELETE THE BUILLDINGS
					await Building.updateMany({
						_id: {
							$in: buildingIds
						}
					},
					{ isArchived: true },
					{ new: true }
					)

					//(4) DELETE THE PARKINGS IN THE BUILDINGS
					await Parking.updateMany({
						buildingId: {
							$in: buildingIds
						}
					},
					{ isArchived: true },
					{ new: true }

					)

					await Booking.updateMany({
						buildingId: {
							$in: buildingIds
						}
					},
					{ isArchived: true },
					{ new: true }
					)
				} else {
					//(1) GET BUILDINGS
					const buildings = await Building.find({ locationId: args._id })

					//(2) MAP BUILDINGS
					const buildingIds = buildings.map(building => building._id)

					//(3) DELETE THE BUILLDINGS
					await Building.updateMany({
						_id: {
							$in: buildingIds
						}
					},
					{ isArchived: false },
					{ new: true }
					)

					//(4) DELETE THE PARKINGS IN THE BUILDINGS
					await Parking.updateMany({
						buildingId: {
							$in: buildingIds
						}
					},
					{ isArchived: false },
					{ new: true }

					)

					await Booking.updateMany({
						buildingId: {
							$in: buildingIds
						}
					},
					{ isArchived: false },
					{ new: true }
					)
				}
				
				return Location.findByIdAndUpdate(
					{ _id: args._id },
					{ isArchived: args.isArchived },
					{ new: true }
				)
			}
		},
		deleteLocation: {
			type: LocationType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: async (parent, args) => {
				//(1) GET BUILDINGS
				const buildings = await Building.find({ locationId: args._id })

				//(2) MAP BUILDINGS
				const buildingIds = buildings.map(building => building._id)

				//(3) DELETE THE BUILLDINGS
				await Building.deleteMany({
					_id: {
						$in: buildingIds
					}
				})

				//(4) DELETE THE PARKINGS IN THE BUILDINGS
				await Parking.deleteMany({
					buildingId: {
						$in: buildingIds
					}
				})

				await Booking.deleteMany({
					buildingId: {
						$in: buildingIds
					}
				})

				//(6) DELETE THE LOCATION
				return Location.findByIdAndRemove({_id: args._id})
			}
		},
		//------------------------B U I L D I N G S-----------------------
		createBuilding: {
			type: BuildingType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				locationId: { type:GraphQLID }
			},
			resolve: async (parent, args) => {
				let building = new Building({...args})
				return building.save()
			}
		},
		updateBuilding: {
			type: BuildingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Building.findByIdAndUpdate(
					{ _id: args._id },
					{ ...args },
					{ new: true }
				)
			}
		},
		archiveBuilding: {
			type: BuildingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: async (parent, args) => {
				
				if(args.isArchived == true){
					// (1)
					const parkings = await Parking.find({ buildingId: args._id })

					// (2)
					const parkingIds = parkings.map(parking => parking._id)

					// (3)
					await Parking.updateMany({
						_id: {
							$in: parkingIds
						}
					},
					{ isArchived: true },
					{ new: true }
					)
				} else {
					// (1)
					const parkings = await Parking.find({ buildingId: args._id })

					// (2)
					const parkingIds = parkings.map(parking => parking._id)

					// (3)
					await Parking.updateMany({
						_id: {
							$in: parkingIds
						}
					},
					{ isArchived: false },
					{ new: true }
					)
				}

				return Building.findByIdAndUpdate(
					{ _id: args._id },
					{ isArchived: args.isArchived },
					{ new: true }
				)
			}
		},
		deleteBuilding: {
			type: BuildingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: async (parent, args) => {
				// (1)
				const parkings = await Parking.find({ buildingId: args._id })

				// (2)
				const parkingIds = parkings.map(parking => parking._id)

				// (3)
				await Parking.deleteMany({
					_id: {
						$in: parkingIds
					}
				})

				await Booking.deleteMany({
					parkingId: {
						$in: parkingIds
					}
				})

				// (5)
				return Building.findByIdAndRemove({_id: args._id})
			}
		},
		//------------------------P A R K I N G S-----------------------
		createParking: {
			type: ParkingType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				locationId: { type:GraphQLID },
				buildingId: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				let parking = new Parking({...args})
				return parking.save()
			}
		},
		updateParking: {
			type: ParkingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Parking.findByIdAndUpdate(
					{ _id: args._id },
					{ ...args },
					{ new: true }
				)
			}
		},
		archiveParking: {
			type: ParkingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: async (parent, args) => {

				if(args.isArchived == true){
					//(1)
					const bookings = await Booking.find({ parkingId: args._id })

					//(2)
					const bookingIds = bookings.map(booking => booking._id)

					//DELETE THE BOOKINGS WITHIN THE GIVEN bookings_ids
					await Booking.updateMany({
						_id: {
							$in: bookingIds
						}
					},
					{ isArchived: true },
					{ new: true }
					)

				} else {
					//(1)
					const bookings = await Booking.find({ parkingId: args._id })

					//(2)
					const bookingIds = bookings.map(booking => booking._id)

					//DELETE THE BOOKINGS WITHIN THE GIVEN bookings_ids
					await Booking.updateMany({
						_id: {
							$in: bookingIds
						}
					},
					{ isArchived: false },
					{ new: true }
					)
				}

				return Parking.findByIdAndUpdate(
					{ _id: args._id },
					{ isArchived: args.isArchived },
					{ new: true }
				)
			}
		},
		deleteParking: {
			type: ParkingType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: async (parent, args) => {
				//(1)
				const bookings = await Booking.find({ parkingId: args._id })

				//(2)
				const bookingIds = bookings.map(booking => booking._id)

				//DELETE THE BOOKINGS WITHIN THE GIVEN bookings_ids
				await Booking.deleteMany({
					_id: {
						$in: bookingIds
					}
				})

				//(4)
				return Parking.findByIdAndRemove({_id: args._id})
			}
		},
		//------------------------S T A T U S E S-----------------------
		stripePayment: {
			type: PaymentType,
			args: {
				token: { type: GraphQLString },
				amount: { type: GraphQLInt }
			},
			resolve: (parent, args) => {

				const stripeChargeCallback = () => async (stripeErr, stripeRes) => {
					
					if(stripeErr){
						// console.log("STRIPE ERROR" , stripeErr)
						return false
					} else {
						// console.log("STRIPE RESPONSE", stripeRes)

						await sendgrid.sendPaymentConfirmation(stripeRes.source.name, stripeRes.amount, stripeRes.id)
						return true
					}
				}

				const body = {
					source: args.token,
					amount: args.amount,
					// email: args.email,
					currency: "PHP"
				}

			stripe.charges.create(body, stripeChargeCallback());
			}
		},
		createStatus: {
			type: StatusType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				statusCode: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				let status = new Status({...args})
				return status.save()
			}
		},
		updateStatus: {
			type: StatusType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				statusCode: { type: GraphQLString },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return Status.findByIdAndUpdate(
					{ _id: args._id },
					{ ...args },
					{ new: true }
				)
			}
		},
		deleteStatus: {
			type: StatusType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (parent, args) => {
				return Status.findByIdAndRemove({_id: args._id})
			}
		}
	}
})

//EXPORT SCHEMA
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})

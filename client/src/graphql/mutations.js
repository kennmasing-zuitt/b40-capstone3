import gql from 'graphql-tag';

//--------------U S E R S----------------
const LOGIN_MUTATION = 	gql`
	mutation(
		$username: String!
		$password: String!
	){
		login(
			username: $username
			password: $password
		){
			_id
			firstName
			lastName
			username
			email
			roleId
			token
			isArchived
			createdAt
			updatedAt
		}
	}
`
const CREATE_USER = gql`
	mutation(
		$firstName: String!
		$lastName: String!
		$username: String!
		$email: String!
		$password: String!
		$roleId: Int
	){
		createUser(
			firstName: $firstName
			lastName: $lastName
			username: $username
			email: $email
			password: $password
			roleId: $roleId
		){
			_id
			firstName
			lastName
			username
			email
			password
			isArchived
			createdAt
			updatedAt
		}
	}
`
const UPDATE_USER = gql`
	mutation(
		$_id: ID!
		$firstName: String
		$lastName: String
		$username: String
		$email: String
		$password: String
		$isArchived: Boolean
	){
		updateUser(
			_id: $_id
			firstName: $firstName
			lastName: $lastName
			username: $username
			email: $email
			password: $password
			isArchived: $isArchived
		){
			_id
			firstName
			lastName
			username
			email
			password
			isArchived
			updatedAt
		}
	}
`
const ARCHIVE_USER = gql`
	mutation(
		$_id: ID!
		$isArchived: Boolean
	){
		archiveUser(
	 		_id: $_id
	 		isArchived: $isArchived
		){
			_id
			firstName
			lastName
			username
			password
			isArchived
			updatedAt
		}
	}
`
const DELETE_USER = gql`
	mutation(
		$_id: ID!
	){
		deleteUser(
			_id: $_id
		){
			_id
			firstName
			lastName
			username
			email
			password
			isArchived
			createdAt
			updatedAt
		}
	}
`
//-----------B O O K I N G S-------------
const CREATE_BOOKING = gql`
	mutation(
		$userId: ID
		$locationId: ID
		$buildingId: ID
		$parkingId: ID
		$amount: Int
		$statusId: ID
		$isPaid: Boolean
		$isCompleted: Boolean
		$isArchived: Boolean
		$startDate: DateTime
		$endDate: DateTime
		$schedule: DateTime
	){
		createBooking(
			userId: $userId
			locationId: $locationId
			buildingId: $buildingId
			parkingId: $parkingId
			amount: $amount
			statusId: $statusId
			isPaid: $isPaid
			isCompleted: $isCompleted
			isArchived: $isArchived
			startDate: $startDate
			endDate: $endDate
			schedule: $schedule
		){
			_id
			userId{
				_id
				firstName
				lastName
				username
			}
			locationId{
				_id
				name
			}
			buildingId{
				_id
				name
			}
			parkingId{
				_id
				name
			}
			statusId{
				_id
				name
			}
			amount
			isPaid
			isCompleted
			isArchived
			startDate
			endDate
			schedule
		}
	}
`
const PAY_BOOKING = gql`
	mutation(
		$_id: ID!
		$isPaid: Boolean
	){
		payBooking(
	 		_id: $_id
	 		isPaid: $isPaid
		){
			_id
			isPaid
			updatedAt
		}
	}
`
const COMPLETE_BOOKING = gql`
	mutation(
		$_id: ID!
		$isCompleted: Boolean
	){
		completeBooking(
	 		_id: $_id
	 		isCompleted: $isCompleted
		){
			_id
			isCompleted
			updatedAt
		}
	}
`
const ARCHIVE_BOOKING = gql`
	mutation(
		$_id: ID!
		$isArchived: Boolean
	){
		archiveBooking(
	 		_id: $_id
	 		isArchived: $isArchived
		){
			_id
			isArchived
			updatedAt
		}
	}
`
const PENDING_BOOKING = gql`
	mutation(
		$_id: ID!
	){
		pendingBooking(
	 		_id: $_id
		){
			_id
			statusId{
				_id
				name
			}
			updatedAt
		}
	}
`
const APPROVE_BOOKING = gql`
	mutation(
		$_id: ID!
	){
		approveBooking(
	 		_id: $_id
		){
			_id
			statusId{
				_id
				name
			}
			updatedAt
		}
	}
`
const DECLINE_BOOKING = gql`
	mutation(
		$_id: ID!
	){
		declineBooking(
	 		_id: $_id
		){
			_id
			statusId{
				_id
				name
			}
			updatedAt
		}
	}
`
const DELETE_BOOKING = gql`
	mutation(
		$_id: ID!
	){
		deleteBooking(
	 		_id: $_id
		){
			_id
			updatedAt
		}
	}
`
//----------L O C A T I O N S------------
const CREATE_LOCATION = gql`
	mutation(
		$name: String!
	){
		createLocation(
			name: $name
		){
			_id
			name
			isArchived
			createdAt
			updatedAt
		}
	}
`
const UPDATE_LOCATION = gql`
	mutation(
		$_id: ID!
		$name: String
		$isArchived: Boolean
	){
		updateLocation(
			_id: $_id
			name: $name
			isArchived: $isArchived
		){
			_id
			name
			isArchived
			createdAt
			updatedAt
		}
	}
`
const ARCHIVE_LOCATION = gql`
	mutation(
		$_id: ID!
		$isArchived: Boolean
	){
		archiveLocation(
	 		_id: $_id
	 		isArchived: $isArchived
		){
			_id
			isArchived
			updatedAt
		}
	}
`
const DELETE_LOCATION = gql`
	mutation(
		$_id: ID!
	){
		deleteLocation(
	 		_id: $_id
		){
			_id
			updatedAt
		}
	}
`
//----------B U I L D I N G S------------
const CREATE_BUILDING = gql`
	mutation(
		$name: String!
		$locationId: ID
	){
		createBuilding(
			name: $name
			locationId: $locationId
		){
			_id
			name
			isArchived
			locationId{
				_id
				name
			}
			createdAt
			updatedAt
		}
	}
`
const UPDATE_BUILDING = gql`
	mutation(
		$_id: ID!
		$name: String
		$isArchived: Boolean
	){
		updateBuilding(
			_id: $_id
			name: $name
			isArchived: $isArchived
		){
			_id
			name
			isArchived
			createdAt
			updatedAt
		}
	}
`
const ARCHIVE_BUILDING = gql`
	mutation(
		$_id: ID!
		$isArchived: Boolean
	){
		archiveBuilding(
	 		_id: $_id
	 		isArchived: $isArchived
		){
			_id
			isArchived
			updatedAt
		}
	}
`
const DELETE_BUILDING = gql`
	mutation(
		$_id: ID!
	){
		deleteBuilding(
	 		_id: $_id
		){
			_id
			updatedAt
		}
	}
`
//-----------P A R K I N G S-------------
const CREATE_PARKING = gql`
	mutation(
		$name: String!
		$locationId: ID
		$buildingId: ID
	){
		createParking(
			name: $name
			locationId:	$locationId
			buildingId:	$buildingId
		){
			_id
			name
			isArchived
			locationId{
				_id
				name
			}
			buildingId{
				_id
				name
			}
			createdAt
			updatedAt
		}
	}
`
const UPDATE_PARKING = gql`
	mutation(
		$_id: ID!
		$name: String
		$isArchived: Boolean
	){
		updateParking(
			_id: $_id
			name: $name
			isArchived: $isArchived
		){
			_id
			name
			isArchived
			locationId{
				_id
				name
			}
			buildingId{
				_id
				name
			}
			createdAt
			updatedAt
		}
	}
`
const ARCHIVE_PARKING = gql`
	mutation(
		$_id: ID!
		$isArchived: Boolean
	){
		archiveParking(
	 		_id: $_id
	 		isArchived: $isArchived
		){
			_id
			isArchived
			updatedAt
		}
	}
`
const DELETE_PARKING = gql`
	mutation(
		$_id: ID!
	){
		deleteParking(
	 		_id: $_id
		){
			_id
			updatedAt
		}
	}
`
const STRIPE_PAYMENT = gql`
	mutation(
		$token: String,
		$amount: Int
	){
		stripePayment(
			token: $token
			amount: $amount
		){
			response
		}
	}
`
//-----------S T A T U S E S-------------

export {
	//--------------U S E R S----------------
	LOGIN_MUTATION,
	CREATE_USER,
	UPDATE_USER,
	ARCHIVE_USER,
	DELETE_USER,
	//-----------B O O K I N G S-------------
	CREATE_BOOKING,
	PAY_BOOKING,
	COMPLETE_BOOKING,
	ARCHIVE_BOOKING,
	PENDING_BOOKING,
	APPROVE_BOOKING,
	DECLINE_BOOKING,
	DELETE_BOOKING,
	//----------L O C A T I O N S------------
	CREATE_LOCATION,
	UPDATE_LOCATION,
	ARCHIVE_LOCATION,
	DELETE_LOCATION,
	//----------B U I L D I N G S------------
	CREATE_BUILDING,
	UPDATE_BUILDING,
	ARCHIVE_BUILDING,
	DELETE_BUILDING,
	//-----------P A R K I N G S-------------
	CREATE_PARKING,
	UPDATE_PARKING,
	ARCHIVE_PARKING,
	DELETE_PARKING,
	//-----------S T A T U S E S-------------
	//-------S T R I P  P A Y M E N T--------
	STRIPE_PAYMENT
};
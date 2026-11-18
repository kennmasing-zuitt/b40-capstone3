import gql from 'graphql-tag';

//--------------U S E R S----------------
const GET_USERS = gql`
	{
		users{
			 _id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
const GET_USERS_BY_ROLE_ID = gql`
	query(
		$limit: Int
		$skip: Int
		$roleId: Int
		$isArchived: Boolean
	){
		usersByRoleId(
			limit: $limit
			skip: $skip
			roleId: $roleId
			isArchived: $isArchived
		){
			total
			 _id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
const GET_USER = gql`
	query(
		$_id: ID!
	){
		user(
			_id: $_id
		){
			_id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
const GET_CURRENT_USER = gql`
	query(
		$_id: ID!
	){
		userCurrent(
			_id: $_id
		){
			 _id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
//-----------B O O K I N G S-------------
const GET_BOOKINGS = gql`
	query(
		$limit: Int
		$skip: Int
		$userId: ID
		$statusId: ID
		$locationId: ID
		$buildingId: ID
		$parkingId: ID
		$isPaid: Boolean
		$isCompleted: Boolean
		$isArchived: Boolean
	){
		bookings(
			limit: $limit
			skip: $skip
			userId: $userId
			statusId: $statusId
			locationId: $locationId
			buildingId: $buildingId
			parkingId: $parkingId
			isPaid: $isPaid
			isCompleted: $isCompleted
			isArchived: $isArchived
		){
			total
			_id
			userId{
			firstName
			lastName
			username
			email
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
			isPaid
			isCompleted
			isArchived
			startDate
			endDate
			schedule
			amount
		}
	}
`
const GET_BOOKINGS_BY_PARKING = gql`
	query(
		$parkingId: ID
	){
		bookingsByParking(
			parkingId: $parkingId
		){
			total
	     	_id
		    userId{
		      firstName
		      lastName
		      username
		      email
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
		    isPaid
		    isCompleted
		    isArchived
		    startDate
		    endDate
		    schedule
		    amount
		}
	}
`
const GET_TOTAL_BOOKINGS = gql`
	{
		bookings{
			total
		}
	}
`
const GET_BOOKINGS_BY_USER = gql`
	query(
		$userId: ID
		$limit: Int
		$skip: Int
		$statusId: ID
		$locationId: ID
		$buildingId: ID
		$parkingId: ID
		$isPaid: Boolean
		$isCompleted: Boolean
		$isArchived: Boolean
		){
	  userBookings(
	  	userId: $userId
	  	limit: $limit
		skip: $skip
		statusId: $statusId
		locationId: $locationId
		buildingId: $buildingId
		parkingId: $parkingId
		isPaid: $isPaid
		isCompleted: $isCompleted
		isArchived: $isArchived
	  ){
	  		total
	     	_id
		    userId{
		      firstName
		      lastName
		      username
		      email
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
		    isPaid
		    isCompleted
		    isArchived
		    startDate
		    endDate
		    schedule
		    amount
	  }
	}
`
const GET_BOOKING = gql`
	query($_id: ID!){
	  booking(_id: $_id){
     	_id
	    userId{
	      firstName
	      lastName
	      username
	      email
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
	    isPaid
	    isCompleted
	    isArchived
	    startDate
	    endDate
	    schedule
	    amount
	  }
	}
`
//----------L O C A T I O N S------------
const GET_LOCATIONS = gql`
	query(
		$isArchived: Boolean
		$limit: Int
		$skip: Int
	){
		locations(
			isArchived: $isArchived
			limit: $limit
			skip: $skip
		) {
			total
			_id
			name
			isArchived
		}
	}
`
const GET_TOTAL_LOCATIONS = gql`
	{
		locations{
			total
		}
	}
`
const GET_LOCATION = gql`
	query($_id: ID!){
		location(
			_id: $_id
		){
			_id
			name
			isArchived
		}
	}
`
//----------B U I L D I N G S------------
const GET_BUILDINGS = gql`
	query(
		$isArchived: Boolean
		$limit: Int
		$skip: Int
	){
		buildings(
			isArchived: $isArchived
			limit: $limit
			skip: $skip
		){
			total
			_id
			name
			isArchived
			locationId{
				_id
				name
			}
		}
	}
`
const GET_TOTAL_BUILDINGS = gql`
	{
		buildings{
			total
		}
	}
`
const GET_BUILDINGS_BY_LOCATION = gql`
		query(
			$locationId: ID
			$isArchived: Boolean
			$limit: Int
			$skip: Int
		){
			buildingsLocation(
				locationId: $locationId
				isArchived: $isArchived
				limit: $limit
				skip: $skip
			){
				total
				_id
				name
				isArchived
				locationId{
					_id
					name
				}
			}
		}
`
const GET_BUILDING = gql`
	query($_id: ID!){
		building(
			_id: $_id
		){
			_id
			name
			isArchived
			locationId{
				_id
				name
			}
		}
	}
`
//-----------P A R K I N G S-------------
const GET_PARKINGS = gql`
	query(
		$isArchived: Boolean
		$limit: Int
		$skip: Int
	){
		parkings(
			isArchived: $isArchived
			limit: $limit
			skip: $skip
		){
			total
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
		}
	}
`
const GET_TOTAL_PARKINGS = gql`
	{
		parkings{
			total
		}
	}
`
const GET_PARKINGS_BY_BUILDING = gql`
		query(
			$buildingId: ID
			$isArchived: Boolean
			$limit: Int
			$skip: Int
		){
			parkingsBuilding(
				buildingId: $buildingId
				isArchived: $isArchived
				limit: $limit
				skip: $skip
			){
				total
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
			}
		}
`
const GET_PARKING = gql`
	query($_id: ID!){
		parking(
			_id: $_id
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
		}
	}
`
const MY_QUERY = gql`
  query WillFail {
    badField
    goodField
  }
`;
//-----------S T A T U S E S-------------

export {
	//--------------U S E R S----------------
	GET_USERS,
	GET_USER,
	GET_USERS_BY_ROLE_ID,
	GET_CURRENT_USER,
	//-----------B O O K I N G S-------------
	GET_BOOKINGS,
	GET_BOOKINGS_BY_PARKING,
	GET_BOOKINGS_BY_USER,
	GET_BOOKING,
	GET_TOTAL_BOOKINGS,
	//----------L O C A T I O N S------------
	GET_LOCATIONS,
	GET_LOCATION,
	GET_TOTAL_LOCATIONS,
	//----------B U I L D I N G S------------
	GET_BUILDINGS,
	GET_TOTAL_BUILDINGS,
	GET_BUILDINGS_BY_LOCATION,
	GET_BUILDING,
	//-----------P A R K I N G S-------------
	GET_PARKINGS,
	GET_PARKINGS_BY_BUILDING,
	GET_PARKING,
	GET_TOTAL_PARKINGS,
	//-----------S T A T U S E S-------------
	MY_QUERY,
};
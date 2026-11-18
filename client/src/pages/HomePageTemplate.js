import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

import BookingPage from '../pages/BookingPage';
import HomePage01 from '../pages/HomePage01';
// import HomePage02 from '../pages/HomePage02';
import HomePage03 from '../pages/HomePage03';
import FooterPage from '../pages/FooterPage';

import BookingTable from '../tables/BookingTable';
import BookingModal from '../modals/BookingModal';
import BookingForm from '../forms/BookingForm';

import { useQuery, useMutation } from '@apollo/react-hooks';

import {
	GET_BOOKINGS,
	GET_BOOKING,
	GET_LOCATIONS,
	GET_BUILDINGS_BY_LOCATION,
	GET_PARKINGS_BY_BUILDING,
	GET_BOOKINGS_BY_PARKING
} from '../graphql/queries';
import {
	CREATE_BOOKING,
	PAY_BOOKING
	// COMPLETE_BOOKING,
	// ARCHIVE_BOOKING,
	// PENDING_BOOKING,
	// APPROVE_BOOKING,
	// DECLINE_BOOKING,
	// DELETE_BOOKING
} from '../graphql/mutations';

const HomePage = (props) => {

	// console.log("PROPS ROLE ID AFTER LOGIN", props.roleId)

	const [bookingDataId, setBookingDataId] = useState({
		locationId: null,
		buildingId: null,
		parkingId: null
	})

	const { locationId, buildingId, parkingId } = bookingDataId

	// const [arrayData, setArrayData] = useState({
	// 	locations: [],
	// 	buildings: [],
	// 	parkings: [],
	// 	bookings: []
	// })

	// const { locations, buildings, parkings, bookings } = arrayData

	// const [locations, setLocations] = useState([])

	const [arrayData, setArrayData] = useState({
		locations: [],
		buildings: [],
		parkings: [],
		bookings: []
	})

	const { locations, buildings, parkings, bookings } = arrayData

	const {
		error: locationsError,
		loading: locationsLoading,
		data: locationsQuery,
		refetch: refetchLocations
	} = useQuery(GET_LOCATIONS)

	console.log("USE QUERY LOCATIONS", locationsQuery && locationsQuery.locations)

	const {
		error: buildingsError,
		loading: buildingsLoading,
		data: buildingsQuery,
		refetch: refetchBuildings
	} = useQuery(GET_BUILDINGS_BY_LOCATION, {
		variables: { locationId: locationId ? locationId : "" }
	})
	// SAMPLE ID 5e9c4ba120697d3b8cd514cc

	const {
		error: parkingsError,
		loading: parkingsLoading,
		data: parkingsQuery, 
		refetch: refetchParkings 
	} = useQuery(GET_PARKINGS_BY_BUILDING, {
		variables: { buildingId: buildingId ? buildingId : "" }
	})
	// SAMPLE ID 5e9c4ba820697d3b8cd514cd

	const {
		error: bookingsError,
		loading: bookingsLoading, 
		data: bookingsQuery, 
		refetch: refetchBookings 
	} = useQuery(GET_BOOKINGS_BY_PARKING, {
		variables: {
			parkingId: parkingId ? parkingId : ""
		}
	})

	const [ createBooking ] = useMutation(CREATE_BOOKING)

	useEffect(() => {
		setArrayData({
			...arrayData,
			locations: locationsQuery ? locationsQuery.locations : []
		})
	}, [props])

	console.log("USE EFFECT LOCATIONS SET", locations)

	useEffect(() => {
		setArrayData({
			...arrayData,
			buildings: buildingsQuery ? buildingsQuery.buildingsLocation : []
		})
	}, [locationId])

	console.log("USE EFFECT BUILDINGS", buildings)

	// useEffect(() => {
	// 	setArrayData({
	// 		...arrayData,
	// 		parkings: parkingsQuery ? parkingsQuery.parkingsBuilding : []
	// 	})
	// }, [buildingId])


	// useEffect(() => {
	// 	setArrayData({
	// 		...arrayData,
	// 		bookings: bookingsQuery ? bookingsQuery.bookingsByParking : []
	// 	})
	// }, [parkingId])


	// useEffect(() => {
	// 	setLocations(locationsQuery && locationsQuery.locations)
	// }, [locationsQuery])
	// console.log("USE EFFECT LOCATIONS", locations)

	// useEffect(() => {
	// 	setBuildings(buildingsQuery && buildingsQuery.buildings)
	// }, [buildingsQuery])
	// console.log("USE EFFECT BUILDINGS", buildings)

	// useEffect(() => {
	// 	setParkings(parkingsQuery && parkingsQuery.parkings)
	// }, [parkingsQuery])
	// console.log("USE EFFECT PARKINGS", parkings)

	// useEffect(() => {
	// 	setBookings(bookingsQuery && bookingsQuery.bookings)
	// }, [bookingsQuery])
	// console.log("USE EFFECT BOOKINGS", bookings)

	// useEffect( async () => {
	// 	await setBookingDataId({
	// 		...bookingDataId,
	// 		locationId: locationId
	// 	})

	// 	setArrayData({
	// 		...arrayData,
	// 		buildings: buildingsQuery ? buildingsQuery.buildingsLocation : []
	// 	})

	// }, [locationId])


	// useEffect( async () => {
	// 	await setBookingDataId({
	// 		...bookingDataId,
	// 		buildingId: buildingId
	// 	})

	// 	setArrayData({
	// 		...arrayData,
	// 		parkings: parkingsQuery ? parkingsQuery.parkingsBuilding : []
	// 	})

	// }, [buildingId])

	// useEffect( async () => {
	// 	await setBookingDataId({
	// 		...bookingDataId,
	// 		parkingId: parkingId
	// 	})

	// 	setArrayData({
	// 		...arrayData,
	// 		bookings: bookingsQuery ? bookingsQuery.bookingsByParking : []
	// 	})
	// }, [parkingId])


	if(locationsLoading) return "..loading"
	if(locationsError) return <p>{locationsError.message}</p>
	if(buildingsLoading) return "..loading"
	if(buildingsError) return <p>{buildingsError.message}</p>
	if(parkingsLoading) return "..loading"
	if(parkingsError) return <p>{parkingsError.message}</p>
	if(bookingsLoading) return "..loading"
	if(bookingsError) return <p>{bookingsError.message}</p>

//---------MOBILE DESKTOP-----------
let homeMobile = ""
if(props.roleId === 1 || props.roleId === 2) {
	homeMobile = (
		<BookingPage token={props.token} roleId={props.roleId}/>
	)
} else if(props.roleId === 3) {
	homeMobile = (
			<Fragment>
				<div className="login-vh home-bg-img no-gutters mt-n5">
					{/* HOME 01 MOBILE */}
					<div className="col-12 d-flex justify-content-center align-items-center no-gutters landing-mobile">
						<Col className="col-12 no-gutters landing-mobile mt-n5">
				        		<div className="d-flex justify-content-center align-items-center landing-mobile">
									<BookingForm
										userId={props.userId}
										token={props.token}
										roleId={props.roleId}
										locations={locations}
										buildings={buildings}
										parkings={parkings}
										bookings={bookings}

										// setBuildings={setBuildings}
										// setParkings={setParkings}
										// setBookings={setBookings}

										refetchLocations={refetchLocations}
										refetchBuildings={refetchBuildings}
										refetchParkings={refetchParkings}
										refetchBookings={refetchBookings}

										createBooking={createBooking}

										locationId={locationId}
										buildingId={buildingId}
										parkingId={parkingId}

										bookingDataId={bookingDataId}
										setBookingDataId={setBookingDataId}

										// arrayData={arrayData}
										// setArrayData={setArrayData}

									/>
								</div>
						</Col>
					</div>
					{/* HOME 01 DESKTOP*/}
					<div className="d-flex justify-content-center align-items-center landing-vh no-gutters landing-desktop">
						<Col className="col-6 mt-n5 d-flex justify-content-center align-items-center header-left landing-desktop">
							<div className="ml-5 landing-desktop">
				        		<h1 className="header-text-01 text-white no-gutters landing-desktop" >BIKE TO</h1>
				        		<h1 className="header-text-01 text-white no-gutters mt-n5 landing-desktop" >WORK.</h1>
				        		<h3 className="text-white ml-2 mt-n4 hdr-subtitle landing-desktop" >S K I P   &nbsp; &nbsp;T H E   &nbsp; &nbsp;C A R.</h3>
				        	</div>
						</Col>
						<Col className="col-6 d-flex justify-content-center align-items-end landing-desktop">
							<div className="landing-desktop">
				        		<div className="landing-desktop">
									<BookingForm
										userId={props.userId}
										token={props.token}
										roleId={props.roleId}
										locations={locations}
										buildings={buildings}
										parkings={parkings}
										bookings={bookings}

										// setBuildings={setBuildings}
										// setParkings={setParkings}
										// setBookings={setBookings}

										refetchLocations={refetchLocations}
										refetchBuildings={refetchBuildings}
										refetchParkings={refetchParkings}
										refetchBookings={refetchBookings}

										locationId={locationId}
										buildingId={buildingId}
										parkingId={parkingId}

										createBooking={createBooking}

										bookingDataId={bookingDataId}
										setBookingDataId={setBookingDataId}

										// arrayData={arrayData}
										// setArrayData={setArrayData}
									/>
								</div>
				        	</div>
						</Col>
					</div>
				</div>

				<div className="cards">
					<div className="col-12 landing-mobile">
							<HomePage01 />
					</div>
					<div className="col-12 landing-desktop">
							<HomePage01 />
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-center mt-n5 bg-home03">
					<div className="col-10 landing-mobile">
			        	<HomePage03 />
					</div>
					<div className="col-10 landing-desktop">
			        	<HomePage03 />
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-center bg-primary no-gutters">
						<FooterPage />
				</div>
			</Fragment>
	)
	// homeMobile = (
	// 	<h1>BOOKING FORM PAGE</h1>
	// )
}


	return (
		<Fragment>
			{ homeMobile }
		</Fragment>
	)
}

export default HomePage;

import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

import BookingPage from '../pages/BookingPage';
import HomePage01 from '../pages/HomePage01';
import HomePage03 from '../pages/HomePage03';
import FooterPage from '../pages/FooterPage';

import BookingTable from '../tables/BookingTable';
import BookingModal from '../modals/BookingModal';
import BookingFormREST from '../forms/BookingFormREST';

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
	CREATE_BOOKING
} from '../graphql/mutations';


const NewBookingPage = (props) => {
	
	//---------------- STATES ------------------
	const [bookingDataId, setBookingDataId] = useState({
		locationId: null,
		buildingId: null,
		parkingId: null
	})

	const { locationId, buildingId, parkingId } = bookingDataId

	const [arrayData, setArrayData] = useState({
		locations: [],
		buildings: [],
		parkings: [],
		bookings: []
	})

	const { locations, buildings, parkings, bookings } = arrayData



	//------------------LOCATIONS---------------------
	const {
		error: locationsError,
		loading: locationsLoading,
		data: locationsQuery,
		refetch: refetchLocations
	} = useQuery(GET_LOCATIONS, {
			variables: {
				isArchived: false
			}
	})

	useEffect(() => {
		setArrayData({
			...arrayData,
			locations: locationsQuery && locationsQuery.locations
		})
	}, [locationsQuery])

	// console.log("LOCATIONS ADMIN FORM", locations)

  	//------------------BUILDINGS---------------------
  	const {
  		error: buildingsError,
  		loading: buildingsLoading,
  		data: buildingsQuery,
  		refetch: refetchBuildings
  	} = useQuery(GET_BUILDINGS_BY_LOCATION, {
  		variables: {
  			locationId: locationId,
  			isArchived: false
  		}
  	})

  	useEffect(() => {
  		setArrayData({
  			...arrayData,
  			buildings: buildingsQuery && buildingsQuery.buildingsLocation
  		})
  	}, [buildingsQuery])

	// console.log("BUILDINGS ADMIN FORM", buildings)

  	//------------------PARKINGS---------------------
  	const {
  		error: parkingsError,
  		loading: parkingsLoading,
  		data: parkingsQuery,
  		refetch: refetchParkings
  	} = useQuery(GET_PARKINGS_BY_BUILDING, {
  		variables: {
  			buildingId: buildingId,
  			isArchived: false
  		}
  	})

  	useEffect(() => {
  		setArrayData({
  			...arrayData,
  			parkings: parkingsQuery && parkingsQuery.parkingsBuilding
  		})
  	}, [parkingsQuery])

  	// console.log("PARKINGS ADMIN FORM", parkings)

	//------------------BOOKINGS---------------------
	const {
		error: bookingsError,
		loading: bookingsLoading,
		data: bookingsQuery,
		refetch: refetchBookings
	} = useQuery(GET_BOOKINGS_BY_PARKING, {
		variables: {
			parkingId: parkingId,
			isArchived: false
		}
	})

	useEffect(() => {
		setArrayData({
			...arrayData,
			bookings: bookingsQuery && bookingsQuery.bookingsByParking
		})
	}, [bookingsQuery])

	// console.log("BOOKINGS ADMIN FORM", bookings)

	//-----------------CREATE BOOKING----------------
	const [ createBooking ] = useMutation(CREATE_BOOKING)


	if(locationsLoading) return <Spinner color="primary"/>
	if(locationsError) return <p>{locationsError.message}</p>

	// if(buildingsLoading) return <Spinner color="primary"/>
	if(buildingsError) return <p>{buildingsError.message}</p>

	// if(parkingsLoading) return <Spinner color="primary"/>
	if(parkingsError) return <p>{parkingsError.message}</p>

	// if(bookingsLoading) return <Spinner color="primary"/>
	if(bookingsError) return <p>{bookingsError.message}</p>


	//---------MOBILE DESKTOP-----------
	let homeMobile = ""
	if(props.roleId == 3) {
		homeMobile = (
			<BookingPage
				token={props.token}
				roleId={props.roleId}
				setLoading={props.setLoading}
				currentUser={props.currentUser}
				userId={props.userId}
				/>
		)
	} else if(props.roleId == 1 || props.roleId == 2) {
		homeMobile = (
				<Fragment>
					<div className="login-vh home-bg-img no-gutters mt-n5">
						{/* HOME 01 MOBILE */}
						<div className="col-12 d-flex justify-content-center align-items-center no-gutters landing-mobile">
							<Col className="col-12 no-gutters landing-mobile mt-n5">
					        		<div className="d-flex justify-content-center align-items-center landing-mobile">
										<BookingFormREST
											token={props.token}
											userId={props.userId}
											roleId={props.roleId}
											locations={locations}
											buildings={buildings}
											parkings={parkings}
											bookings={bookings}
											refetchBuildings={refetchBuildings}
											bookingDataId={bookingDataId}
											setBookingDataId={setBookingDataId}
											createBooking={createBooking}
											setLoading={props.setLoading}

											locationsLoading={locationsLoading}
											buildingsLoading={buildingsLoading}
											parkingsLoading={parkingsLoading}
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
										<BookingFormREST
											token={props.token}
											userId={props.userId}
											roleId={props.roleId}
											locations={locations}
											buildings={buildings}
											parkings={parkings}
											bookings={bookings}
											refetchBuildings={refetchBuildings}
											bookingDataId={bookingDataId}
											setBookingDataId={setBookingDataId}
											createBooking={createBooking}
											setLoading={props.setLoading}

											locationsLoading={locationsLoading}
											buildingsLoading={buildingsLoading}
											parkingsLoading={parkingsLoading}
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
	}

	return (
		<Fragment>
			{ homeMobile }
		</Fragment>
	)
}

export default NewBookingPage;
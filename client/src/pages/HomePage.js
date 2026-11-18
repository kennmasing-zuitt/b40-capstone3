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
	CREATE_BOOKING
} from '../graphql/mutations';

const HomePage = (props) => {

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

	const {
		error: locationsError,
		loading: locationsLoading,
		data: locationsQuery,
		refetch: refetchLocations
	} = useQuery(GET_LOCATIONS)

	console.log("USE QUERY LOCATIONS", locationsQuery && locationsQuery.locations)

	useEffect(() => {
		setArrayData({
			...arrayData,
			locations: locationsQuery && locationsQuery.locations
		})
	}, [locationsQuery])

	console.log("USE EFFECT LOCATIONS", locations)

	const [ createBooking ] = useMutation(CREATE_BOOKING)

	if(locationsLoading) return "..loading"
	if(locationsError) return <p>{locationsError.message}</p>

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
										locations={locations}
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

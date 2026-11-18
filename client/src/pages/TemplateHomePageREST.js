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
import BookingFormREST from '../forms/BookingFormREST';

const HomePage = (props) => {
	
	//----------------USER HOME PAGE------------------

	//------------------LOCATIONS---------------------
	const [locationsData, setLocationsData] = useState({
		token: props.token,
		locations: []
	})
	const { token, locations } = locationsData;
	const config = {
		headers: {
			'Authorization' : `Bearer ${token}`
		}
	}
  	// const url = "http://localhost:8000"
  	const getLocations = async () => {
  		try {
  			const res = await axios.get(`${URL}/locations`, config)
  			return setLocationsData({
  				...locationsData,
  				locations: res.data
  			})
  		} catch(e) {
  			console.log(e.response)
  		}
  	}
  	useEffect(() => {
  		getLocations()
  	}, [props])

  	//------------------BUILDINGS---------------------
	const [buildingsData, setBuildingsData] = useState({
		token: props.token,
		buildings: []
	})
	const { buildings } = buildingsData;
  	const getBuildings = async (id) => {
  		try {
  			const res = await axios.get(`${URL}/buildings${id}`, config)
  			return setBuildingsData({
  				...buildingsData,
  				buildings: res.data
  			})
  		} catch(e) {
  			console.log(e.response)
  		}
  	}

  	//------------------PARKINGS---------------------
	const [parkingsData, setParkingsData] = useState({
		token: props.token,
		parkings: []
	})
	const { parkings } = parkingsData;
  	const getParkings = async (id) => {
  		console.log("BUILDING ID IN PARKING", id)
  		try {
  			const res = await axios.get(`${URL}/parkings${id}`, config)
  			return setParkingsData({
  				...parkingsData,
  				parkings: res.data
  			})
  		} catch(e) {
  			console.log(e.response)
  		}
  	}

	//---------------ADMIN HOME PAGE------------------
	const [bookingsData, setBookingsData] = useState({
		token: props.token,
		bookings: []
	})
	const { bookings } = bookingsData;
	const getBookings = async (id) => {
		console.log("PARKING ID IN BOOKING", id)
		try {
			const res = await axios.get(`${URL}/bookings${id}/parking`, config)
			console.log("bookings RESPONSE", res)
			return setBookingsData({
				...bookingsData,
				bookings: res.data})
			console.log("bookings DATA from PARKING", bookings)
		} catch(e) {
			console.log(e.response)
		}
	}
	
  	//--------------DISABLE PARKINGS-----------------
	const [parkingData, setParkingData] = useState({
	  parking: {}
	})
	const { parking } = parkingData;
	const getParking = async () => {
	  try {
	    const res = await axios.get(`${URL}/parkings/${props.match.params.id}`, config)
	    setParkingData({
	      ...parkingData,
	      parking: res.data
	    })
	  } catch(e) {
	    console.log(e.response)
	  }
	}

   	const disableParking = async (id, updates) => {
   		try {
   			config.headers["Content-Type"] = "application/json";
   			const body = JSON.stringify(updates);
   			const res = await axios.patch(`${URL}/parkings/${id}/disable`)
   		} catch(e) {
   			console.log(e)
   		}
   	}

   	//------------END OF USER HOME PAGE---------------
  	const updateBooking = async (id, updates) => {
		try {
			const config = {
				headers: {
					"Content-Type" : "application/json"
				}
			}
			const body = JSON.stringify(updates);
			const res = await axios.patch(`${URL}/bookings/${id}/parking`, body, config)
			console.log("UPDATE BOOKING", res)
			getBookings()
		} catch(e) {
			console.log(e)
		}
	}

//CREATE BOOKING
	const createBooking = async (newBooking, sched) => {
		try {
			config.headers["Content-Type"] = "application/json"; //body
			const body = JSON.stringify(newBooking);
			const res = await axios.post(`${URL}/bookings`, body, config)
			getBookings()
			//SWAL
			Swal.fire({
				title: "Successful booking!",
				text: sched,
				icon: "success",
				showConfirmationButton: false,
				timer: 3000
			})
		} catch(e) {
			console.log(e)
		}
	}

//---------MOBILE DESKTOP-----------
let homeMobile = ""
if(props.roleId == 1 || props.roleId == 2) {
	homeMobile = (
		<BookingPage
			token={props.token}
			roleId={props.roleId}
			setLoading={props.setLoading}
			currentUser={props.currentUser}
			userId={props.userId}
			/>
	)
} else if(props.roleId == 3) {
	homeMobile = (
			<Fragment>
				<div className="login-vh home-bg-img no-gutters mt-n5">
					{/* HOME 01 MOBILE */}
					<div className="col-12 d-flex justify-content-center align-items-center no-gutters landing-mobile">
						<Col className="col-12 no-gutters landing-mobile mt-n5">
				        		<div className="d-flex justify-content-center align-items-center landing-mobile">
									<BookingFormREST
										token={props.token}
										roleId={props.roleId}
										locations={locations}
										buildings={buildings}
										parkings={parkings}
										bookings={bookings}
										getBuildings={getBuildings}
										getParkings={getParkings}
										updateBooking={updateBooking}
										getBookings={getBookings}										
										disableParking={disableParking}
										createBooking={createBooking}
										setLoading={props.setLoading}
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
										roleId={props.roleId}
										locations={locations}
										buildings={buildings}
										parkings={parkings}
										bookings={bookings}
										getBuildings={getBuildings}
										getParkings={getParkings}
										updateBooking={updateBooking}
										getBookings={getBookings}										
										disableParking={disableParking}
										createBooking={createBooking}
										setLoading={props.setLoading}
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

export default HomePage;
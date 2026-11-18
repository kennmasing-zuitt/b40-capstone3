import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { URL } from '../config';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getDay, addDays, setHours, setMinutes } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

import DateForm from './DateForm'

const BookingFormREST = (props) => {

	const [bookingFormData, setBookingFormData] = useState({
		userId: props.userId,
		locationId: null,
		buildingId: null,
		parkingId: null,
		startDate: null,
		endDate: null,
		amount: null
	})

	const { locationId, buildingId, parkingId, startDate, endDate, amount } = bookingFormData

	const [arrayData, setArrayData] = useState({
		locations: [],
		buildings: [],
		parkings: [],
		bookings: [],
		dateSelector: "1"
	})

	const { locations, buildings, parkings, bookings, dateSelector } = arrayData

	const [ isRedirected, setIsRedirected ] = useState(false);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ disabledBuilding, setDisabledBuilding ] = useState(true);
	const [ disabledParking, setDisabledParking ] = useState(true);
	const [ disabledDate, setDisabledDate ] = useState(true);
	const [ disabledRefreshBtn, setDisabledRefreshBtn ] = useState(false)

	useEffect(() => {
		setArrayData({
			...arrayData,
			locations: props.locations ? props.locations : [],
			buildings: props.buildings ? props.buildings : [],
			parkings: props.parkings ? props.parkings : [],
			bookings: props.bookings ? props.bookings : []
		})
	}, [props])

	useEffect(() => {
		if(locations.length != 0){
			setDisabledRefreshBtn(true)
		}
	}, [locations])

  	const populateLocations = () => {
  		return locations.map(location => {			
	  			return (
	  				<option
	  					key={location._id}
	  					value={location._id}
	  					selected={locationId ? location._id : null}
	  				>
	  				{location.name.toUpperCase()}
	  				</option>
				)
  		})
  	}

  	const populateBuildings = () => {
  		return buildings.map(building => {				
	  			return (
	  				<option
	  					key={building._id}
	  					value={building._id}
	  					selected={buildingId ? building._id : null}
	  				>
	  				{building.name.toUpperCase()}
	  				</option>
				)
  		})
  	}

  	const populateParkings = () => {
  		return parkings.map(parking => {		
	  			return (
	  				<option
	  					key={parking._id}
	  					value={parking._id}
	  					selected={parkingId ? parking._id : null}
	  				>
	  				{parking.name.toUpperCase()} - {parking.buildingId.name.charAt(0).toUpperCase()}{parking.buildingId.name.charAt(1).toUpperCase()}{parking.buildingId.name.charAt(2).toUpperCase()}
	  				</option>
				)
  		})
  	}

  	useEffect(() => {
  		props.setBookingDataId({
  			...props.bookingDataId,
  			locationId: locationId
  		})
  	}, [locationId])

  	useEffect(() => {
  		props.setBookingDataId({
  			...props.bookingDataId,
  			buildingId: buildingId
  		})
  	}, [buildingId])

  	useEffect(() => {
  		props.setBookingDataId({
  			...props.bookingDataId,
  			parkingId: parkingId
  		})
  	}, [parkingId])

  	//--------------------------- DATE PICKER ------------------------------

	const [bookingHours, setBookingHours] = useState([]);
	const [newBookingHours, setNewBookingHours] = useState([]);

	useEffect(() => {
		setBookingHours([
	        setHours(setMinutes(startDate, 0), 6),
	        setHours(setMinutes(startDate, 0), 7),
	        setHours(setMinutes(startDate, 0), 8),
	        setHours(setMinutes(startDate, 0), 9),
	        setHours(setMinutes(startDate, 0), 10),
	        setHours(setMinutes(startDate, 0), 11),
	        setHours(setMinutes(startDate, 0), 12),
	        setHours(setMinutes(startDate, 0), 13),
	        setHours(setMinutes(startDate, 0), 14),
	        setHours(setMinutes(startDate, 0), 15),
	        setHours(setMinutes(startDate, 0), 16),
	        setHours(setMinutes(startDate, 0), 17),
	        setHours(setMinutes(startDate, 0), 18),
	        setHours(setMinutes(startDate, 0), 19),
	        setHours(setMinutes(startDate, 0), 20),
	        setHours(setMinutes(startDate, 0), 21)
		])
	}, [startDate])

	const isWeekday = date => {
		const day = getDay(date)
		return day !== 0 && day !== 6
	}

  	const [bookingDates, setBookingDates] = useState([])
	
	console.log("BOOKING DATES", bookings.length)

  	// useEffect(() => {
  	// 	const arr = []
  	// 		if(bookings.length > 0){
  	// 			bookings.map(booking => {
  	// 				console.log("BOOKING DATE GET TIME", booking.startDate)
  	// 				const diff = (parseInt(moment(booking.endDate).format('D')) - parseInt(moment(booking.startDate).format('D')))
  	// 				// const startDate = parseInt(moment(booking.startDate).format('D'))
  	// 				// const endDate = parseInt(moment(booking.endDate).format('D'))
  	// 				// const diff = endDate - startDate

  	// 				for(let i = 0; i <= diff; i++){
  	// 					console.log("I++", i)
  	// 					arr.push(addDays(new Date(booking.startDate), i))
  	// 				}
  	// 			})
  	// 		}
  	// 		setBookingDates(arr)
  	// 		console.log("BOOKING DATES", bookingDates)
  	// }, [bookings && bookings])

  	useEffect(() => {
  		const arr = []
  			if(bookings.length > 0) {
	  			bookings.map(booking => {
  					// console.log("START DATE GET TIME", booking.startDate)
  					// console.log("END DATE GET TIME", booking.endDate)

  					if(booking.endDate == null){
  						arr.push(addDays(new Date(booking.startDate),  0))
  					} else {
						let date1 = new Date(booking.startDate)
						let date2 = new Date(booking.endDate)

						let differenceInTime = date2.getTime() - date1.getTime()
						let diff = differenceInTime / (1000 * 3600 * 24)

		  				// const diff = (parseInt(moment(booking.endDate).format('D')) - parseInt(moment(booking.startDate).format('D')))
						for (let i = 0; i <= diff; i++) {
							console.log("I++", i)
							arr.push(addDays(new Date(booking.startDate),  i))
						}
  					}
	  			})
  			}
  			setBookingDates(arr)
  			console.log("BOOKING DATES", bookingDates)
  	}, [bookings])

  	//--------------------------- DATE PICKER ------------------------------
  	let datepicker = ""
  	if(bookings && dateSelector == 1){
  		datepicker = ""
  	} else if(bookings && dateSelector == 2) {
  		datepicker = (
  			<Fragment>
  				<DatePicker
					selected={startDate}
					onChange={date => setBookingFormData({
						...bookingFormData,
						startDate: date
					})}
					selectsStart
					minDate={new Date()}
					startDate={startDate}
					endDate={endDate}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"
  				/>
  			</Fragment>
		)
  	} else if(bookings && dateSelector == 3){

  		datepicker = (
	  		<Fragment>
	  			<DatePicker
					selected={startDate}
					onChange={date => setBookingFormData({
						...bookingFormData,
						startDate: date
					})}
					selectsStart
					minDate={new Date()}
					startDate={startDate}
					endDate={endDate}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"
				/>
				<DatePicker
					selected={endDate}
					onChange={date => setBookingFormData({
						...bookingFormData,
						endDate: date
					})}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
					excludeDates={bookingDates}
					className="container-fluid"
				/>
	  		</Fragment>
		)
  	} else if(!bookings && dateSelector == 1) {
  		datepicker = ""
  	} else if(!bookings && dateSelector == 2) {
  		datepicker = (
   			<Fragment> 			
 				<DatePicker
					selected={startDate}
					onChange={date => setBookingFormData({
						...bookingFormData,
						startDate: date
					})}
					selectsStart
					minDate={new Date()}
					startDate={startDate}
					endDate={endDate}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"
				/>
			</Fragment> 			
		)
  	} else if(!bookings && dateSelector == 3){
  		datepicker = (
  			<Fragment>
			<DatePicker
					selected={startDate}
					onChange={date => setBookingFormData({
						...bookingFormData,
						startDate: date
					})}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					minDate={new Date()}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"
				/>
				<DatePicker
					selected={endDate}
					onChange={date => setBookingFormData({
						...bookingFormData,
						endDate: date
					})}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
					excludeDates={bookingDates}
					className="container-fluid"
				/>
			</Fragment>
		)
  	}

	//--------------------------- BOOKING AMOUNT ------------------------------

	let amountToPay = ""
	if(dateSelector == "2" && startDate != null){
		amountToPay = 5000
	}
	if(dateSelector == "3" && startDate != null && endDate != null){
		let date1 = startDate
		let date2 = endDate

		let differenceInTime = date2.getTime() - date1.getTime()
		let differenceInDays = differenceInTime / (1000 * 3600 * 24)

		let dateFactor = differenceInDays + 1
		
		amountToPay = 50 * parseInt(dateFactor) * 100
	}

	useEffect(() => {
		setBookingFormData({
			...bookingFormData,
			amount: amountToPay
		})
	}, [endDate ? endDate : startDate])


	//--------------------------- HANDLERS ------------------------------
  	const onChangeHandler = (e) => {
  		e.preventDefault()
  		setBookingFormData({
  			...bookingFormData,
  			[e.target.name] : e.target.value,
  		})
  // 		if(props.locationsLoading) return <Spinner color="primary"/>
		// if(props.buildingsLoading) return <Spinner color="primary"/>
		// if(props.parkingsLoading) return <Spinner color="primary"/>
		// if(props.bookingsLoading) return <Spinner color="primary"/>
  		setArrayData({
  			...arrayData,
  			[e.target.name] : e.target.value
  		})
  	}

  	// let d = ""
  	let d1 = ""
  	let d2 = ""
  	let start = ""
  	let end = ""
  	let sched = ""
  	let html = ""

  	if(dateSelector == "3"){		
	  	if(startDate != null && endDate != null){
		  	d1 = new Date(startDate.getTime())
		  	d2 = new Date(endDate.getTime())

		  	// console.log("D1", d1)
		  	// console.log("D2", d2)

		  	start = `${d1.toDateString()}`
		  	end = `${d2.toDateString()}`
	  	}

  		html = `From:  ${start ? start : ""}<br>Until:  ${end ? end : ""}`
  	} else if(dateSelector == "2"){
  		
  		if(startDate != null){
  			d1 = new Date(startDate.getTime())

  			sched = d1.toDateString()
  		}

  		console.log("SCHEDULE", d1)
  		html = `Schedule:  ${sched ? sched : ""}`
  	}

  	const onSubmitHandler = (e) => {
  		e.preventDefault()
  		Swal.fire({
  			icon: "question",
  			title: "Confirm Selected Schedule?",
  			html: html,
  			focusConfirm: false,
  			showCloseButton: true
  		}).then(async (response) => {
  			console.log(response)

  			if(response.value){
  				try {
	  				await props.createBooking({
	  					variables: {...bookingFormData}
	  				})
					Swal.fire({
						title: "Success",
						text: "Booking Created",
						icon: "success",
						showConfirmationButton: false,
						timer: 3000
					})
					setIsRedirected(true)
  				} catch(e) {
  					console.log(e)
  				}
  			}
  		})
  	}

  	// ----------------------------------- DISABLE BUTTONS --------------------------------------
	useEffect(() => {
		if(locationId !== "" && buildingId !== "" && parkingId !== "" && dateSelector == 2 && startDate !== null) {
			setDisabledBtn(false)
		} else {
			setDisabledBtn(true)
		}
	}, [startDate])

	useEffect(() => {
		if(locationId !== "" && buildingId !== "" && parkingId !== "" && dateSelector == 3 && startDate !== null) {
			setDisabledBtn(false)
		} else {
			setDisabledBtn(true)
		}
	}, [endDate])

	useEffect(() => {
		if(locationId !== null) {
			setDisabledBuilding(false)
		} else {
			setDisabledBuilding(true)
		}
	}, [locationId])

	useEffect(() => {
		if(buildingId !== null) {
			setDisabledParking(false)
		} else {
			setDisabledParking(true)
		}
	}, [buildingId])

	useEffect(() => {
		if(parkingId !== null) {
			setDisabledDate(false)
		} else {
			setDisabledDate(true)
		}
	}, [parkingId])

	useEffect(() => {
		if(dateSelector !== "1") {
			setDisabledDate(false)
		} else {
			setDisabledDate(true)
		}
	}, [dateSelector])

	// REDIRECT
	if(isRedirected) {
		return window.location = "/mybookings"
	}

	let bookBtn = ""	
	if(!props.token) {
		bookBtn = (
			<Link to="/login" className="btn btn-block btn-large btn-primary mb-3">BOOK A SLOT</Link>
		)
	} else {
		bookBtn = (
			<Button className="btn btn-block btn-large btn-primary mb-3" disabled={disabledBtn}>BOOK A SLOT</Button>
		)
	}

	// console.log("LOCATIONS", props.locations)
	const onClickRefreshHandler = () => {
		window.location.reload()
	}

	// console.log("PROPS ROLE ID", props.roleId)

	let refreshBtn = ""
	if(props.roleId  == 1){
		refreshBtn = (
			// <Link to="/newbooking" className="btn btn-sm btn-secondary bottom-border navlink-body" disabled={disabledRefreshBtn}>Refresh</Link>
			<Button onClick={() => onClickRefreshHandler()} disabled={disabledRefreshBtn}>Refresh</Button>
		)
	}else if(props.roleId == 3){
		refreshBtn = (
			// <Link to="/home" className="btn btn-sm btn-secondary bottom-border navlink-body" disabled={disabledRefreshBtn}>Refresh</Link>
			<Button onClick={() => onClickRefreshHandler()} disabled={disabledRefreshBtn}>Refresh</Button>
		)
	}
	
	return (
		<Fragment>
			<Form className="mb-5 container-fluid col-10 offset-md-1 bookingform bg-booking" onSubmit={e => onSubmitHandler(e)}>
			<h1 className="text-center text-light mt-3 hdr-landing">WHERE ARE YOU GOING?</h1>
				<div className="d-flex justify-content-end">
					{refreshBtn}
				</div>
				<FormGroup>
					<Label>Locations</Label>
					<Input
						type="select"
			        	name="locationId"
			        	id="locationId"
			        	required
			        	onChange={e => onChangeHandler(e)}
			        	value={locationId}
					>
						<option selected disabled>Select one</option>
						{populateLocations()}
					</Input>
				</FormGroup>
				<FormGroup>
					<Label>Buildings</Label>
					<Input
						type="select"
			        	name="buildingId"
			        	id="buildingId"
			        	required
			        	onChange={e => onChangeHandler(e)}
			        	value={buildingId}
			        	disabled={disabledBuilding}
					>
						<option selected disabled>Select one</option>
						{ populateBuildings() }
					</Input>
				</FormGroup>
				<FormGroup className="">
					<Label>Slot Number</Label>
					<Input
						type="select"
			        	name="parkingId"
			        	id="parkingId"
			        	required
			        	onChange={e => onChangeHandler(e)}
			        	value={parkingId}
			        	disabled={disabledParking}
					>
						<option selected disabled>Select one</option>
						{populateParkings()}
					</Input>
				</FormGroup>
				<FormGroup className="">
					<Label>Select Schedule Type</Label>
					<Input
						type="select"
			        	name="dateSelector"
			        	id="dateSelector"
			        	required
			        	onChange={e => onChangeHandler(e)}
			        	value={dateSelector}
			        	disabled={disabledDate}
					>
						<option value="1" selected={ "1" ? true : false } disabled>Select one</option>
						<option value="2" selected={ "2" ? true : false }>Specific Date</option>
						<option value="3" selected={ "3" ? true : false }>Date Range</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<div className="d-flex justify-content-center">
						{ datepicker }
					</div>
				</FormGroup>
				{ bookBtn }
			</Form>
		</Fragment>
	)
}

export default BookingFormREST;

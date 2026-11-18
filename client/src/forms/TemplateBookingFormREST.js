import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
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
	//DATE PICKER	
	const [setBooking, setBookingData] = useState({
		locations: [],
		locationId: "",
		buildings: [],
		buildingId: "",
		parkings: [],
		parkingId: "",
		dateSelector: "1",
		bookings: [],
		bookingId: ""
	})
	const [ isRedirected, setIsRedirected ] = useState(false);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ disabledBuilding, setDisabledBuilding ] = useState(true);
	const [ disabledParking, setDisabledParking ] = useState(true);
	const [ disabledDate, setDisabledDate ] = useState(true);
	const { locations, locationId, buildings, buildingId, parkings, parkingId, dateSelector, bookings, bookingId } = setBooking;
	
	useEffect(() => {
		setBookingData({
			locations: props.locations,
			locationId: locationId ? locationId : null,
			buildings: props.buildings,
			buildingId: buildingId ? buildingId : null,
			parkings: props.parkings,
			parkingId: parkingId ? parkingId : null,
			dateSelector: dateSelector ? dateSelector : null,
			bookings: props.bookings,
			bookingId: bookingId ? bookingId : null,
		})
	},  [props])
	
	console.log("BOOKING FROM REST", bookings)

  	const populateLocations = () => {
  		return locations.map(location => {
  			if(location.isArchived != true){
	  			return (
	  				<option
	  					key={location._id}
	  					value={location._id}
	  					selected={locationId ? location._id : null}
	  				>
	  				{location.name.toUpperCase()}
	  				</option>
				)
  			}
  		})
  	}
  	const populateBuildings = () => {
  		return buildings.map(building => {
  			if(building.isArchived != true){	
	  			return (
	  				<option
	  					key={building._id}
	  					value={building._id}
	  					selected={buildingId ? building._id : null}
	  				>
	  				{building.name.toUpperCase()}
	  				</option>
				)
  			}
  		})
  	}
  	const populateParkings = () => {
  		return parkings.map(parking => {
  			if(parking.isArchived != true){
	  			return (
	  				<option
	  					key={parking._id}
	  					value={parking._id}
	  					selected={parkingId ? parking._id : null}
	  				>
	  				SLOT {parking.name}
	  				</option>
	  			)
  			}
  		})
  	}
  	const populateBookings = () => {
  		return bookings.map(booking => {
  			if(booking.isArchived != true){
	  			return (
	  				<option
	  					key={booking._id}
	  					value={booking._id}
	  					selected={bookingId ? bookingId : null}
	  				>
	  				{booking.parkingId}
	  				</option>
				)
  			}
  		})
  	}

	useEffect(() => {
		props.getBuildings(`/${locationId}`)
	}, [locationId])
	
	useEffect(() => {
		props.getParkings(`/${buildingId}`)
	}, [buildingId])

	useEffect(() => {
		props.getBookings(`/${parkingId}`)
	}, [parkingId])

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

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

	// useEffect(() => {
	// 	filterBookingHours()
	// }, [bookingHours])

	//  const filterBookingHours = () =>{
 //        //1) GET SCHEDULE FIELD OF BOOKINGS FOR THIS PARTICULAR MEMBER
 //        // CONVER TO UNIX TIMESTAMP
 //        const bookings = props.bookings
 //                .map(booking => booking.parkingId == props.parkingId && new Date(booking.schedule).getTime() )
 //                .filter(booking => booking != false )

 //        console.log("PROP BOOKING SCHED IN UNIX", bookings)

 //        //2) CONVERT BOOKING HOURS TO UNIX FORMAT
 //        // RESET SECONDS AND MILLISECONDS OF BOOKING HOURS TO 0
 //        const bh = bookingHours.map(bh => {
 //            bh.setSeconds(0)
 //            return new Date(bh.setMilliseconds(0)).getTime()
 //        })

 //        console.log("BOOKING HOURS IN UNIX", bh)

 //        //3) COMPARE BOOKING SCHEDULES AND BOOKING HOURS TO REMOVE DUPLICATES
 //        const filteredBh = bh.filter(bh => !bookings.includes(bh))
 //        console.log("FILTERED BOOKING HOURS", filteredBh)

 //        //4) REVERT REMAINING BOOKING HOURS TO ORIG FORMAT
 //        const newBookingHours = filteredBh.map(bh => new Date(bh))
 //        console.log("CONVERTED BOOKING HOURS", newBookingHours)

 //        //5) UPDATE NEWBOOKING HOURS
 //        setNewBookingHours(newBookingHours)

 //    }

	const isWeekday = date => {
		const day = getDay(date)
		return day !== 0 && day !== 6
	}

  	//USE STATE
  	const [bookingDates, setBookingDates] = useState([])

  	//MAP AVAILABILITIES
  	useEffect(() => {
  		const arr = []
  			if(bookings.length > 0) {
	  			bookings.map(booking => {
	  				const diff = (parseInt(moment(booking.endDate).format('D')) - parseInt(moment(booking.startDate).format('D')))
					for (let i = 0; i <= diff; i++) {
						console.log("I++", i)
						arr.push(addDays(new Date(booking.startDate),  i))
					}
	  			})
  			}
  			setBookingDates(arr)
  			console.log("BOOKING DATES", bookingDates)
  	}, [bookings])

  	//DATE PICKER
	let datepicker = ""
  	if(bookings && dateSelector == 1) {
  		datepicker = ""
  	} else if(bookings && dateSelector == 2) {
  		datepicker = (
  			<Fragment>
	  			<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					minDate={new Date()}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"
					filterDate={isWeekday}
					showTimeSelect
					includeTimes={bookingHours}
					dateFormat="MMMM d, yyyy h:mm aa"
				/>
			</Fragment>
		)
  	} else if(bookings && dateSelector == 3) {
  		datepicker = (
  			<Fragment>
	  			<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					selectsStart
					minDate={new Date()}
					startDate={startDate}
					endDate={endDate}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"
				/>
				<DatePicker
					selected={endDate}
					onChange={date => setEndDate(date)}
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
  		datepicker =(
  			<Fragment>
				<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					minDate={new Date()}
					className="mr-3 container-fluid"
					filterDate={isWeekday}
					showTimeSelect
					includeTimes={bookingHours}
					dateFormat="MMMM d, yyyy h:mm aa"
				/>
			</Fragment>
		)
  	}
  	 else if(!bookings && dateSelector == 3) {
  		datepicker = (
  			<Fragment>
			<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					minDate={new Date()}
					excludeDates={bookingDates}
					className="mr-3 container-fluid"

				/>
				<DatePicker
					selected={endDate}
					onChange={date => setEndDate(date)}
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

  	// //IF STATEMENT
  	// let datepicker = ""
  	// if(bookings) {
  	// 	datepicker = (
  	// 		<Fragment>
	  // 			<DatePicker
			// 		selected={startDate}
			// 		onChange={date => setStartDate(date)}
			// 		selectsStart
			// 		startDate={startDate}
			// 		endDate={endDate}
			// 		minDate={new Date()}
			// 		excludeDates={bookingDates}
			// 		className="mr-3 container-fluid"
			// 		disabled={disabledDate}
			// 	/>
			// 	<DatePicker
			// 		selected={endDate}
			// 		onChange={date => setEndDate(date)}
			// 		selectsEnd
			// 		startDate={startDate}
			// 		endDate={endDate}
			// 		minDate={startDate}
			// 		excludeDates={bookingDates}
			// 		className="container-fluid"
			// 		disabled={disabledDate}
			// 	/>
			// </Fragment>
  	// 	)
  	// } else if(!bookings) {
  	// 	datepicker = (
  	// 		<Fragment>
			// 	<DatePicker
			// 		selected={startDate}
			// 		onChange={date => setStartDate(date)}
			// 		selectsStart
			// 		startDate={startDate}
			// 		endDate={endDate}
			// 		minDate={new Date()}
			// 		className="mr-3 container-fluid"
			// 		disabled={disabledDate}
			// 	/>
			// 	<DatePicker
			// 		selected={endDate}
			// 		onChange={date => setEndDate(date)}
			// 		selectsEnd
			// 		startDate={startDate}
			// 		endDate={endDate}
			// 		minDate={startDate}
			// 		className="container-fluid"
			// 		disabled={disabledDate}
			// 	/>
			// </Fragment>
  	// 	)
  	// }

  	let na;
	if(locationId === null || buildingId === null || parkingId === null) {
		na = (
			<option selected disabled>Select one</option>
		)
	}

	let amount = ""
	let days = ""
	if(startDate != null && endDate != null){
		days = (parseInt(moment(endDate).format('D')) - parseInt(moment(startDate).format('D'))) + 1
		amount = 80 * parseInt(days) * 100
	}

	//HANDLE CHANGES TO FORM
	const onChangeHandler = (e) => {
		e.preventDefault();
		setBookingData({
			...setBooking,
			[e.target.name] :  e.target.value
		})
	}

	//SUBMIT HANDLER
	const onSubmitHandler = (e) => {
		e.preventDefault();
		props.setLoading(true)	
		Swal.fire({
			icon: "question",
			title: "Confirm Selected Schedule",
			html: startDate,
			focusConfirm: false,
			showCloseButton: true,
		}).then(async (response) => {
			console.log(response)

			if(response.value) {

				const newBooking = { locationId, buildingId, parkingId, startDate, endDate, amount }
				try {
					const config = {
						headers: {
							Authorization: `Bearer ${props.token}`
						}
					}
					// const url = "http://localhost:8000"
					let bodyBooking = JSON.stringify(newBooking)
					const body = JSON.parse(bodyBooking)
					// const body = JSON.stringify(newBooking)
					const res = await axios.post(`${URL}/bookings`, body, config)

					localStorage.setItem("bookingId", res.data._id)
					localStorage.setItem("locationId", locationId)
					localStorage.setItem("buildingId", buildingId)
					localStorage.setItem("parkingId", parkingId)


					Swal.fire({
						title: "Success",
						text: "Booking Created",
						icon: "success",
						showConfirmationButton: false,
						timer: 3000
					})
					setIsRedirected(true)
				} catch(e) {
					console.log(e.response.data)
				}			
			}
		})
		props.setLoading(false)
	}

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
	
	return (
		<Fragment>
			<Form className="mb-5 container-fluid col-10 offset-md-1 bookingform bg-booking" onSubmit={e => onSubmitHandler(e)}>
				<h1 className="text-center text-light mt-3 hdr-landing">WHERE ARE YOU GOING?</h1>
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
						{populateBuildings()}
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
						<option value="2" selected={ "2" ? true : false } disabled>Specific Date (N/A)</option>
						<option value="3" selected={ "3" ? true : false }>Date Range</option>
					</Input>
				</FormGroup>

				{/*<FormGroup className="">
					<Label>Booking</Label>
					<Input
						type="select"
			        	name="bookingId"
			        	id="bookingId"

			        	onChange={e => onChangeHandler(e)}
			        	value={bookingId}

					>
						{na}
						{populateBookings()}
					</Input>
				</FormGroup>*/}

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

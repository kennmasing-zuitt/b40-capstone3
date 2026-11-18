import React, { Fragment, useState, useEffect } from 'react';
import {
	Container, Row, Col,
	Button, Form, FormGroup, Label, Input,
	Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { URL } from '../config';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getDay, addDays, setHours, setMinutes } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

import DateForm from './DateForm'

const BookingForm = (props) => {

	// console.log("GET_LOCATIONS IN BKNG FORM", props.locations)
	// console.log("GET_BUILDINGS IN BKNG FORM", props.buildings)
	// console.log("GET_PARKINGS IN BKNG FORM", props.parkings)
	// console.log("GET_BOOKINGS IN BKNG FORM", props.bookings)

	//DATE PICKER
	// console.log("PROPS BOOKING", props.bookings)	


	const {
		userId,
		token,
		roleId,
		// locations,
		// buildings,
		// parkings,
		// bookings,

		refetchLocations,
		refetchBuildings,
		refetchParkings,
		refetchBookings,

		locationId,
		buildingId,
		parkingId,

		createBooking,

		bookingDataId,
		setBookingDataId,

		// arrayData,
		// setArrayData
	} = props

	const [arrayData, setArrayData] = useState({
		locations: [],
		buildings: [],
		parkings: [],
		bookings: [],
		dateSelector: "1"
	})

	const { locations, buildings, parkings, bookings, dateSelector } = arrayData

	useEffect(() => {
		setArrayData({
			...arrayData,
			locations: props.locations,
			buildings: props.buildings ? props.buildings : [],
			parkings: props.parkings ? props.parkings : [],
			bookings: props.bookings ? props.bookings : [],
			dateSelector: "1",
		})
	}, [props])

	// const [setBooking, setBookingData] = useState({
	// 	userId: "",
	// 	statusId: "",
	// 	isPaid: "",
	// 	isCompleted: "",
	// 	isArchived: "",
	// 	startDate: "",
	// 	endDate: "",
	// 	schedule: "",
	// 	locationId: "",
	// 	buildingId: "",
	// 	parkingId: "",
	// 	bookingId: ""
	// })

	const [ isRedirected, setIsRedirected ] = useState(false);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ disabledBuilding, setDisabledBuilding ] = useState(true);
	const [ disabledParking, setDisabledParking ] = useState(true);
	const [ disabledDate, setDisabledDate ] = useState(true);

	// const {
	// 	userId,
	// 	// statusId,
	// 	isPaid,
	// 	isCompleted,
	// 	isArchived,
	// 	startDate,
	// 	endDate,
	// 	schedule,
	// 	locationId,
	// 	buildingId,
	// 	parkingId,
	// 	bookingId
	// } = setBooking;
	
	// useEffect(() => {
	// 	setBookingData({
	// 		userId: props.userId,
			// statusId: statusId ? statusId : 1,
	// 		isPaid: false,
	// 		isCompleted: false,
	// 		isArchived: false,
	// 		startDate: startDate ? startDate : null,
	// 		endDate: endDate ? endDate : null,
	// 		schedule: schedule ? schedule : null,
	// 		locationId: locationId ? locationId : null,
	// 		buildingId: buildingId ? buildingId : null,
	// 		parkingId: parkingId ? parkingId : null,
	// 		bookingId: bookingId ? bookingId : null,
	// 	})
	// },  [props])

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
  				SLOT {parking.name}
  				</option>
  			)
  		})
  	}
  	// const populateBookings = () => {
  	// 	return bookings.map(booking => {
  	// 		return (
  	// 			<option
  	// 				key={booking._id}
  	// 				value={booking._id}
  	// 				selected={bookingId ? bookingId : null}
  	// 			>
  	// 			{booking.parkingId}
  	// 			</option>
			// )
  	// 	})
  	// }

	// useEffect(() => {
	// 	setArrayData({
	// 		...arrayData,
	// 		buildings: props.refetchBuildings({locationId})
	// 	})
	// }, [locationId])

	// useEffect(() => {
	// 	setArrayData({
	// 		...arrayData,
	// 		parkings: props.refetchParkings({buildingId})
	// 	})
	// }, [buildingId])

	// useEffect(() => {
	// 	setArrayData({
	// 		...arrayData,
	// 		bookings: props.refetchBookings({parkingId})
	// 	})
	// }, [parkingId])

	useEffect( async () => {
		await setBookingDataId({
			...bookingDataId,
			locationId: locationId
		})

		setArrayData({
			...arrayData,
			buildings: buildings ? buildings : []
		})

	}, [locationId])


	useEffect( async () => {
		await setBookingDataId({
			...bookingDataId,
			buildingId: buildingId
		})

		setArrayData({
			...arrayData,
			parkings: parkings ? parkings: []
		})

	}, [buildingId])

	useEffect( async () => {
		await setBookingDataId({
			...bookingDataId,
			parkingId: parkingId
		})

		setArrayData({
			...arrayData,
			bookings: bookings ? bookings : []
		})
	}, [parkingId])

	const [bookingHours, setBookingHours] = useState([]);
	const [newBookingHours, setNewBookingHours] = useState([]);

	// useEffect(() => {
	// 	setBookingHours([
	//         setHours(setMinutes(startDate, 0), 6),
	//         setHours(setMinutes(startDate, 0), 7),
	//         setHours(setMinutes(startDate, 0), 8),
	//         setHours(setMinutes(startDate, 0), 9),
	//         setHours(setMinutes(startDate, 0), 10),
	//         setHours(setMinutes(startDate, 0), 11),
	//         setHours(setMinutes(startDate, 0), 12),
	//         setHours(setMinutes(startDate, 0), 13),
	//         setHours(setMinutes(startDate, 0), 14),
	//         setHours(setMinutes(startDate, 0), 15),
	//         setHours(setMinutes(startDate, 0), 16),
	//         setHours(setMinutes(startDate, 0), 17),
	//         setHours(setMinutes(startDate, 0), 18),
	//         setHours(setMinutes(startDate, 0), 19),
	//         setHours(setMinutes(startDate, 0), 20),
	//         setHours(setMinutes(startDate, 0), 21)
	// 	])
	// }, [startDate])


	// const isWeekday = date => {
	// 	const day = getDay(date)
	// 	return day !== 0 && day !== 6
	// }

 //  	//USE STATE
 //  	const [bookingDates, setBookingDates] = useState([])

 //  	//MAP AVAILABILITIES
 //  	useEffect(() => {
 //  		const arr = []
 //  			if(bookings && bookings.length > 0) {
	//   			bookings.map(booking => {
	//   				const diff = (parseInt(moment(booking.endDate).format('D')) - parseInt(moment(booking.startDate).format('D')))
	// 				for (let i = 0; i <= diff; i++) {
	// 					console.log("I++", i)
	// 					arr.push(addDays(new Date(booking.startDate),  i))
	// 				}
	//   			})
 //  			}
 //  			setBookingDates(arr)
 //  			console.log("BOOKING DATES", bookingDates)
 //  	}, [bookings])

 //  	//DATE PICKER
	// let datepicker = ""
 //  	if(bookings && dateSelector == 1) {
 //  		datepicker = ""
 //  	} else if(bookings && dateSelector == 2) {
 //  		datepicker = (
 //  			<Fragment>
	//   			<DatePicker
	// 				selected={startDate}
	// 				onChange={date => setBookingData({
	// 					...setBooking,
	// 					startDate: date
	// 				})}
	// 				selectsStart
	// 				startDate={startDate}
	// 				endDate={endDate}
	// 				minDate={new Date()}
	// 				excludeDates={bookingDates}
	// 				className="mr-3 container-fluid"
	// 				filterDate={isWeekday}
	// 				showTimeSelect
	// 				includeTimes={bookingHours}
	// 				dateFormat="MMMM d, yyyy h:mm aa"
	// 			/>
	// 		</Fragment>
	// 	)
 //  	} else if(bookings && dateSelector == 3) {
 //  		datepicker = (
 //  			<Fragment>
	//   			<DatePicker
	// 				selected={startDate}
	// 				onChange={date => setBookingData({
	// 					...setBooking,
	// 					startDate: date
	// 				})}
	// 				selectsStart
	// 				startDate={startDate}
	// 				endDate={endDate}
	// 				excludeDates={bookingDates}
	// 				className="mr-3 container-fluid"

	// 			/>
	// 			<DatePicker
	// 				selected={endDate}
	// 				onChange={date => setBookingData({
	// 					...setBooking,
	// 					endDate: date
	// 				})}
	// 				selectsEnd
	// 				startDate={startDate}
	// 				endDate={endDate}
	// 				minDate={startDate}
	// 				excludeDates={bookingDates}
	// 				className="container-fluid"

	// 			/>
	// 		</Fragment>

 //  		)
 //  	} else if(!bookings && dateSelector == 1) {
 //  		datepicker = ""
 //  	} else if(!bookings && dateSelector == 2) {
 //  		datepicker =(
 //  			<Fragment>
	// 			<DatePicker
	// 				selected={startDate}
	// 				onChange={date => setBookingData({
	// 					...setBooking,
	// 					startDate: date
	// 				})}
	// 				selectsStart
	// 				startDate={startDate}
	// 				endDate={endDate}
	// 				minDate={new Date()}
	// 				className="mr-3 container-fluid"
	// 				filterDate={isWeekday}
	// 				showTimeSelect
	// 				includeTimes={bookingHours}
	// 				dateFormat="MMMM d, yyyy h:mm aa"
	// 			/>
	// 		</Fragment>
	// 	)
 //  	}
 //  	 else if(!bookings && dateSelector == 3) {
 //  		datepicker = (
 //  			<Fragment>
	// 		<DatePicker
	// 				selected={startDate}
	// 				onChange={date => setBookingData({
	// 					...setBooking,
	// 					startDate: date
	// 				})}
	// 				selectsStart
	// 				startDate={startDate}
	// 				endDate={endDate}
	// 				minDate={new Date()}
	// 				excludeDates={bookingDates}
	// 				className="mr-3 container-fluid"

	// 			/>
	// 			<DatePicker
	// 				selected={endDate}
	// 				onChange={date => setBookingData({
	// 					...setBooking,
	// 					endDate: date
	// 				})}
	// 				selectsEnd
	// 				startDate={startDate}
	// 				endDate={endDate}
	// 				minDate={startDate}
	// 				excludeDates={bookingDates}
	// 				className="container-fluid"

	// 			/>
				
	// 		</Fragment>
 //  		)
 //  	}


  	let na;
	if(locationId === null || buildingId === null || parkingId === null) {
		na = (
			<option selected disabled>Select one</option>
		)
	}

	//HANDLE CHANGES TO FORM
	const onChangeHandler = (e) => {
		e.preventDefault();
		// setBookingData({
		// 	...setBooking,
		// 	[e.target.name] :  e.target.value
		// })
		// setArrayData({
		// 	...arrayData,
		// 	[e.target.name] : e.target.value
		// })
		setBookingDataId({
			...bookingDataId,
			[e.target.name] : e.target.value
		})

	}

	//SUBMIT HANDLER
	const onSubmitHandler = (e) => {
		e.preventDefault();
		// Swal.fire({
		// 	icon: "question",
		// 	title: "Confirm Selected Schedule",
		// 	// html: startDate,
		// 	focusConfirm: false,
		// 	showCloseButton: true,
		// }).then(async (response) => {
		// 	console.log(response)
		// 	if(response.value) {
		// 		props.createBooking({
		// 			variables: {...setBooking}
		// 		})
		// 		Swal.fire({
		// 			title: "Success",
		// 			text: "Booking Created",
		// 			icon: "success",
		// 			showConfirmationButton: false,
		// 			timer: 3000
		// 		})
		// 		setIsRedirected(true)		
		// 	}
		// })
	}

 //  useEffect(() => {
 //    if(locationId !== "" && buildingId !== "" && parkingId !== "" && dateSelector == 2 && startDate !== null) {
 //    if(locationId !== "" && buildingId !== "" && parkingId !== "" && dateSelector == 2 && startDate !== null) {
 //      setDisabledBtn(false)
 //    } else {
 //      setDisabledBtn(true)
 //    }
 //  }, [startDate])

	// useEffect(() => {
 //    if(locationId !== "" && buildingId !== "" && parkingId !== "" && dateSelector == 3 && startDate !== null) {
 //      setDisabledBtn(false)
 //    } else {
 //      setDisabledBtn(true)
 //    }
 //  }, [endDate])

 //  useEffect(() => {
 //  	if(locationId !== null) {
 //  		setDisabledBuilding(false)
 //  	} else {
 //  		setDisabledBuilding(true)
 //  	}
 //  }, [locationId])

 //  useEffect(() => {
 //  	if(buildingId !== null) {
 //  		setDisabledParking(false)
 //  	} else {
 //  		setDisabledParking(true)
 //  	}
 //  }, [buildingId])

	// useEffect(() => {
 //  	if(parkingId !== null) {
 //  		setDisabledDate(false)
 //  	} else {
 //  		setDisabledDate(true)
 //  	}
 //  }, [parkingId])

	// useEffect(() => {
	// 	if(dateSelector !== "1") {
	// 		setDisabledDate(false)
	// 	} else {
	// 		setDisabledDate(true)
	// 	}
	// }, [dateSelector])

	// REDIRECT
	if(isRedirected) {
		return window.location = "/mybookings"
	}

let bookBtn = ""
if(!props.token) {
	bookBtn = (
		// <Button className="btn btn-block btn-large btn-primary mb-3">BOOK A SLOT</Button>
		<Link to="/login" className="btn btn-block btn-large btn-primary mb-3">BOOK A SLOT</Link>
	)
} else {
	bookBtn = (
		<Button className="btn btn-block btn-large btn-primary mb-3" >BOOK A SLOT</Button>
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
						{/* datepicker */}
					</div>
				</FormGroup>
				{ bookBtn }
			</Form>
		</Fragment>
	)

	// return (
	// 	<h1>BOOKING FORM</h1>
	// )
}

export default BookingForm;

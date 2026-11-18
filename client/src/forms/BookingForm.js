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

	const [bookingData, setBookingData] = useState({
		locationId: null,
		buildingId: null,
		parkingId: null,
		startDate: null,
		endDate: null
	})

	const { locationId, buildingId, parkingId, startDate, endDate } = bookingData

	const [arrayData, setArrayData] = useState({
		locations: []
	})

	const { locations } = arrayData

	useEffect(() => {
		setArrayData({
			...arrayData,
			locations: props.location ? props.location : []

		})
	}, [props])

	console.log("LOCATIONS IN BOOKING FORM", locations)

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
	
	return (
		<Fragment>
			{/*<Form className="mb-5 container-fluid col-10 offset-md-1 bookingform bg-booking" onSubmit={e => onSubmitHandler(e)}>*/}
			<Form className="mb-5 container-fluid col-10 offset-md-1 bookingform bg-booking" >
				<h1 className="text-center text-light mt-3 hdr-landing">WHERE ARE YOU GOING?</h1>
				<FormGroup>
					<Label>Locations</Label>
					<Input
						type="select"
			        	name="locationId"
			        	id="locationId"
			        	required
			        	// onChange={e => onChangeHandler(e)}
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
			        	// onChange={e => onChangeHandler(e)}
			        	value={buildingId}
			        	// disabled={disabledBuilding}
					>
						<option selected disabled>Select one</option>
						{/*populateBuildings()*/}
					</Input>
				</FormGroup>
				<FormGroup className="">
					<Label>Slot Number</Label>
					<Input
						type="select"
			        	name="parkingId"
			        	id="parkingId"
			        	required
			        	// onChange={e => onChangeHandler(e)}
			        	value={parkingId}
			        	// disabled={disabledParking}
					>
						<option selected disabled>Select one</option>
						{/*populateParkings()*/}
					</Input>
				</FormGroup>

				<FormGroup className="">
					<Label>Select Schedule Type</Label>
					<Input
						type="select"
			        	name="dateSelector"
			        	id="dateSelector"
			        	required
			        	// onChange={e => onChangeHandler(e)}
			        	// value={dateSelector}
			        	// disabled={disabledDate}


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
				{/* bookBtn */}
			</Form>
		</Fragment>
	)

	// return (
	// 	<h1>BOOKING FORM</h1>
	// )
}

export default BookingForm;

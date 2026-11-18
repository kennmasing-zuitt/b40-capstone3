import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { URL } from '../config';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BOOKINGS, GET_BOOKING, GET_TOTAL_BOOKINGS } from '../graphql/queries';
import {
	PAY_BOOKING,
	COMPLETE_BOOKING,
	ARCHIVE_BOOKING,
	PENDING_BOOKING,
	APPROVE_BOOKING,
	DECLINE_BOOKING,
	DELETE_BOOKING
} from '../graphql/mutations';

import BookingTable from '../tables/BookingTable';
import BookingTableMobile from '../tables/BookingTableMobile'
import BookingModalSuperAdmin from '../modals/BookingModalSuperAdmin';
import Paginate from '../partials/Paginate';

const BookingPage = (props) => {

	const [statusBookingData, setStatusBookingData] = useState({
		isPaid: null,
		statusId: null,
		isCompleted: null,
		isArchived: null
	})

	const { isPaid, statusId, isCompleted, isArchived } = statusBookingData

	const {
		error: bookingError,
		loading: bookingLoading,
		data: bookingQuery,
		refetch: refetchBooking
	} = useQuery(GET_BOOKING, {
	    variables: { _id: "" }
	})

	const [bookingsData, setBookingsData] = useState({
		bookings: [],
		total: undefined,
		limit: 10
	})

	const { bookings, total, limit } = bookingsData;

	const {
		error: bookingsError,
		loading: bookingsLoading,
		data: bookingsQuery,
		refetch: refetchBookings
	} = useQuery(GET_BOOKINGS, {
		variables: {
			isPaid: isPaid,
			statusId: statusId,
			isCompleted: isCompleted,
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchBookings()

		if(bookingsQuery && bookingsQuery.bookings){
			setBookingsData({
				...bookingsData,
				bookings: bookingsQuery.bookings,
				total: bookingsQuery.bookings[0] ? bookingsQuery.bookings[0].total : undefined
			})
		}
	}, [bookingsQuery])

	const [ payBooking ] = useMutation(PAY_BOOKING)
	const [ completeBooking ] = useMutation(COMPLETE_BOOKING)
	const [ archiveBooking ] = useMutation(ARCHIVE_BOOKING)
	const [ pendingBooking ] = useMutation(PENDING_BOOKING)
	const [ approveBooking ] = useMutation(APPROVE_BOOKING)
	const [ declineBooking ] = useMutation(DECLINE_BOOKING)
	const [ deleteBooking ] = useMutation(DELETE_BOOKING)

	//----------------------M O D A L-------------------------

	const [modal, setModal] = useState(false)
	const [booking, setBooking] = useState({})

	const toggle = async (close, _id) => {

		if(typeof _id === "string"){
			let res = await refetchBooking({_id})

			setBooking(res.data.booking)
		}
		if(close){
			setModal(!modal)
		}
	}

	useEffect(() => {
		refetchBookings()

	}, [toggle])

	const displayPagination = () => {
		return <Paginate total={total} getDocuments={refetchBookings} limit={limit} setLoading={props.setLoading}/>
	}

	const onClickGetAll = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetPending = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "5e5fac721c84eb4bf42d4879",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetApproved = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "5e5fac7f1c84eb4bf42d487a",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetDeclined = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "5e5fac881c84eb4bf42d487b",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetPaid = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: true,
			statusId: "",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetUnpaid = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: false,
			statusId: "",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetCompleted = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "",
			isCompleted: true,
			isArchived: null
		})
	}

	const onClickGetOngoing = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "",
			isCompleted: false,
			isArchived: null
		})
	}

	const onClickGetArchived = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "",
			isCompleted: null,
			isArchived: true
		})
	}

	const onClickGetActive = (e) => {
		e.preventDefault()
		setStatusBookingData({
			isPaid: null,
			statusId: "",
			isCompleted: null,
			isArchived: false
		})
	}

	let filterButtons = ""

	if(bookings.length == 0){

	} else {
		filterButtons =(
			<Fragment>
				<div className="d-flex justify-content-center mb-1 col-12">	
					<div>
						<button className="btn btn-sm btn-outline-primary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
						<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetPending(e) }>Get Pending</button>
						<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetApproved(e) }>Get Approved</button>
						<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetDeclined(e) }>Get Declined</button>
					</div>
				</div>
				<div className="d-flex justify-content-center mb-1 col-12">	
					<div >
						<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetPaid(e) }>Get Paid</button>
						<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetUnpaid(e) }>Get Unpaid</button>
						<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetCompleted(e) }>Get Completed</button>
						<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetOngoing(e) }>Get On-going</button>
					</div>
				</div>	
				<div className="d-flex justify-content-center mb-1">	
					<div >
						<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
						<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
					</div>
				</div>
			</Fragment>
		)
	}


	if(bookingsLoading) return <Spinner color="primary" className="loader"/>
	if(bookingsError) return <p>{bookingsError.message}</p>

	let table = ""
	if(props.roleId == 1){
		table = (
			<Fragment>
				<div className="landing-desktop col-10 offset-md-1">
					<div className="d-flex mb-3">
						<div className="col-4 d-flex justify-content-start ml-n2">	
								<button className="btn btn-sm btn-outline-primary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetPending(e) }>Get Pending</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetApproved(e) }>Get Approved</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetDeclined(e) }>Get Declined</button>
						</div>
						<div className="col-8 d-flex justify-content-end mr-4">	
								<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetPaid(e) }>Get Paid</button>
								<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetUnpaid(e) }>Get Unpaid</button>
								<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetCompleted(e) }>Get Completed</button>
								<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetOngoing(e) }>Get On-going</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
						</div>
					</div>
					<Col md="12" className="">
						<BookingTable
							roleId={props.roleId}
							toggle={toggle}
							bookings={bookings}
							payBooking={payBooking}
							completeBooking={completeBooking}
							archiveBooking={archiveBooking}
							pendingBooking={pendingBooking}
							approveBooking={approveBooking}
							declineBooking={declineBooking}
							deleteBooking={deleteBooking}
							GET_BOOKING={GET_BOOKING}
							GET_BOOKINGS={GET_BOOKINGS}
							refetchBookings={refetchBookings}
							setLoading={props.setLoading}
						/>
					</Col>
					<div className="text-right mr-5">
						{ total > limit ? <Paginate getDocuments={refetchBookings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
					</div>
				</div>
			</Fragment>
		)
	} else if(props.roleId == 2){
		table = (
			<Fragment>
				<div className="col-10 offset-md-1 landing-desktop">
					<div className="d-flex mb-3">
						<div className="col-4 d-flex justify-content-start ml-n2">	
								<button className="btn btn-sm btn-outline-primary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetPending(e) }>Get Pending</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetApproved(e) }>Get Approved</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetDeclined(e) }>Get Declined</button>
						</div>
						<div className="col-8 d-flex justify-content-end ml-4">	
								<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetPaid(e) }>Get Paid</button>
								<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetUnpaid(e) }>Get Unpaid</button>
								<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetCompleted(e) }>Get Completed</button>
								<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetOngoing(e) }>Get On-going</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
						</div>
					</div>
					<Col md="12" className="no-gutters">
						<BookingTable
							roleId={props.roleId}
							toggle={toggle}
							bookings={bookings}
							payBooking={payBooking}
							completeBooking={completeBooking}
							archiveBooking={archiveBooking}
							pendingBooking={pendingBooking}
							approveBooking={approveBooking}
							declineBooking={declineBooking}
							deleteBooking={deleteBooking}
							GET_BOOKING={GET_BOOKING}
							GET_BOOKINGS={GET_BOOKINGS}
							refetchBookings={refetchBookings}
							setLoading={props.setLoading}
						/>
					</Col>
					<div className="text-right mr-1">
						{ total > limit ? <Paginate getDocuments={refetchBookings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
					</div>
				</div>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<h1 className="container-fluid text-center page-hdr">BOOKING HISTORY</h1>
			{table}
			<div className="landing-mobile">
				{ filterButtons }
				<Col className="col-12 offset-md-1 d-flex justify-content-center align-items-center mt-3">
					<BookingTableMobile
						roleId={props.roleId}
						toggle={toggle}
						bookings={bookings}
						payBooking={payBooking}
						completeBooking={completeBooking}
						archiveBooking={archiveBooking}
						pendingBooking={pendingBooking}
						approveBooking={approveBooking}
						declineBooking={declineBooking}
						deleteBooking={deleteBooking}
						GET_BOOKING={GET_BOOKING}
						GET_BOOKINGS={GET_BOOKINGS}
						refetchBookings={refetchBookings}
						setLoading={props.setLoading}
					/>
				</Col>
				<div className="text-center">
					{ total > limit ? <Paginate getDocuments={refetchBookings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
				</div>
			</div>
			<BookingModalSuperAdmin
				modal={modal}
				toggle={toggle}
				token={props.token}
				roleId={props.roleId}
				booking={booking}
				payBooking={payBooking}
				completeBooking={completeBooking}
				archiveBooking={archiveBooking}
				pendingBooking={pendingBooking}
				approveBooking={approveBooking}
				declineBooking={declineBooking}
				deleteBooking={deleteBooking}
				GET_BOOKING={GET_BOOKING}
				GET_BOOKINGS={GET_BOOKINGS}
				refetchBooking={refetchBooking}
				refetchBookings={refetchBookings}
				setLoading={props.setLoading}
				bookingLoading={bookingLoading}
			/>
		</Fragment>
	)
}

export default BookingPage;

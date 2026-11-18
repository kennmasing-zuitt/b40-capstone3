import React, { Fragment, useState, useEffect } from 'react';
import { Container,Row, Col, Button, Form, FormGroup, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { URL } from '../config';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
	GET_BOOKINGS_BY_USER,
	GET_BOOKING,
	GET_LOCATIONS
} from '../graphql/queries';
import {
	PAY_BOOKING,
	COMPLETE_BOOKING,
	ARCHIVE_BOOKING,
	PENDING_BOOKING,
	APPROVE_BOOKING,
	DECLINE_BOOKING,
	DELETE_BOOKING,
	STRIPE_PAYMENT
} from '../graphql/mutations';

import BookingTableUser from '../tables/BookingTableUser';
import BookingTableUserMobile from '../tables/BookingTableUserMobile';
import BookingModalUser from '../modals/BookingModalUser';
import Paginate from '../partials/Paginate';

const BookingPageUser = props => {

	const [statusBookingData, setStatusBookingData] = useState({
		userId: props.match.params.id,
		isPaid: null,
		statusId: null,
		isCompleted: null,
		isArchived: null
	})

	const { userId, isPaid, statusId, isCompleted, isArchived } = statusBookingData

	const {
		error: bookingError,
		loading: bookingLoading,
		data: bookingQuery,
		refetch: refetchBooking
	} = useQuery(GET_BOOKING, {
	    variables: {
	    	_id: ""
	    }
	})

	const [bookingsData, setBookingsData] = useState({
		token: props.token,
		bookings: [],
		total: undefined,
		limit: 10
	})

	const { token, bookings, total, limit } = bookingsData;

	const {
		error: bookingsError,
		loading: bookingsLoading,
		data: bookingsQuery,
		refetch: refetchBookings
	} = useQuery(GET_BOOKINGS_BY_USER, {
		variables: {
			userId: props.userId,
			isPaid: isPaid,
			statusId: statusId,
			isCompleted: isCompleted,
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchBookings()

		if(bookingsQuery && bookingsQuery.userBookings){
			setBookingsData({
				...bookingsData,
				bookings: bookingsQuery.userBookings,
				total: bookingsQuery.userBookings[0] ? bookingsQuery.userBookings[0].total : undefined
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
	const [ stripePayment ] = useMutation(STRIPE_PAYMENT)

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

	const onClickGetAll = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetPending = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "5e5fac721c84eb4bf42d4879",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetApproved = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "5e5fac7f1c84eb4bf42d487a",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetDeclined = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "5e5fac881c84eb4bf42d487b",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetPaid = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: true,
			statusId: "",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetUnpaid = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: false,
			statusId: "",
			isCompleted: null,
			isArchived: null
		})
	}

	const onClickGetCompleted = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "",
			isCompleted: true,
			isArchived: null
		})
	}

	const onClickGetOngoing = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "",
			isCompleted: false,
			isArchived: null
		})
	}

	const onClickGetArchived = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
			isPaid: null,
			statusId: "",
			isCompleted: null,
			isArchived: true
		})
	}

	const onClickGetActive = (e) => {
		e.preventDefault()
		setStatusBookingData({
			userId: props.match.params.id,
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
			</Fragment>
		)
	}

	const displayPagination = () => {
		return <Paginate total={total} getDocuments={refetchBookings} limit={limit} setLoading={props.setLoading}/>
	}
	
	if(bookingsLoading) return <Spinner color="primary" className="loader"/>
	if(bookingsError) return <p>{bookingsError.message}</p>

	return (
		<Fragment>
			<h1 className="container-fluid text-center page-hdr">BOOKING HISTORY</h1>
			<div className="landing-desktop col-10 offset-md-1">
				<div className="d-flex mb-3">
					<div className="col-4 d-flex justify-content-start ml-n2">	
							<button className="btn btn-sm btn-outline-primary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetPending(e) }>Get Pending</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetApproved(e) }>Get Approved</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetDeclined(e) }>Get Declined</button>
					</div>
					<div className="col-8 d-flex justify-content-end ml-3">	
							<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetPaid(e) }>Get Paid</button>
							<button className="btn btn-sm btn-outline-success mr-1" onClick={ e => onClickGetUnpaid(e) }>Get Unpaid</button>
							<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetCompleted(e) }>Get Completed</button>
							<button className="btn btn-sm btn-outline-info mr-1" onClick={ e => onClickGetOngoing(e) }>Get On-going</button>
					</div>
				</div>
				<Col md="12" className="no-gutters">
					<BookingTableUser
						userId={props.userId}
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
						GET_BOOKINGS_BY_USER={GET_BOOKINGS_BY_USER}
						refetchBookings={refetchBookings}
						setLoading={props.setLoading}
						bookingLoading={bookingLoading}
						stripePayment={stripePayment}
					/>
				</Col>
				<div className="text-right mr-2">
					{ total > limit ? <Paginate getDocuments={refetchBookings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
				</div>				
			</div>
			<div className="landing-mobile">
				{ filterButtons }
				<Col className="col-12 offset-md-1 d-flex justify-content-center align-items-center ">
					<BookingTableUserMobile
						userId={props.userId}
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
						GET_BOOKINGS_BY_USER={GET_BOOKINGS_BY_USER}
						refetchBookings={refetchBookings}
						setLoading={props.setLoading}
						bookingLoading={bookingLoading}
						stripePayment={stripePayment}
					/>
				</Col>
				<div className="text-right mr-2">
					{ total > limit ? <Paginate getDocuments={refetchBookings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
				</div>
			</div>

			<BookingModalUser
				userId={props.userId}
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
				GET_BOOKINGS_BY_USER={GET_BOOKINGS_BY_USER}
				refetchBooking={refetchBooking}
				refetchBookings={refetchBookings}
				setLoading={props.setLoading}
				bookingLoading={bookingLoading}
				stripePayment={stripePayment}
			/>
		</Fragment>
	)
}

export default BookingPageUser;

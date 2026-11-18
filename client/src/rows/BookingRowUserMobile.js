import React, { Fragment, useState, useEffect } from 'react';
// import { Table, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

import StripeForm from '../forms/StripeForm';

const BookingRowUserMobile = (props) => {

const {
  userId,
  token,
  roleId,
  toggle,
  booking,
  index,
  payBooking,
  completeBooking,
  archiveBooking,
  pendingBooking,
  approveBooking,
  declineBooking,
  deleteBooking,
  GET_BOOKING,
  GET_BOOKINGS_BY_USER,
  refetchBookings,
  setLoading,
  bookingLoading
} = props

const { _id, name, parkingId, isPaid, statusId, isCompleted, isArchived, createdAt, startDate, endDate, amount } = booking

const [ disabledBtn, setDisabledBtn ] = useState(false)
const [ disabledDeclineBtn, setDisabledDeclineBtn ] = useState(true)

const days = parseInt(moment(booking.endDate).format('D')) - parseInt(moment(booking.startDate).format('D')) + 1

const amountToDisplay = amount / 100

  const onClickPaymentHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await payBooking({
          variables: {
          _id,
          isPaid: !booking.isPaid
        },
        refetchQueries: [
          {
            query: GET_BOOKING,
            variables: {_id}
          }
        ]
      })
      setLoading(false)
      // toggle(false, _id)
      Swal.fire({
        title: "Success",
        text: `Booking ${booking.isPaid ? "Unpaid" : "Paid"}`,
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      setLoading(false)
      console.log(e)
      //SWAL ERROR
    }
  }

const onClickCompleteHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await completeBooking({
        variables: {
          _id,
          isCompleted: !booking.isCompleted
        },
        refetchQueries: [
          {
            query: GET_BOOKING,
            variables: {_id}
          }
        ]
      })
      setLoading(false)
      // toggle(false, _id)
      Swal.fire({
        title: "Success",
        text: `Booking ${booking.isCompleted ? "On-going" : "Completed"}`,
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      setLoading(false)
      console.log(e)
      //SWAL ERROR
    }
  }

  const onClickArchiveHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await archiveBooking({
        variables: {
          _id,
          isArchived: !booking.isArchived
        },
        refetchQueries: [
          {
            query: GET_BOOKING,
            variables: {_id}
          }
        ]
      })
      setLoading(false)
      // toggle(false, _id)
      Swal.fire({
        title: "Success",
        text: `Booking ${booking.isArchived ? "Active" : "Archived"}`,
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      setLoading(false)
      console.log(e)
      //SWAL ERROR
    }
  }

  const onClickPendingHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await pendingBooking({
        variables: {
          _id
        },
        refetchBooking: [{
          query: GET_BOOKING,
          variables: {_id}
        }]
      })
      setLoading(false)
      // toggle(false, _id)
      Swal.fire({
        title: "Success",
        text: "Booking Pending",
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      setLoading(false)
      console.log(e)
      //SWAL ERROR
    }
  }

  const onClickApproveHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await approveBooking({
        variables: {
          _id
        },
        refetchBooking: [{
          query: GET_BOOKING,
          variables: {_id}
        }]
      })
      setLoading(false)
      // toggle(false, _id)
      Swal.fire({
        title: "Success",
        text: "Booking Approved",
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      setLoading(false)
      console.log(e)
      //SWAL ERROR
    }
  }

  const onClickDeclineHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await declineBooking({
        variables: {
          _id
        },
        refetchBooking: [{
          query: GET_BOOKING,
          variables: {_id}
        }]
      })
      setLoading(false)
      // toggle(false, _id)
      Swal.fire({
        title: "Success",
        text: "Booking Declined",
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      setLoading(false)
      console.log(e)
      //SWAL ERROR
    }
  }

  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Delete Booking",
      text: "Are you sure you want to delete booking?",
      focusConfirm: false,
      showCloseButton: true
    }).then(async response => {

      if(response.value){
        setLoading(true)
        await deleteBooking({
          variables: {
            _id
          },
          refetchBooking: [
            {
              query: GET_BOOKINGS_BY_USER,
              variables: {_id}
            }
          ]
        })
        setLoading(false)
        Swal.fire({
          title: "Success",
          text: "Booking Deleted",
          icon: "success",
          showConfirmationButton: false,
          timer: 2250
        })
      }
    })
  }

  useEffect(() => {
    if(roleId == 3 && booking.statusId.name == "pending") {
      setDisabledBtn(false) 
    } else if(roleId == 3 && booking.statusId.name == "aprroved") {
      setDisabledBtn(true)
    } else if(roleId == 3 && booking.statusId.name == "declined") {
      setDisabledBtn(true)
    }
  }, [booking])

  let payment = ""
  if(booking.isPaid == false) {
    payment = (
      <Fragment>
        <StripeForm
          toggle={toggle}
          roleId={roleId}
          email={booking.userId.email}
          amount={amount}
          booking={booking}
          payBooking={payBooking}
          GET_BOOKINGS_BY_USER={GET_BOOKINGS_BY_USER}
          userId={userId}
          setLoading={setLoading}
          bookingLoading={bookingLoading}
        />
    </Fragment>
    )
  } else if(booking.isPaid == true) {
    payment = (
      <Button className="mb-1 btn btn-block btn-sm btn-secondary" onClick={ e => onClickPaymentHandler(e) } disabled> PAID </Button>
    )
  }

  let approval = ""
  if(booking.statusId.name == "pending") {
    approval = (
      <button className="btn btn-sm btn-block bg-secondary" disabled><em className="mb-1 mx-1 text-white" disabled>{booking.statusId.name.toUpperCase()}</em></button>
    )
  } else if(booking.statusId.name == "approved") {
    approval = (
      <button className="btn btn-sm btn-block bg-info " disabled><em className="mb-1 mx-1 text-white" disabled>{booking.statusId.name.toUpperCase()}</em></button>
    )
  } else if(booking.statusId.name == "declined") {
    approval = (
      <button className="btn btn-sm btn-block bg-warning " disabled><em className="mb-1 mx-1 text-white" disabled>{booking.statusId.name.toUpperCase()}</em></button>
    )
  }

  return (
    <Fragment>
        <tr className="bottom-border">
          <th className="text-center">{index}</th>
          <td className="text-center">
            {moment(booking.startDate).format('MMMM DD, YYYY')}
            <br/>
            {booking.buildingId.name.toUpperCase()}
            <br/>
            {booking.locationId.name.toUpperCase()}
            
          </td>
          <td className="text-center">
            { approval }
            { payment }
            <Button className="mb-1 btn btn-sm btn-block btn-success " onClick={() => toggle(true, _id) } >View More Details</Button>
          </td>
        </tr>
    </Fragment>
  );
}

export default BookingRowUserMobile;
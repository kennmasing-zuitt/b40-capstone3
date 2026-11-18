import React, { Fragment, useState, useEffect } from 'react';
// import { Table, Col } from 'reactstrap';
import { button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';
import StripeForm from '../forms/StripeForm';

const BookingRowUser = (props) => {

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
  bookingLoading,
  stripePayment
} = props

const { _id, name, parkingId, isPaid, statusId, isCompleted, isArchived, createdAt, startDate, endDate, amount } = booking

const [ disabledBtn, setDisabledBtn ] = useState(false)
const [ disabledCompleteBtn, setDisabledCompleteBtn ] = useState(true)
const [ disabledApproveBtn, setDisabledApproveBtn ] = useState(true)
const [ disabledDeclineBtn, setDisabledDeclineBtn ] = useState(true)
const [ disabledArchiveBtn, setDisabledArchiveBtn ] = useState(true)

//USE EFFECT
useEffect(() => {
  if(roleId == 3 && booking.isPaid == true && booking.statusId.name == "pending"){
    setDisabledCompleteBtn(true)
  } else if(roleId == 3 && booking.isPaid == true && booking.statusId.name == "approved") {
    setDisabledCompleteBtn(false)
  } else {
    setDisabledCompleteBtn(true)
  }

  if(roleId == 3 && booking.isPaid == true && booking.isCompleted == true && booking.statusId.name == "approved"){
    setDisabledBtn(true)
  } else {
    setDisabledBtn(false)
  }
}, [booking])


const onClickPaymentHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
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
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isPaid ? "Unpaid" : "Paid"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickCompleteHandler = async (e) => {
  e.preventDefault();
  setLoading(true)

  try {
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
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isCompleted ? "On-going" : "Completed"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
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
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isArchived ? "Active" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickPendingHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
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
    Swal.fire({
      title: "Success",
      text: "Booking Pending",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickApproveHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
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
    Swal.fire({
      title: "Success",
      text: "Booking Approved",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickDeclineHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
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
    Swal.fire({
      title: "Success",
      text: "Booking Declined",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
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
  }).then( async response => {
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

let payment = ""
if(booking.isPaid == false) {
  payment = (
     <td><button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> UNPAID </button></td>
  )
} else if(booking.isPaid == true) {
  payment = (
   <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> PAID </button></td>
  )
}

let complete = ""
if(booking.isCompleted == false) {
  complete = (
     <td><button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled={disabledCompleteBtn}> ON-GOING </button></td>
  )
} else {
  complete = (
     <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled>  COMPLETED </button></td>
  )
}

let archival = ""
if(booking.isArchived == false) {
   archival = (
    <td><button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled={disabledArchiveBtn}> ACTIVE </button></td>
  )
} else {
  archival =(
   <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </button></td>
  )
}

let approval = ""
if(booking.statusId.name == "pending") {
  approval = (
    <td><button className="mb-1 btn btn-sm btn-success btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</button></td>
  )
} else if(booking.statusId.name == "approved") {
  approval = (
    <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</button></td>
  )
} else if(booking.statusId.name == "declined") {
  approval = (
    <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</button></td>
  )
} 

let payButton = ""
if(booking.isPaid == true){
  payButton = (
      <td className="text-left">
        <button className="mb-1 btn btn-sm btn-outline-secondary ml-1" onClick={() => toggle(true, _id) } disabled><i class="fas fa-credit-card"></i>&nbsp;&nbsp;PAY</button>
      </td>
  )
}else if(booking.isPaid == false){
  payButton = (
      <td className="text-center">
        <button className="mb-1 btn btn-sm btn-info ml-1" onClick={() => toggle(true, _id) } ><i class="fas fa-credit-card"></i>&nbsp;&nbsp;PAY</button>
        <button className="mb-1 btn btn-sm btn-warning ml-2" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i>&nbsp;&nbsp;CANCEL</button> {/*CANCEL*/}
      </td>
  )
}

let F1 = ""
if(booking.endDate == null){
  F1 = (
   <em>Date:</em>
  )
}else if(booking.endDate !== null){
  F1 = (
  <em>From:</em>
  )
}

let T1 = ""
if(booking.endDate == null){
  T1 = (
    ""
  )
}else if(booking.endDate !== null){
  T1 = (
  <em>Until:</em>
  )
}

let T2 = ""
if(booking.endDate == null){
  T2 = (
    ""
  )
}else if(booking.endDate !== null){
  T2 = (
  <h6>{booking.endDate ? moment(booking.endDate).format('MMMM DD, YYYY') : "N/A"} </h6>
  )
}

let deleteBtn = ""
if(booking.isPaid == true){
  deleteBtn = (
    ""
  )
} else if(booking.isPaid == false){
  deleteBtn = (
     <td className="no-gutters">
        <button className="mb-1 btn btn-sm btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i>&nbsp;CANCEL</button> {/*CANCEL*/}
      </td>
  )
}

const amountToDisplay = amount / 100

 return (
    <Fragment>
        <tr>
          <th className="text-center">{index}</th>
      <td className="text-center">
        {booking.userId.firstName.toUpperCase()} {booking.userId.lastName.toUpperCase()}
        <br/>
        {booking.userId.email}
        <br/>
        {booking._id}
      </td>
      <td className="text-right">
        <em> Created: </em>
        <br/>
        {F1}
        <br/>
        {T1}
      </td>
       <td className="text-left">
        {moment(booking.createdAt).fromNow()}
        <br/>
        {moment(booking.startDate).format('MMMM DD, YYYY')}
        <br/>
        {T2}
      </td>
      <td className="text-center">
        SLOT {booking.parkingId.name.toUpperCase()}       
        <br/>
        {booking.buildingId.name.toUpperCase()}
        <br/>
        {booking.locationId.name.toUpperCase()}
      </td>
      <td className="text-center">
        &#8369; {amountToDisplay}.00
      </td>
      { payment }
      { approval }
      { complete }
      { payButton }
        </tr>
    </Fragment>
  );
}

export default BookingRowUser;
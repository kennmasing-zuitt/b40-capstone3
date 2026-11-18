import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';
import StripeForm from '../forms/StripeForm';

const BookingsByUserRow = (props) => {

const {
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
  GET_BOOKINGS,
  refetchBookings,

  setLoading
} = props

const { _id, name, parkingId, isPaid, statusId, isCompleted, isArchived, createdAt, startDate, endDate, amount } = booking

const amountToDisplay = amount / 100

const [ disabledBtn, setDisabledBtn ] = useState(false)
const [ disabledCompleteBtn, setDisabledCompleteBtn ] = useState(true)
const [ disabledApproveBtn, setDisabledApproveBtn ] = useState(true)
const [ disabledDeclineBtn, setDisabledDeclineBtn ] = useState(true)
const [ disabledArchiveBtn, setDisabledArchiveBtn ] = useState(true)

//USE EFFECT
useEffect(() => {
  if(roleId == 2 && booking.statusId.name == "pending" && booking.isPaid == false) {
    setDisabledBtn(true) 
  } else if(roleId == 2 && booking.statusId.name == "pending" && booking.isPaid == true) {
    setDisabledBtn(false)
  } else {
    setDisabledBtn(true)
  }

  if(roleId == 2 && booking.statusId.name == "pending" && booking.isPaid == false) {
    setDisabledDeclineBtn(false) 
  } else if(roleId == 2 && booking.statusId.name == "pending" && booking.isPaid == true) {
    setDisabledDeclineBtn(true)
  } else if(roleId == 2 && booking.statusId.name == "approved" && booking.isPaid == true) {
    setDisabledDeclineBtn(true)
  } else {
    setDisabledDeclineBtn(false)
  }

  if(roleId == 2 && booking.isPaid == true && booking.statusId.name == "pending"){
    setDisabledCompleteBtn(true)
  } else if(roleId == 2 && booking.isPaid == true && booking.statusId.name == "approved") {
    setDisabledCompleteBtn(false)
  } else {
    setDisabledCompleteBtn(true)
  }

  if(roleId == 2 && booking.isPaid == true && booking.statusId.name == "pending"){
    setDisabledApproveBtn(false)
  } else if(roleId == 2 && booking.isPaid == true && booking.statusId.name == "approved") {
    setDisabledApproveBtn(true)
  } else {
    setDisabledApproveBtn(true)
  }

  if(roleId == 3 && booking.statusId.name == "pending") {
    setDisabledBtn(false) 
  } else if(roleId == 3 && booking.statusId.name == "aprroved") {
    setDisabledBtn(true)
  } else if(roleId == 3 && booking.statusId.name == "declined") {
    setDisabledBtn(true)
  }

  if(roleId == 2 && booking.statusId.name == "declined" && booking.isPaid == false) {
    setDisabledBtn(true) 
  } else if(roleId == 2 && booking.statusId.name == "declined" && booking.isCompleted == false) {
    setDisabledBtn(true)
  } else {
    setDisabledBtn(false)
  }

  if(roleId == 2 && booking.isCompleted == true && booking.isArchived == false){
    setDisabledArchiveBtn(false)
  } else if(roleId == 2 && booking.isCompleted == true && booking.isArchived == true){
    setDisabledArchiveBtn(true)
  } else {
    setDisabledArchiveBtn(true)
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
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isArchived ? "Active" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
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
      refetchBooking: [
        {
          query: GET_BOOKING,
          variables: {_id}
        }
      ]
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
      refetchBooking: [
        {
          query: GET_BOOKING,
          variables: {_id}
        }
      ]
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
      refetchBooking: [
        {
          query: GET_BOOKING,
          variables: {_id}
        }
      ]
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
  }).then(async response => {

  if(response.value){
    setLoading(true)
    await deleteBooking({
      variables: {
        _id
      },
      refetchBooking: [
        {
          query: GET_BOOKINGS,
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
if(roleId == 1 && booking.isPaid == false){
  payment = (
     <td><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> UNPAID </Button></td>
  )
} else if(roleId == 2 && booking.isPaid == false) {
  payment = (
     <td><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> UNPAID </Button></td>
  )
} else if(roleId == 3  && booking.isPaid == false) {
  payment = (
     <Fragment>
       <td>
        <StripeForm
          email={booking.userId.email}
          amount={amount}
          booking={booking}
          payBooking={payBooking}
          GET_BOOKINGS={GET_BOOKINGS}
        />
      </td>
    </Fragment>
  )
} else if(booking.isPaid == true) {
  payment = (
   <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> PAID </button></td>
  )
}

let complete = ""
if(roleId == 1 && booking.isCompleted == false){
  complete = (
     <td><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled> ON-GOING </Button></td>
  )
} else if(roleId == 2 && booking.isCompleted == false) {
  complete = (
     <td><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled> ON-GOING </Button></td>
  )
} else {
  complete = (
     <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled>  COMPLETED </button></td>
  )
}

let archival = ""
if(roleId == 1 && booking.isArchived == false){
  archival = (
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled> ACTIVE </Button></td>
  )
} else if(roleId == 2 && booking.isArchived == false) {
  archival = (
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled> ACTIVE </Button></td>
  )
} else {
  archival =(
   <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </button></td>
  )
}

let approval = ""
if(booking.statusId.name == "pending") {
  approval = (
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</Button></td>
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

let F1 = ""
if(booking.endDate == null){
  F1 = (
    ""
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
   <h6>{moment(booking.startDate).format("hh:mm A")}</h6>
  )
}else if(booking.endDate !== null){
  T2 = (
  <h6>{booking.endDate ? moment(booking.endDate).format('MMMM DD, YYYY') : "N/A"} </h6>
  )
}

let tableData = "";
if(roleId == 1) {
   tableData = (
    <Fragment>
      <th className="text-center">{index}</th>
      <td className="text-center">
        {booking.userId.firstName.toUpperCase()} {booking.userId.lastName.toUpperCase()}
        <br/>
        {booking.userId.email}
        <br/>
        {booking._id}
      </td>
      <td className="text-right">
        <em> Amount: </em>
        <br/>
        {F1}
        <br/>
        {T1}
      </td>
       <td className="text-left">
          &#8369; {amountToDisplay}.00
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
      { payment }
      { approval }
      { complete }
      { archival }
      <td className="text-right">
        <Button className="mb-1 btn btn-sm btn-success mr-4" onClick={() => toggle(true, _id) } ><i className="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
      </td>
    </Fragment>
  )
} else if(roleId == 2) {
   tableData = (
    <Fragment className="d-flex">
      <th className="text-center">{index}</th>
      <td className="text-center">
        {booking.userId.firstName.toUpperCase()} {booking.userId.lastName.toUpperCase()}
        <br/>
        {booking.userId.email}
        <br/>
        {booking._id}
      </td>
      <td className="text-right">
        <em> Amount: </em>
        <br/>
        {F1}
        <br/>
        {T1}
      </td>
      <td className="text-left">
         &#8369; {amountToDisplay}.00
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
      { payment }
      { approval }
      { complete }
      { archival }
      <td className="text-right pr-2">
        <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id) } ><i className="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
      </td>
    </Fragment>
  )
}

  return (
    <Fragment>
        <tr>
         { tableData }
        </tr>
    </Fragment>
  );
}

export default BookingsByUserRow;
import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

const BookingRowMobile = (props) => {

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

const [ disabledBtn, setDisabledBtn ] = useState(false)
const [ disabledDeclineBtn, setDisabledDeclineBtn ] = useState(true)

const amountToDisplay = amount / 100

const onClickPaymentHandler = (e) => {
    e.preventDefault();
    payBooking({
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
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isPaid ? "Unpaid" : "Paid"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickCompleteHandler = (e) => {
    e.preventDefault();
    completeBooking({
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
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isCompleted ? "On-going" : "Completed"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickArchiveHandler = (e) => {
    e.preventDefault();
    archiveBooking({
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
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isArchived ? "Active" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickPendingHandler = (e) => {
    e.preventDefault();
    pendingBooking({
      variables: {
        _id
      },
      refetchBooking: [{
        query: GET_BOOKING,
        variables: {_id}
      }]
    })
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: "Booking Pending",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickApproveHandler = (e) => {
    e.preventDefault();
    approveBooking({
      variables: {
        _id
      },
      refetchBooking: [{
        query: GET_BOOKING,
        variables: {_id}
      }]
    })
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: "Booking Approved",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickDeclineHandler = (e) => {
    e.preventDefault();
    declineBooking({
      variables: {
        _id
      },
      refetchBooking: [{
        query: GET_BOOKING,
        variables: {_id}
      }]
    })
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: "Booking Declined",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Delete Booking",
      text: "Are you sure you want to delete booking?",
      focusConfirm: false,
      showCloseButton: true
    }).then(response => {

      if(response.value){
        deleteBooking({
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

let approval = ""
if(booking.statusId.name == "pending") {
  approval = (
    <button className="btn btn-sm btn-block btn-outline-secondary mb-1" disabled>{booking.statusId.name.toUpperCase()}</button>
  )
} else if(booking.statusId.name == "approved") {
  approval = (
    <button className="btn btn-sm btn-block btn-info mb-1" disabled>{booking.statusId.name.toUpperCase()}</button>
  )
} else if(booking.statusId.name == "declined") {
  approval = (
    <button className="btn btn-sm btn-block btn-warning mb-1" disabled>{booking.statusId.name.toUpperCase()}</button>
  )
} 

let tableData = "";
if(roleId == 1) {
   tableData = (
    <Fragment>
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
        <Button className="mb-1 btn btn-sm btn-block btn-success" onClick={() => toggle(true, _id) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
      </td>
    </Fragment>
  )
} else if(roleId == 2) {
   tableData = (
    <Fragment>
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
        <Button className="mb-1 btn btn-sm btn-block btn-success " onClick={() => toggle(true, _id) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
      </td>
    </Fragment>
  )
}

  return (
    <Fragment>
        <tr className="bottom-border">
          {tableData}
        </tr>
    </Fragment>
  );
}

export default BookingRowMobile;
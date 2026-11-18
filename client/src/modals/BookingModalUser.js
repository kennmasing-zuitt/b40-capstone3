import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Table, Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import StripeForm from '../forms/StripeForm';

const BookingModalUser = (props) => {

  const {
    userId,
    modal,
    toggle,
    roleId,
    booking,
    payBooking,
    completeBooking,
    archiveBooking,
    pendingBooking,
    approveBooking,
    declineBooking,
    deleteBooking,
    GET_BOOKING,
    GET_BOOKINGS,
    GET_BOOKINGS_BY_USER,
    refetchBooking,
    refetchBookings,
    setLoading,
    bookingLoading,
    stripePayment
  } = props
 
  const amountToDisplay = booking.amount / 100

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

  const _id = booking._id

  const onClickPaymentHandler = async (e) => {
    e.preventDefault();
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
    // if(bookingLoading) return <Spinner color="primary" />
    toggle(true, _id)
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isPaid ? "Unpaid" : "Paid"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickCompleteHandler = async (e) => {
    e.preventDefault();
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
    // if(bookingLoading) return <Spinner color="primary" />
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isCompleted ? "On-going" : "Completed"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickArchiveHandler = async (e) => {
    e.preventDefault();
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
    // if(bookingLoading) return <Spinner color="primary" />
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `Booking ${booking.isArchived ? "Active" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickPendingHandler = async (e) => {
    e.preventDefault();
    await pendingBooking({
      variables: {
        _id
      },
      refetchBooking: [{
        query: GET_BOOKING,
        variables: {_id}
      }]
    })
    // if(bookingLoading) return <Spinner color="primary" />
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: "Booking Pending",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickApproveHandler = async (e) => {
    e.preventDefault();
    await approveBooking({
      variables: {
        _id
      },
      refetchBooking: [{
        query: GET_BOOKING,
        variables: {_id}
      }]
    })
    // if(bookingLoading) return <Spinner color="primary" />
    toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: "Booking Approved",
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }

  const onClickDeclineHandler = async (e) => {
    e.preventDefault();
    await declineBooking({
      variables: {
        _id
      },
      refetchBooking: [{
        query: GET_BOOKING,
        variables: {_id}
      }]
    })
    // if(bookingLoading) return <Spinner color="primary" />
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
        // if(bookingLoading) return <Spinner color="primary" />
        toggle(true, {_id: ""})
      }
    })
  }

  let payment = ""
  if(booking.isPaid == false) {
      payment = (
         <Fragment>
           <td>
            <StripeForm
              email={booking.userId.email}
              amount={booking.amount}
              booking={booking}
              payBooking={payBooking}
              GET_BOOKINGS_BY_USER={GET_BOOKINGS_BY_USER}
              userId={userId}
              setLoading={setLoading}
              bookingLoading={bookingLoading}
              stripePayment={stripePayment}
              disabled
            />
          </td>
        </Fragment>
      )
  } else if(booking.isPaid == true) {
    payment = (
      <td className="md-10"> <button className="mb-1 btn btn-sm btn-outline-secondary ml-1" onClick={() => toggle(true, _id) } disabled>PAID</button></td>
    )
  }

  let complete = ""
  if(booking.isCompleted == false) {
    complete = (
       <td className="md-10"><Button className="mb-1 btn btn-sm btn-warning btn-block" onClick={ e => onClickCompleteHandler(e) } disabled={disabledCompleteBtn}> ON-GOING </Button></td>
    )
  } else {
    complete = (
       <td className="md-10"><button className="mb-1 btn btn-sm btn-outline-secondary btn-block" onClick={ e => onClickCompleteHandler(e) } disabled>  COMPLETED </button></td>
    )
  }

  let archival = ""
  if(booking.isArchived == false) {
     archival = (
      <td className="md-10"><Button className="mb-1 btn btn-sm btn-success btn-block" onClick={ e => onClickArchiveHandler(e) } > ACTIVE </Button></td>
    )
  } else {
    archival =(
     <td className="md-10"><button className="mb-1 btn btn-sm btn-outline-secondary btn-block" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </button></td>
    )
  }

  let approval = ""
  if(booking.statusId && booking.statusId.name == "pending") {
    approval = (
      <td className="md-10"><Button className="mb-1 btn btn-sm btn-success btn-block" disabled>{booking.statusId && booking.statusId.name.toUpperCase()}</Button></td>
    )
  } else if(booking.statusId && booking.statusId.name == "approved") {
    approval = (
      <td className="md-10"><button className="mb-1 btn btn-sm btn-outline-secondary btn-block" disabled>{booking.statusId && booking.statusId.name.toUpperCase()}</button></td>
    )
  } else if(booking.statusId && booking.statusId.name == "declined") {
    approval = (
      <td className="md-10"><button className="mb-1 btn btn-sm btn-outline-secondary btn-block" disabled>{booking.statusId && booking.statusId.name.toUpperCase()}</button></td>
    )
  } 

  let bookedDate = ""
  if(booking.endDate != null){
    bookedDate = (
      <td>{booking.startDate && moment(booking.startDate).format('MMMM DD, YYYY')} &nbsp;-&nbsp; {booking.endDate && moment(booking.endDate).format('MMMM DD, YYYY')}</td>
    )
  } else {
    bookedDate = (
      <td>{booking.startDate && moment(booking.startDate).format('MMMM DD, YYYY')}</td>
    )
  }

  return (
      <Fragment>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>VIEW BOOKING DETAILS</ModalHeader>
          <ModalBody>
           <Table>
              <thead>
                <tr>
                  <th>DETAILS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Booking ID:</td>
                  <td>{booking._id}</td>
                </tr>
                <tr>
                  <td>User:</td>
                  <td>{booking.userId && booking.userId.firstName.toUpperCase()} {booking.userId && booking.userId.lastName.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  {bookedDate}
                </tr>
                <tr>
                  <td>Slot:</td>
                  <td>{booking.parkingId && booking.parkingId.name.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>Building:</td>
                  <td>{booking.buildingId && booking.buildingId.name.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>{booking.locationId && booking.locationId.name.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>Amount:</td>
                  <td> &#8369; {amountToDisplay}.00</td>
                </tr>
              </tbody>
            </Table>
            <br/>
            <Table>
              <thead>
                <tr>
                  <th className="text-left">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {payment}
                </tr>
                <tr>
                  {complete}
                </tr>
                <tr>
                  {approval}
                </tr>
                <tr>
                  <td className="md-10">
                     <Button className="mb-1 btn btn-sm btn-block btn-warning" onClick={ e => onClickDeleteHandler(e) } disabled={disabledBtn}><i class="fas fa-trash-alt"></i>&nbsp;CANCEL BOOKING</Button>
                  </td>
                </tr>
              </tbody>
            </Table>

            <Form>
              <div className="d-flex justify-content-end mr-3">
                <Button className="btn btn-secondary" onClick={() => toggle(true, _id) }>CLOSE</Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
  );
}

export default BookingModalUser;

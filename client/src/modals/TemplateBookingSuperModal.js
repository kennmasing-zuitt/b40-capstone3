import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody,
  Table,
  Container, Row, Col
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const BookingModalSuperAdmin = (props) => {

  const {
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
    refetchBooking,
    refetchBookings,
    setLoading
  } = props

  const [ disabledBtn, setDisabledBtn ] = useState(false)
  const [ disabledDeclineBtn, setDisabledDeclineBtn ] = useState(true)

  const _id = booking._id

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
      await Swal.fire({
        title: "Success",
        text: `Booking ${booking.isPaid ? "Unpaid" : "Paid"}`,
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
      // toggle(false, _id)
      setLoading(false)
    } catch(e){
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
      // await toggle(false, _id)
      setLoading(false)
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
    // setLoading(true)
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
      await toggle(false, _id)
      // setLoading(false)
      Swal.fire({
        title: "Success",
        text: `Booking ${booking.isArchived ? "Active" : "Archived"}`,
        icon: "success",
        showConfirmationButton: false,
        timer: 1500
      })
    } catch(e){
      // setLoading(false)
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
      // await toggle(false, _id)
      setLoading(false)
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
      // await toggle(false, _id)
      setLoading(false)
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
      // await toggle(false, _id)
      setLoading(false)
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
              query: GET_BOOKINGS,
              variables: {_id}
            }
          ]
        })
        await toggle(true, {_id: ""})
        setLoading(false)
      }
    })
  }

  let payment = ""
  if(booking.isPaid == false) {
    payment = (
      <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled={disabledBtn}> UNPAID </Button></td>
    )
  } else if(booking.isPaid == true) {
    payment = (
      <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> PAID </Button></td>
    )
  }

  let complete = ""
  if(booking.isCompleted == false) {
    complete = (
       <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled={disabledBtn}> ON-GOING </Button></td>
    )
  } else {
    complete = (
       <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickCompleteHandler(e) } disabled>  COMPLETED </Button></td>
    )
  }

  let archival = ""
  if(booking.isArchived == false) {
     archival = (
      <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } > ACTIVE </Button></td>
    )
  } else {
    archival =(
     <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </Button></td>
    )
  }

  let approval = ""
  if(booking.statusId && booking.statusId.name == "pending") {
    approval = (
      <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" disabled>{booking.statusId && booking.statusId.name.toUpperCase()}</Button></td>
    )
  } else if(booking.statusId && booking.statusId.name == "approved") {
    approval = (
      <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" disabled>{booking.statusId && booking.statusId.name.toUpperCase()}</Button></td>
    )
  } else if(booking.statusId && booking.statusId.name == "declined") {
    approval = (
      <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" disabled>{booking.statusId && booking.statusId.name.toUpperCase()}</Button></td>
    )
  } 

  let tableData = "";
  if(roleId == 1) {
    tableData = (
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
                  <td>{booking.startDate && moment(booking.startDate).format('MMMM DD, YYYY')}</td>
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
              </tbody>
              <br/>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th className="text-left">STATUS</th>
                </tr>
              </thead>
            </Table>
            <Table>
              <tbody className="md-12">
                <tr className="md-12">
                  {payment}
                  <td className="text-right md-2 no-gutters">
                    <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={ e => onClickPaymentHandler(e) }><i class="fas fa-credit-card"></i></Button>
                  </td>
                </tr>
                <tr className="md-12">
                  {approval}
                  <td className="text-right md-2 no-gutters">
                    <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={ e => onClickApproveHandler(e) }><i class="far fa-thumbs-up"></i></Button>
                    <Button className="mb-1 btn btn-sm btn-warning ml-1" onClick={ e => onClickDeclineHandler(e) }><i class="fas fa-ban"></i></Button>
                    <Button className="mb-1 btn btn-sm btn-secondary ml-1" onClick={ e => onClickPendingHandler(e) }><i class="fas fa-wrench"></i></Button>
                  </td>
                </tr>
                <tr className="md-12">
                  {complete}
                  <td className="text-right md-2 no-gutters">
                     <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={ e => onClickCompleteHandler(e) }><i class="fas fa-check-square"></i></Button>
                  </td>
                </tr>
                <tr className="md-12">
                  {archival}
                  <td className="text-right md-2 no-gutters">
                    <Button className="mb-1 btn btn-sm btn-secondary ml-1" onClick={ e => onClickArchiveHandler(e) }><i class="fas fa-archive"></i></Button> 
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <tr>
                <td className="no-gutters">
                  <Button className="mb-1 btn btn-sm btn-block btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i>&nbsp;DELETE BOOKING</Button> {/*CANCEL*/}
                </td>
              </tr>
            </Table>
            <Form>
              <div className=" d-flex justify-content-end">
                <Button className="btn btn-secondary mr-3" onClick={() => toggle(true, _id) }>CLOSE</Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  } else if(roleId == 2) {
    tableData = (
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
                  <td>{booking.startDate && moment(booking.startDate).format('MMMM DD, YYYY')}</td>
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
                  {archival}
                </tr>
              </tbody>
            </Table>
            <Table>
              <tbody className="md-12">
                <tr className="">
                  {approval}
                  <td className="md-5 text-right no-gutters">
                    <Button className="mb-1 btn btn-sm btn-info ml-1 sm-2 col-3 no-gutters" onClick={ e => onClickApproveHandler(e) } disabled={setDisabledBtn}><i class="far fa-thumbs-up"></i></Button>
                    <Button className="mb-1 btn btn-sm btn-warning ml-1 sm-2 col-3 no-gutters" onClick={ e => onClickDeclineHandler(e) } disabled={setDisabledBtn}><i class="fas fa-ban"></i></Button>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <tr className="md-12 no-gutters">
                <td className="md-10 no-gutters">
                  <Button className="mb-1 btn btn-sm btn-block btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i>&nbsp;CANCEL BOOKING</Button> {/*CANCEL*/}
                </td>
              </tr>
            </Table>
            <Form>
              <div className=" d-flex justify-content-end no-gutters">
                <Button className="btn btn-secondary" onClick={() => toggle(true, _id) }>CLOSE</Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }

  return (
    <Fragment>
      { tableData }
    </Fragment>
  );
}

export default BookingModalSuperAdmin;
import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import BookingsByUserRow from '../rows/BookingsByUserRow';

const BookingsByUserTable = (props) => {

  let rows;
  if(props.bookings && props.bookings.length === 0) {
    return (
      rows = (
        <tr>
          <td></td>
          <td>
              <em>There are currently no bookings.</em>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    )
  } else {
    let i = 0;
    rows = (
        props.bookings.map(booking => {
        return <BookingsByUserRow
    			token={props.token}
    			roleId={props.roleId}
        	toggle={props.toggle}
    			booking={booking}
    			key={booking._id}
    			index={++i}
    			payBooking={props.payBooking}
    			completeBooking={props.completeBooking}
    			archiveBooking={props.archiveBooking}
    			pendingBooking={props.pendingBooking}
    			approveBooking={props.approveBooking}
    			declineBooking={props.declineBooking}
    			deleteBooking={props.deleteBooking}
        	GET_BOOKING={props.GET_BOOKING}
          GET_BOOKINGS={props.GET_BOOKINGS}
          refetchBookings={props.refetchBookings}
          setLoading={props.setLoading}
        />
      })
    )
  }

  console.log("ROWS", rows)

let tableHeaders = "";
if(props.roleId == 1) {
   tableHeaders = (
    <Fragment>
      <th className="text-center">#</th>
      <th className="text-center">User & Booking ID</th>
      <th className="text-right">Amount</th>
      <th className="text-left">& Reservation Date</th>
      <th className="text-center">Parking Slot</th>
      <th className="text-center">Payment </th>
      <th className="text-center">Approval </th>
      <th className="text-center">Completion </th>
      <th className="text-center">Archival </th>
      <th className="text-right">Super Admin Actions</th>
    </Fragment>
  )
} else if(props.roleId == 2) {
   tableHeaders = (
    <Fragment>
      <th className="text-center">#</th>
      <th className="text-center">User & Booking ID</th>
      <th className="text-right">Amount</th>
      <th className="text-left">& Reservation Date</th>
      <th className="text-center">Parking Slot</th>
      <th className="text-center">Payment Status</th>
      <th className="text-center">Approval Status</th>
      <th className="text-center">Completion Status</th>
      <th className="text-center">Archival Status</th>
      <th className="text-right">Admin Actions</th>
    </Fragment>
  )
} 

  return (
    <Table responsive hover borderless size="sm" className="p-4 rounded">
      <thead>
        <tr>
          { tableHeaders }
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
  );
}

export default BookingsByUserTable;
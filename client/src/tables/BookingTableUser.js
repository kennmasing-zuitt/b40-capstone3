import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import BookingRowUser from '../rows/BookingRowUser';

const BookingTableUser = (props) => {

  let rows = "";
  if(props.bookings && props.bookings.length === 0) {
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
  } else {
    let i = 0;
    rows = (
        props.bookings.map(booking => {
        return <BookingRowUser
    			userId={props.userId}
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
          GET_BOOKINGS_BY_USER={props.GET_BOOKINGS_BY_USER}
          refetchBookings={props.refetchBookings}
          setLoading={props.setLoading}
          bookingLoading={props.bookingLoading}
          stripePayment={props.stripePayment}
        />
      })
    )
  }

 return (
    <Table responsive hover light borderless size="sm" className="p-4 rounded">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">User & Booking ID</th>
          <th className="text-right">Creation</th>
          <th className="text-left">& Reservation Date</th>
          <th className="text-center">Parking Slot</th>
          <th className="text-center">Amount</th>
          <th className="text-center">Payment Status</th>
          <th className="text-center">Approval Status</th>
          <th className="text-center">Completion Status</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
  );
}

export default BookingTableUser;
import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import BookingRowUserMobile from '../rows/BookingRowUserMobile';

const BookingTableUserMobile = (props) => {

  let rows;
  if(props.bookings && props.bookings.length === 0) {
    rows = (
      <tr>
          <td></td>
          <td>
              <em>There are currently no bookings.</em>
          </td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.bookings.map(booking => {
        return <BookingRowUserMobile
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
    <Fragment>
      <Table responsive hover light borderless size="sm" className="p-4 rounded">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Details</th>
            <th className="text-center">Status/Actions</th>
          </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default BookingTableUserMobile;
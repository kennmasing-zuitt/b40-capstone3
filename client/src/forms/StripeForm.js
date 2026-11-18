import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { URL, PUBLISHABLE_KEY } from '../config';
import Swal from 'sweetalert2';

const StripeForm = (props) => {

const {
    userId,
    toggle,
    roleId,
    email,
    amount,
    booking,
    payBooking,
    GET_BOOKINGS_BY_USER,
    setLoading,
    stripePayment
} = props

    const _id = booking._id
    const checkout = token => {
        
        stripePayment({
            variables:{
                token: token.id,
                amount
            }
        }).then(response => {
            payBooking({
                    variables: {
                    _id,
                    isPaid: !booking.isPaid
                },
                refetchQueries: [
                    {
                        query: GET_BOOKINGS_BY_USER,
                        variables: { userId }
                    }
                ]
                })
                Swal.fire({
                    title: "Success",
                    text: "Booking Paid.",
                    icon: "success",
                    showConfirmationButton: false,
                    timer: 3000
                })

            // console.log("STRIPE FORM", response.value)
        }).catch(error => {
            console.log("Payment Error", error)
            Swal.fire({
                title: "Error",
                text: "Payment Error.",
                icon: "error",
                showConfirmationButton: false,
                timer: 3000
            })
        })   
    }
    
    return (
        <StripeCheckout
            email={email}
            label="Card Payment"
            name="PARQER BOOKING"
            description="Reserve a slot. Commute to work."
            panelLabel="Submit"
            token={checkout}
            stripeKey={PUBLISHABLE_KEY}
            billingAddress={false}
            currency="PHP"
            allowRememberMe={false}
            className="btn btn-block"
        />
    )
}

export default StripeForm;

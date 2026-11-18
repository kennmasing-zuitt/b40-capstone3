import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { URL, PUBLISHABLE_KEY } from '../config';

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
    setLoading    
} = props

    const _id = booking._id
    const checkout = token => {
        
        setLoading(true)
        const body = {
            token,
            amount
        }
        axios
            .post(`${URL}/payments`, body)
            .then(response => {
                console.log(response)
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

                // if(roleId == 3){
                //     toggle(false, _id)
                // }        
            setLoading(false)
            })
            .catch(error => {
                console.log("Payment error", error)
            })
            // setLoading(false)
    }
    
    return (
        <StripeCheckout
            email={email}
            label="Card Payment"
            name="MERN Tracker App"
            description="App tagline here..."
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
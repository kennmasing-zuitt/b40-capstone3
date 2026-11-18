const express = require("express");
const router = express.Router();
const stripe = require('stripe')("--- IGNORE ---");
const sendgrid = require("../middleware/sendgrid.js")

router.post("/", (req, res) => {
    
    const stripeChargeCallback = res => (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({ error: stripeErr })
       		console.log("STRIPE ERROR", stripeErr)	
        } else {
            //(1) SAVE TO DB (NEW BOOKING)

            
            //(2) SEND A CONFIRMATION EMAIL (email, amount, stripePaymentCode)
            sendgrid.sendPaymentConfirmation(stripeRes.email, stripeRes.amount, stripeRes.id)

            res.status(200).send({ success: stripeRes })
       		console.log("STRIPE RESPONSE", stripeRes)	
        }
    }

    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        email: req.body.email,
        currency: "PHP"
    }

    stripe.charges.create(body, stripeChargeCallback(res));
})

module.exports = router;
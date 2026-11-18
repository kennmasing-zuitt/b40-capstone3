const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("--- IGNORE ---")

//SEND STRIPE PAYMENT CONFIRMATION
const sendPaymentConfirmation = (email, amount, stripePaymentCode) => {
	//CREATE EMAIL CONTENT
	const msg = {
		to: email,
		from: "admin.parqer@parqer.com",
		subject: "PARQER: STRIPE PAYMENT CONFIRMATION",
		text: `You paid PHP${amount} via Stripe Payment. Your transaction code is ${stripePaymentCode}.`,
        html: `<div>You paid PHP${amount} via Stripe Payment. Your transaction code is <strong>${stripePaymentCode}</strong>.</div>`
	}
	//SEND MAIL
	sgMail.send(msg)
}

//SEND REGISTRATION CONFIRMATION
const sendRegisterConfirmation = (username, email) => {
	const msg = {
		to: email,
		from: "admin.parqer@parqer.com",
		subject: "PARQER: NEW USER REGISTRATION",
		text: `Hello ${username}. You have successfully registered a new account using ${email}.`,
        html: `<div>Hello <strong>${username}</strong>. You have successfully registered a new account using ${email}.</div>`
	}
	sgMail.send(msg)
}

//SEND ACCOUNT DELETION EMAIL

module.exports = { sendPaymentConfirmation, sendRegisterConfirmation }
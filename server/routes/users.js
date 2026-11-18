//DECLARE DEPENDENCIES
const User = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const sendgrid = require("../middleware/sendgrid")


//-----CREATE NEW ROUTES-----
//(D) LOGIN
router.post("/login", async(req, res) => {

	try {
		let user = "";
		if( !req.body.username ) {
			user = await User.findOne({ email: req.body.email });	
			// console.log(req.body.email);
		} else {
			// console.log(req.body.username);
			user = await User.findOne({ username: req.body.username });	
		}

		if(!user) {
			return res.status(404).send({"message" : "Invalid login credentials YYYY!"})
		}

		// //comparing req pw vs unhashed db password
		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if(!isMatch) {
			return res.status(500).send({"message" : "Invalid login credentials XXXXX!"})
		}

		//GENERATE A TOKEN
		const token = await user.generateAuthToken();

		//S04 CONNECTING TO BACKEND
		// console.log(user);

		res.send({user, token});
	} catch(e) {
		
		//S04 CONNECTING TO BACKEND
		console.log(e)
		res.status(500).send(e);
	}
});

//(STRETCH GOAL) LOGOUT OF ONE DEVICE
router.post('/logout', auth, async (req, res) => {
  	console.log(req.user)
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send(req.user);

    } catch (e) {
        res.status(500).send(e)
    }
})

//(ACTIVITY 5) LOGOUT OF ALL DEVICES
router.post('/logoutAll', auth, async (req, res) => {
 // console.log(req.user)
 try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send("You've been successfully logged out of all devices!")

    } catch (e) {
        res.status(500).send(e)
    }

});

//EXPORT ROUTER
module.exports = router;

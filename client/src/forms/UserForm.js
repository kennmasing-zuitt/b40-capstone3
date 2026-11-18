import React, { Fragment, useState, useEffect } from 'react';
import {
	Container, Row, Col,
	Button, Form, FormGroup, Label, Input,
	Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

const UserForm = (props) => {
	
	// const {
	// 	createLocation,
	// 	GET_LOCATIONS,
	// 	setLoading
	// } = props;

	// const [formData, setFormData] = useState({
	// 	name: ""
	// })

	// const { name } = formData

	// const [disabledBtn, setDisabledBtn] = useState(true); //BUTTON IS CURRENTLY DISABLED
	// const [isRedirected, setIsRedirected] = useState(false); //NOT REDIRECTED UNTIL REGISTER & SUBMIT

	// const onChangeHandler = e => {
	// 	setFormData({
	// 		...formData,
	// 		[e.target.name] : e.target.value
	// 	})
	// }

	// const onSubmitHandler = async e => {
	// 	e.preventDefault()

	// 	try {

	// 		await createLocation({
	// 			variables: {...formData},
	// 			refetchQueries: [
	// 				{
	// 					query: GET_LOCATIONS
	// 				}
	// 			]
	// 		})

 //        	Swal.fire({
 //              title: "Success",
 //              // text: "Successfully created new location!",
 //              html: `Location Creation Successful!<br>Name: "${name.toUpperCase()}"`,
 //              icon: "success",
 //              showConfirmationButton: false,
 //              timer: 3000
 //            })
 //        	// setIsRedirected(true)

 //        	// return window.location = "/locations"
	// 	} catch(e) {
	// 		 Swal.fire({
 //              title: "Error",
 //              text: "Location Creation: Error",
 //              icon: "error",
 //              showConfirmationButton: false,
 //              timer: 3000
 //            })
	// 		console.log(e)
	// 	}
	// }

	//   //USE EFFECT
 //  useEffect(() => {
 //    if(name !== "") {
 //      setDisabledBtn(false)
 //    } else {
 //      setDisabledBtn(true)
 //    }
 //  }, [formData])

 //  // REDIRECT CONDITION
 //  // if(isRedirected) {
 //  //   return <Redirect to="/locations" />
 //  // }
  


	// return (
	// 	<Fragment>
	// 		<Form className="mb-5 container-fluid col-10 offset-md-1 border border-light rounded" onSubmit={ e => onSubmitHandler(e) }>
	// 			<div className=" d-flex justify-content-center mt-3">
	// 				<h4 className="form-hdr">ADD NEW LOCATION</h4>
	// 			</div>
	// 			<FormGroup className="mt-1">
	// 				<Label>Name</Label>
	// 				<Input
	// 					type="text"
	// 		        	name="name"
	// 		        	id="name"
	// 		        	value={name}
	// 		        	onChange={ e => onChangeHandler(e) }
	// 		        	maxLength="30"
	// 		        	required
	// 				/>
	// 			</FormGroup>
	// 			{/*<FormGroup>
	// 				<Label>XXXXX</Label>
	// 				<Input
	// 					type="text"
	// 		        	name="Locations"
	// 		        	id="Locations"
	// 		        	required
	// 				/>
	// 			</FormGroup>
	// 			<FormGroup className="mb-5">
	// 				<Label>XXXXX</Label>
	// 				<Input
	// 					type="text"
	// 		        	name="slot"
	// 		        	id="slot"
	// 		        	required

	// 				/>
	// 			</FormGroup>*/}
	// 			<Button className="btn btn-block btn-primary mb-4">Save Changes</Button>
	// 		</Form>
	// 	</Fragment>
	// )
  return(
   <Fragment>
		<Form className="mb-5 container-fluid col-10 offset-md-1 border border-light rounded">
			<div className=" d-flex justify-content-center mt-3">
				<h4 className="form-hdr">ADD NEW USER</h4>
			</div>
			<FormGroup className="mt-1">
				<Label>Name</Label>
				<Input
					type="text"
		        	name="name"
		        	id="name"
		        	value=""
		        	onChange=""
		        	maxLength="30"
		        	required
				/>
			</FormGroup>
			<Button className="btn btn-block btn-primary mb-4">Save Changes</Button>
		</Form>
	</Fragment>
  )
}

export default UserForm;
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

const CurrentUserForm = (props) => {
	
	const {
		toggle,
		user,
		createUser,
		GET_USERS_BY_ROLE_ID,

	} = props;

  const [formData, setFormData] = useState({
	    _id: "",
	    firstName: "",
	    lastName: "",
	    username: "",
	    email: "",
  })

  useEffect(() => {
  	setFormData({
  		_id: user._id,
	    firstName: user.firstName,
	    lastName: user.lastName,
	    username: user.username,
	    email: user.email,
  	})
  }, [props.user])

	const { _id, firstName, lastName, username, email, roleId } = formData

	const [disabledBtn, setDisabledBtn] = useState(true);
	const [isRedirected, setIsRedirected] = useState(false);

	const onChangeHandler = e => {
		setFormData({
			...formData,
			[e.target.name] : e.target.value
		})
	}

  useEffect(() => {
    if(firstName !== "" && lastName !== "" && username !== "" && email !== "") {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [formData])

  return(
   <Fragment>
		<Form className="my-5 container-fluid col-10 offset-md-1 border-light-grey rounded" >
			<div className=" d-flex justify-content-center mt-3">
				<h4 className="form-hdr">USER DETAILS</h4>
			</div>
			 <FormGroup>
	            <Label for="firstName" className="mb-n5">First Name</Label>
	            <Input
	              type="text"
	              name="firstName"
	              id="firstName"
	              value={firstName.toUpperCase()}
	              onChange={ e => onChangeHandler(e) }
	              disabled
	              maxLength="20"
	              pattern="[a-zA-Z\s]+"
	              required
	            />
	      </FormGroup>
	      <FormGroup>
	            <Label for="lastName" className="mb-n5">Last Name</Label>
	            <Input
	              type="text"
	              name="lastName"
	              id="lastName"
	              value={lastName.toUpperCase()}
	              onChange={ e => onChangeHandler(e) }
	              disabled
	              maxLength="20"
	              pattern="[a-zA-Z\s]+"
	              required
	            />
	      </FormGroup>
	      <FormGroup>
	            <Label for="username" className="mb-n5">Username</Label>
	            <Input
	              type="text"
	              name="username"
	              id="username"
	              value={username}
	              onChange={ e => onChangeHandler(e) }
	              disabled
	              maxLength="20"
	              pattern="[a-zA-Z0-9]+"
	              required
	            />
	      </FormGroup>
	      <FormGroup>
	        <Label for="email" className="mb-n5">Email</Label>
	        <Input
	        	className="mb-5"
	          type="email"
	          name="email"
	          id="email"
	          value={email}
	          onChange={ e => onChangeHandler(e) }
	          disabled
	          required
	        />
	      </FormGroup>
			<Button className="btn btn-block btn-primary mb-4" disabled={disabledBtn} onClick={ ()=> toggle(true, _id, firstName, lastName, username, email) }>UPDATE USER DETAILS</Button>
		</Form>
	</Fragment>
  )
}

export default CurrentUserForm;
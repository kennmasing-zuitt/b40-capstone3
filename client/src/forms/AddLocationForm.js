import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

const AddLocationForm = (props) => {
	
	const {
		createLocation,
		limit,
		GET_LOCATIONS,
		setLoading
	} = props;

	const [formData, setFormData] = useState({
		name: ""
	})

	const { name } = formData

	const [disabledBtn, setDisabledBtn] = useState(true);
	const [isRedirected, setIsRedirected] = useState(false);

	const onChangeHandler = e => {
		setFormData({
			...formData,
			[e.target.name] : e.target.value
		})
	}

	const onSubmitHandler = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			await createLocation({
				variables: {...formData},
				refetchQueries: [
					{
						query: GET_LOCATIONS,
						variables: {
							limit: limit
						}
					}
				]
			})
        	Swal.fire({
              title: "Success",
              html: `Location Creation Successful!<br>Name: "${name.toUpperCase()}"`,
              icon: "success",
              showConfirmationButton: false,
              timer: 3000
            })
            setLoading(false)
		} catch(e) {
			 Swal.fire({
              title: "Error",
              text: "Location Creation: Error",
              icon: "error",
              showConfirmationButton: false,
              timer: 3000
            })
			setLoading(false)
			console.log(e)
		}
	}

  useEffect(() => {
    if(name !== "") {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [formData])

	return (
		<Fragment>
			<Form className="mb-5 container-fluid col-12 border-light-grey rounded" onSubmit={ e => onSubmitHandler(e) }>
				<div className=" d-flex justify-content-center mt-3">
					<h4 className="form-hdr">ADD NEW LOCATION</h4>
				</div>
				<FormGroup className="mt-1">
					<Label>Name</Label>
					<Input
						type="text"
			        	name="name"
			        	id="name"
			        	value={name}
			        	onChange={ e => onChangeHandler(e) }
			        	maxLength="30"
			        	required
					/>
				</FormGroup>
				<Button className="btn btn-block btn-primary mb-4">Save Changes</Button>
			</Form>
		</Fragment>
	)
}

export default AddLocationForm;
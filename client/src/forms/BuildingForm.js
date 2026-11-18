import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';

const BuildingForm = (props) => {
	
	const {
		createBuilding,
		updateBuilding,
		deleteBuilding,
		GET_BUILDINGS,
		refetchBuildings,
		refetchBldgsByLoc,
		setLoading
	} = props;

	const [arrayData, setArrayData] = useState({
		locations: [],
		buildings: []
	})

	const { locations } = arrayData

	useEffect(() => {
		setArrayData({
			locations: props.locations
		})
	}, [props])

	const [formData, setFormData] = useState({
		name: "",
		locationId: ""
	})

	const { locationId, name } = formData

	const [disabledBtn, setDisabledBtn] = useState(true);
	const [isRedirected, setIsRedirected] = useState(false);

 	const populateLocations = () => {
  		return locations.map(location => {
  			return (
  				<option
  					key={location._id}
  					value={location._id}
  					selected={locationId ? location._id : ""}
  				>
  				{location.name.toUpperCase()}
  				</option>
			)
  		})
  	}

	const onChangeHandler = e => {
		setFormData({
			...formData,
			[e.target.name] : e.target.value
		})
	}

	const onSubmitHandler = async e => {
		e.preventDefault()
		try {
			await createBuilding({
				variables: {...formData},
				refetchQueries: [
					{
						query:GET_BUILDINGS
					}
				]
			})
        	Swal.fire({
              title: "Success",
              text: "Successfully created new Building!",
              icon: "success",
              showConfirmationButton: false,
              timer: 3000
            })
            setFormData({
            	...formData,
            	name: "",
            	locationId: ""
            })
		} catch(e) {
			 Swal.fire({
              title: "Error",
              text: "Adding new Building error",
              icon: "error",
              showConfirmationButton: false,
              timer: 3000
            })
			console.log(e)
		}
	}

	useEffect(() => {
	    if(locationId != null && name !== "") {
	      setDisabledBtn(false)
	    } else {
	      setDisabledBtn(true)
	    }
	}, [formData])

	return (
		<Fragment>
			<Form className="mb-5 container-fluid col-12 border-light-grey rounded" onSubmit={ e => onSubmitHandler(e) }>
				<div className=" d-flex justify-content-center mt-3">
					<h4 className="form-hdr">ADD NEW BUILDING</h4>
				</div>
				<FormGroup>
					<Label>Select Location</Label>
					<Input
						type="select"
			        	name="locationId"
			        	id="locationId"
			        	required
			        	onChange={e => onChangeHandler(e)}
			        	value={locationId}
					>
						<option selected>Select one</option>
						{populateLocations()}
					</Input>
				</FormGroup>
				<FormGroup className="mt-1">
					<Label>Building Name</Label>
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
				<Button className="btn btn-block btn-primary mb-4" disabled={disabledBtn}>Save Changes</Button>
			</Form>
		</Fragment>
	)
}

export default BuildingForm;
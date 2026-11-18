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

const AddParkingForm = (props) => {

	const {
		locationName,
		buildingName,
		locationId,
		buildingId,
		createParking,
		GET_PARKINGS_BY_BUILDING,
		refetchParkings,
		refetchBldgsByLoc,
		setLoading
	} = props;

	const [formData, setFormData] = useState({
		locationId: locationId,
		buildingId: buildingId,
		name: ""
	})

	const { name } = formData

	const [disabledBtn, setDisabledBtn] = useState(true);

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
      await createParking({
        variables: {...formData},
        refetchQueries: [
          {
            query:GET_PARKINGS_BY_BUILDING,
            variables: {
            	buildingId
            }
          }
        ]
      })
      Swal.fire({
          title: "Success",
          html: `Parking Creation Successful!<br>Number: "SLOT ${name.toUpperCase()}"`,
          icon: "success",
          showConfirmationButton: false,
          timer: 3000
        })
        setFormData({
          locationId: locationId,
          buildingId: buildingId,
          name: ""
        })
        setLoading(false)
    } catch(e) {
       Swal.fire({
              title: "Error",
              text: "Parking Creation: Error",
              icon: "error",
              showConfirmationButton: false,
              timer: 3000
            })
      console.log(e)
      setLoading(false)
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
          <h4 className="form-hdr">ADD NEW PARKING</h4>
        </div>
        <FormGroup>
          <Label>Location</Label>
          <Input
            type="select"
                name="locationId"
                id="locationId"
                required
                onChange={e => onChangeHandler(e)}
                value={locationId}
                disabled
          >
           <option>{locationName.toUpperCase()}</option>
          </Input>
        </FormGroup>
         <FormGroup>
          <Label>Building</Label>
          <Input
            type="select"
                name="buildingId"
                id="buildingId"
                required
                onChange={e => onChangeHandler(e)}
                value={buildingId}
                disabled
          >
           <option>{buildingName.toUpperCase()}</option>
          </Input>
        </FormGroup>
        <FormGroup className="mt-1">
          <Label>Parking Number</Label>
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

export default AddParkingForm;
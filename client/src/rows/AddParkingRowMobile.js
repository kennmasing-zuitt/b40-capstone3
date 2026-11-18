import React, { Fragment } from 'react';
// import { Table, Col } from 'reactstrap';
import { Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const AddParkingRowMobile = (props) => {

const {
  toggle,
  parking,
  index,
  archiveParking,
  unarchiveParking,
  GET_PARKINGS,
  updateParking,
  deleteParking,
  setLoading,
  parksByBldgLoading
} = props

const { _id, name, isArchived, createdAt } = parking

const onClickArchiveHandler = async (e) => {
  e.preventDefault();

  try{
    await archiveParking({
      variables: {
        _id,
        isArchived: !parking.isArchived
      },
      refetchQueries: [
        {
          query: GET_PARKINGS
        }
      ]
    })
    if(parksByBldgLoading) return <Spinner color="primary" />
    // toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `"${parking.name.toUpperCase()}" is ${parking.isArchived ? "Activated" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    console.log(e)
    //SWAL ERROR
  }
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete parking",
    text: `Are you sure you want to delete "${parking.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(async response => {

    if(response.value){
      setLoading(true)
      await deleteParking({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_PARKINGS
          }
        ]
      })
      setLoading(false)
      Swal.fire({
        title: "Success",
        text: `"${parking.name.toUpperCase()}" Deleted`,
        icon: "success",
        showConfirmationButton: false,
        timer: 2250
      })
    }
  })
}

let archival = ""
if(parking.isArchived == false) {
   archival = (
    <em>Status: ACTIVE </em>
  )
} else {
  archival =(
   <em>Status: ARCHIVED </em>
  )
}

  return (
    <Fragment>
        <tr className="bottom-border">
          <th className="text-center">{index}</th>
          <td className="">
            SLOT {name.toUpperCase()}
            <br/>
            <em>{parking.buildingId.name.charAt(0).toUpperCase()}{parking.buildingId.name.slice(1)},</em>
            <br/>
            <em>{parking.locationId.name.charAt(0).toUpperCase()}{parking.locationId.name.slice(1)}</em>
            <br/>
            Created at: <em>{moment(createdAt).format('MMMM DD, YYYY')}</em>
            <br/>
            {archival}
          </td>
          <td className="">
                <Button className="mb-1 btn btn-sm btn-block btn-success" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;Update</Button>
          </td>
        </tr>
    </Fragment>
  )
}

export default AddParkingRowMobile;
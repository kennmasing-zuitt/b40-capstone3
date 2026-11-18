import React, { Fragment } from 'react';
// import { Table, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const ParkingRow = (props) => {

const {
  toggle,
  parking,
  index,
  archiveParking,
  unarchiveParking,
  buildingId,
  GET_PARKINGS,
  updateParking,
  deleteParking
} = props

const { _id, name, isArchived, createdAt } = parking

const onClickArchiveHandler = (e) => {
  e.preventDefault();
  archiveParking({
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
  // toggle(false, _id)
  Swal.fire({
    title: "Success",
    text: `"SLOT ${parking.name.toUpperCase()}" is ${parking.isArchived ? "Activated" : "Archived"}`,
    icon: "success",
    showConfirmationButton: false,
    timer: 1500
  })
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete Parking",
    text: `Are you sure you want to delete "SLOT ${parking.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(response => {

    if(response.value){
      deleteParking({
        variables: {
          _id: parking._id
        },
        refetchQueries: [
          {
            query: GET_PARKINGS
          }
        ]
      })
      Swal.fire({
        title: "Success",
        text: `"SLOT ${parking.name.toUpperCase()}" Deleted`,
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
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled> ACTIVE </Button></td>
  )
} else {
  archival =(
   <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </button></td>
  )
}

  return (
    <Fragment>
        <tr className="bottom-border">
          <th className="text-center">{index}</th>
          <td className="text-left">SLOT {name.toUpperCase()} - {parking.buildingId.name.toUpperCase()}</td>
          <td className="text-left">{parking.locationId.name.toUpperCase()}</td>
          <td className="text-center">{moment(createdAt).fromNow()}</td>
          { archival }
          <td className="text-right">
              <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
          </td>
        </tr>
    </Fragment>
  )
}

export default ParkingRow;
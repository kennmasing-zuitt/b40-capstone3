import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const ParkingRowMobile = (props) => {

const {
  toggle,
  parking,
  index,
  archiveParking,
  unarchiveParking,
  GET_PARKINGS,
  updateParking,
  deleteParking,
  setLoading
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
  toggle(false, _id)
  Swal.fire({
    title: "Success",
    text: `"${parking.name.toUpperCase()}" is ${parking.isArchived ? "Activated" : "Archived"}`,
    icon: "success",
    showConfirmationButton: false,
    timer: 1500
  })
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete parking",
    text: `Are you sure you want to delete "${parking.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(response => {

    if(response.value){
      deleteParking({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_PARKINGS
          }
        ]
      })
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

export default ParkingRowMobile;
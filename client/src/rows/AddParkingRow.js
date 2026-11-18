import React, { Fragment } from 'react';
// import { Table, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const AddParkingRow = (props) => {

const {
  toggle,
  parking,
  index,
  archiveParking,
  unarchiveParking,
  buildingId,
  GET_PARKINGS_BY_BUILDING,
  updateParking,
  deleteParking,
  setLoading
} = props

const { _id, name, isArchived, createdAt } = parking

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    await archiveParking({
      variables: {
        _id,
        isArchived: !parking.isArchived
      },
      refetchQueries: [
        {
          query: GET_PARKINGS_BY_BUILDING,
          variables: {
            buildingId
          }
        }
      ]
    })
    setLoading(false)
    // toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `"SLOT ${parking.name.toUpperCase()}" is ${parking.isArchived ? "Activated" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete Parking",
    text: `Are you sure you want to delete "SLOT ${parking.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(async response => {

    if(response.value){
      setLoading(true)
      await deleteParking({
        variables: {
          _id: parking._id
        },
        refetchQueries: [
          {
            query: GET_PARKINGS_BY_BUILDING,
            variables: {
            	buildingId
            }
          }
        ]
      })
      setLoading(false)
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
    <td><button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled> ACTIVE </button></td>
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
          <td className="text-left">SLOT {name.toUpperCase()}</td>
          <td className="text-center">{moment(createdAt).fromNow()}</td>
          { archival }
          <td className="text-right">
              <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
          </td>
        </tr>
    </Fragment>
  )
}

export default AddParkingRow;
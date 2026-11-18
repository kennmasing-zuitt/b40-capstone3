import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const LocationRow = (props) => {

const {
  toggle,
  location,
  index,
  archiveLocation,
  unarchiveLocation,
  GET_LOCATIONS,
  updateLocation,
  deleteLocation,
  setLoading
} = props

const { _id, name, isArchived, createdAt } = location

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try{
    await archiveLocation({
      variables: {
        _id,
        isArchived: !location.isArchived
      },
      refetchQueries: [
        {
          query: GET_LOCATIONS
        }
      ]
    })
    setLoading(false)
    // toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `"${location.name.toUpperCase()}" is ${location.isArchived ? "Activated" : "Archived"}`,
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
    title: "Delete Location",
    text: `Are you sure you want to delete "${location.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(async response => {

    if(response.value){
      setLoading(true)
      await deleteLocation({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_LOCATIONS
          }
        ]
      })
      setLoading(false)
      Swal.fire({
        title: "Success",
        text: `"${location.name.toUpperCase()}" Deleted`,
        icon: "success",
        showConfirmationButton: false,
        timer: 2250
      })
    }
  })
}


let archival = ""
if(location.isArchived == false) {
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
          <td className="text-left">{name.toUpperCase()}</td>
          <td className="text-center">{moment(createdAt).fromNow()}</td>
          { archival }
          <td className="text-right">
              <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
          </td>
        </tr>
    </Fragment>
  )
}

export default LocationRow;
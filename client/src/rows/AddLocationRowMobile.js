import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const AddLocationRowMobile = (props) => {

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

const onClickArchiveHandler = (e) => {
  e.preventDefault();
  archiveLocation({
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
  toggle(false, _id)
  Swal.fire({
    title: "Success",
    text: `"${location.name.toUpperCase()}" is ${location.isArchived ? "Activated" : "Archived"}`,
    icon: "success",
    showConfirmationButton: false,
    timer: 1500
  })
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete Location",
    text: `Are you sure you want to delete "${location.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(response => {

    if(response.value){
      deleteLocation({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_LOCATIONS
          }
        ]
      })
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
            {name.toUpperCase()}
            <br/>
            Created at: <em>{moment(createdAt).format('MMMM DD, YYYY')}</em>
            <br/>
            {archival}
          </td>
          <td className="">
                <Link to={`/buildings/location/${location._id}`} className="btn btn-block btn-sm btn-primary mb-1"><i class="fas fa-plus-square"></i>&nbsp;&nbsp;Add Building</Link>
                <Button className="mb-1 btn btn-sm btn-block btn-success" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;Update</Button>
          </td>
        </tr>
    </Fragment>
  )
}

export default AddLocationRowMobile;
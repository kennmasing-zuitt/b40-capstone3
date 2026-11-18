import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const BuildingRowMobile = (props) => {

const {
  toggle,
  building,
  index,
  archiveBuilding,
  unarchiveBuilding,
  GET_BUILDINGS,
  updateBuilding,
  deleteBuilding,
  setLoading
} = props

const { _id, name, isArchived, createdAt } = building

const onClickArchiveHandler = (e) => {
  e.preventDefault();
  archiveBuilding({
    variables: {
      _id,
      isArchived: !building.isArchived
    },
    refetchQueries: [
      {
        query: GET_BUILDINGS
      }
    ]
  })
  toggle(false, _id)
  Swal.fire({
    title: "Success",
    text: `"${building.name.toUpperCase()}" is ${building.isArchived ? "Activated" : "Archived"}`,
    icon: "success",
    showConfirmationButton: false,
    timer: 1500
  })
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete Building",
    text: `Are you sure you want to delete "${building.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(response => {

    if(response.value){
      deleteBuilding({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_BUILDINGS
          }
        ]
      })
      Swal.fire({
        title: "Success",
        text: `"${building.name.toUpperCase()}" Deleted`,
        icon: "success",
        showConfirmationButton: false,
        timer: 2250
      })
    }
  })
}

let archival = ""
if(building.isArchived == false) {
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
            <em>{building.locationId.name.charAt(0).toUpperCase()}{building.locationId.name.slice(1)}</em>
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

export default BuildingRowMobile;
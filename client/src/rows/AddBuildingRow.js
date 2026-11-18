import React, { Fragment } from 'react';
import { button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const AddBuildingRow = (props) => {

const {
  locationId,
  toggle,
  building,
  index,
  buildingId,
  GET_BUILDINGS_BY_LOCATION,
  refetchBldgsByLoc,
  updateBuilding,
  archiveBuilding,
  deleteBuilding,
  setLoading
} = props

const { _id, name, isArchived, createdAt } = building

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try{
    await archiveBuilding({
      variables: {
        _id,
        isArchived: !building.isArchived
      },
      refetchQueries: [
        {
          query: GET_BUILDINGS_BY_LOCATION,
          variables: {
            locationId
          }
        }
      ]
    })
    setLoading(false)
    // toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `"${building.name.toUpperCase()}" is ${building.isArchived ? "Activated" : "Archived"}`,
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
    title: "Delete Building",
    text: `Are you sure you want to delete "${building.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then( async response => {

    if(response.value){
      setLoading(true)
      await deleteBuilding({
        variables: {
          _id: building._id
        },
        refetchQueries: [
          {
            query: GET_BUILDINGS_BY_LOCATION,
            variables: {
            	locationId
            }
          }
        ]
      })
      setLoading(false)
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
    <td><button className="mb-1 btn btn-block btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled> ACTIVE </button></td>
  )
} else {
  archival =(
   <td><button className="mb-1 btn btn-block btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </button></td>
  )
}

return (
    <Fragment>
        <tr className="bottom-border">
          <th className="text-center">{index}</th>
          <td className="text-left">{name.toUpperCase()}</td>
          <td className="text-center">{moment(createdAt).fromNow()}</td>
          { archival }
          <td className="text-center">
              <button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</button>
          </td>
          <td className="text-center">
              <Link to={`/parkings/building/${building._id}`} className="btn btn-sm btn-primary mb-1 px-3"><i class="fas fa-plus-square"></i>&nbsp;&nbsp;Add Parking</Link>
          </td>
        </tr>
    </Fragment>
  )
}

export default AddBuildingRow;
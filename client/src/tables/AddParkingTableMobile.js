import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import AddParkingRowMobile from '../rows/AddParkingRowMobile';

const AddParkingTableMobile = (props) => {

  let rows = ""
  if(props.parkings && props.parkings.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Parkings.</em>
          </td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.parkings.map((parking) => {
          return <AddParkingRowMobile 
            parking={parking}
            key={parking._id}
            index={++i}
            toggle={props.toggle}
            buildingId={props.buildingId}
            GET_PARKINGS_BY_BUILDING={props.GET_PARKINGS_BY_BUILDING}
            updateParking={props.updateParking}
            archiveParking={props.archiveParking}
            deleteParking={props.deleteParking}
          />
        })
      )
  }

  return (
    <Fragment>
      <Table responsive hover light borderless size="sm" className="p-4 rounded">
      <thead>
        <tr className="">
          <th className="text-center">#</th>
          <th className="text-left">Details</th>
          <th className="text-center">Status/Actions</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
    </Fragment>
  )
}

export default AddParkingTableMobile;
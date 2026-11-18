import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import ParkingRow from '../rows/ParkingRow';

const ParkingTable = (props) => {

  let rows = ""
  if(props.parkings && props.parkings.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Parkings.</em>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.parkings.map((parking) => {
          return <ParkingRow 
            parking={parking}
            key={parking._id}
            index={++i}
            toggle={props.toggle}
            buildingId={props.buildingId}
            GET_PARKINGS={props.GET_PARKINGS}
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
        <tr>
          <th className="text-center">#</th>
          <th className="text-left">NAME</th>
          <th className="text-left">LOCATION</th>
          <th className="text-center">DATE CREATED</th>
          <th className="text-center">STATUS</th>
          <th className="text-right pr-3">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
  </Fragment>
  )
}

export default ParkingTable;
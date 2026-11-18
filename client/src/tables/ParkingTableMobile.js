import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import ParkingRowMobile from '../rows/ParkingRowMobile';

const ParkingTableMobile = (props) => {

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
          return <ParkingRowMobile 
            parking={parking}
            key={parking._id}
            index={++i}
            toggle={props.toggle}
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

export default ParkingTableMobile;
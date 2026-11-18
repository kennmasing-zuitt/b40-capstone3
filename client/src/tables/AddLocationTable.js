import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import AddLocationRow from '../rows/AddLocationRow';

const AddLocationTable = (props) => {

  let rows = ""
  if(props.locations && props.locations.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Locations.</em>
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
        props.locations.map((location) => {
          return <AddLocationRow 
            location={location}
            key={location._id}
            index={++i}
            toggle={props.toggle}
            GET_LOCATIONS={props.GET_LOCATIONS}
            updateLocation={props.updateLocation}
            archiveLocation={props.archiveLocation}
            deleteLocation={props.deleteLocation}
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
            <th className="text-center">DATE CREATED</th>
            <th className="text-center">STATUS</th>
            <th className="text-right pr-3">ACTIONS</th>
            <th className="text-right pr-3">ADD BUILDING</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </Table>
    </Fragment>
  )
}

export default AddLocationTable;
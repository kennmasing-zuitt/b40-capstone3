import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import LocationRow from '../rows/LocationRow';

const LocationTable = (props) => {

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
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.locations.map((location) => {
          return <LocationRow 
            location={location}
            key={location._id}
            index={++i}
            toggle={props.toggle}
            GET_LOCATIONS={props.GET_LOCATIONS}
            updateLocation={props.updateLocation}
            archiveLocation={props.archiveLocation}
            deleteLocation={props.deleteLocation}
            setLoading={props.setLoading}
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
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </Table>
    </Fragment>
  )
}

export default LocationTable;
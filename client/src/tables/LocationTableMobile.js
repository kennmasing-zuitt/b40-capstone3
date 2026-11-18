import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import LocationRowMobile from '../rows/LocationRowMobile';

const LocationTableMobile = (props) => {

  let rows = ""
  if(props.locations && props.locations.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Locations.</em>
          </td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.locations.map((location) => {
          return <LocationRowMobile 
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

export default LocationTableMobile;
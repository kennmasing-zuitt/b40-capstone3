import React, { Fragment } from 'react';
import { Table } from 'reactstrap';

import AddBuildingRow from '../rows/AddBuildingRow';

const AddBuildingTable = (props) => {

  let rows = ""
  if(props.buildings && props.buildings.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Buildings.</em>
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
        props.buildings.map(building => {
          return <AddBuildingRow 
            building={building}
            key={building._id}
            index={++i}
            toggle={props.toggle}
            buildingId={props.buildingId}
            locationId={props.locationId}
            refetchBldgsByLoc={props.refetchBldgsByLoc}
            updateBuilding={props.updateBuilding}
            archiveBuilding={props.archiveBuilding}
            deleteBuilding={props.deleteBuilding}
            setLoading={props.setLoading}
            setIsArchived={props.setIsArchived}
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
          <th className="text-center">ACTIONS</th>
          <th className="text-center">ADD PARKING</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
  </Fragment>
  )
}

export default AddBuildingTable;
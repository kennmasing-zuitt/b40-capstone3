import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import BuildingRowMobile from '../rows/BuildingRowMobile';

const BuildingTableMobile = (props) => {

  let rows = ""
  if(props.buildings && props.buildings.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Buildings.</em>
          </td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.buildings.map((building) => {
          return <BuildingRowMobile 
            building={building}
            key={building._id}
            index={++i}
            toggle={props.toggle}
            GET_BUILDINGS={props.GET_BUILDINGS}
            updateBuilding={props.updateBuilding}
            archiveBuilding={props.archiveBuilding}
            deleteBuilding={props.deleteBuilding}
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

export default BuildingTableMobile;
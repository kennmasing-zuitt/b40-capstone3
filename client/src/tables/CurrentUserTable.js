import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import CurrentUserRow from '../rows/CurrentUserRow';

const CurrentUserTable = (props) => {

  let rows = ""
  if(props.users && props.users.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Users.</em>
          </td>
          <td></td>
          <td></td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
      
          <CurrentUserRow 
            user={props.user}
            index={++i}
            toggle={props.toggle}
            GET_USERS_BY_ROLE_ID={props.GET_USERS_BY_ROLE_ID}
            updateUser={props.updateUser}
            archiveUser={props.archiveUser}
            deleteUser={props.deleteUser}
          />
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
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </Table>
    </Fragment>
  )
}

export default CurrentUserTable;
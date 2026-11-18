import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import UserSuperAdminRowMobile from '../rows/UserSuperAdminRowMobile';

const UserSuperAdminTableMobile = (props) => {

  let rows = ""
  if(props.users && props.users.length === 0){
    rows = (
      <tr>
          <td></td>
          <td>
              <em>No Super Admin Users.</em>
          </td>
          <td></td>
      </tr>
    )
  } else {
    let i = 0;
    rows = (
        props.users.map((user) => {
          return <UserSuperAdminRowMobile 
            user={user}
            key={user._id}
            index={++i}
            toggle={props.toggle}
            GET_USERS_BY_ROLE_ID={props.GET_USERS_BY_ROLE_ID}
            updateUser={props.updateUser}
            archiveUser={props.archiveUser}
            deleteUser={props.deleteUser}
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

export default UserSuperAdminTableMobile;
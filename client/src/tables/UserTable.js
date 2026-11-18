import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import UserRow from '../rows/UserRow';

const UserTable = (props) => {

  // let rows = ""
  // if(!props.Users){
  //   rows = (
  //     <tr>
  //       <td>
  //         <em>No Users.</em>
  //       </td>
  //     </tr>
  //   )
  // } else {
  //   let i = 0;
  //   rows = (
  //       props.Users.map((User) => {
  //         // console.log(User, index)
  //         return <UserRow 
  //           User={User}
  //           key={User._id}
  //           index={++i}
  //           toggle={props.toggle}

  //           GET_UserS={props.GET_UserS}

  //           updateUser={props.updateUser}
  //           archiveUser={props.archiveUser}
  //           deleteUser={props.deleteUser}
  //         />
  //       })
  //     )
  // }

  // return (
  //   <Fragment>
  //     <Table responsive hover light borderless size="sm" className="p-4 rounded">
  //     <thead>
  //       <tr>
  //         <th className="text-center">#</th>
  //         <th className="text-left">NAME</th>
  //         <th className="text-center">DATE CREATED</th>
  //         <th className="text-center">STATUS</th>
  //         <th className="text-center">ACTIONS</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       { rows }
  //     </tbody>
  //   </Table>


  //   </Fragment>
  // )
  return(
    <Fragment>
      <h1>USER TABLE</h1>
      <UserRow />
    </Fragment>
  )
}

export default UserTable;
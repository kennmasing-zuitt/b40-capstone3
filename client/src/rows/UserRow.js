import React, { Fragment } from 'react';
// import { Table, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const UserRow = (props) => {

// const {
//   toggle,
//   User,
//   index,
//   archiveUser,
//   unarchiveUser,

//   GET_UserS,

//   updateUser,
//   deleteUser
// } = props


// const { _id, name, isArchived, createdAt } = User

// const onClickArchiveHandler = (e) => {
//   e.preventDefault();
//   archiveUser({
//     variables: {
//       _id,
//       isArchived: !User.isArchived
//     },
//     refetchQueries: [
//       {
//         query: GET_UserS
//       }
//     ]
//   })
//   toggle(false, _id)
//   Swal.fire({
//     title: "Success",
//     text: `"${User.name.toUpperCase()}" is ${User.isArchived ? "Activated" : "Archived"}`,
//     icon: "success",
//     showConfirmationButton: false,
//     timer: 1500
//   })
// }

// const onClickDeleteHandler = (e) => {
//   e.preventDefault();
//   Swal.fire({
//     icon: "question",
//     title: "Delete User",
//     text: `Are you sure you want to delete "${User.name.toUpperCase()}"`,
//     focusConfirm: false,
//     showCloseButton: true
//   }).then(response => {

//     if(response.value){
//       deleteUser({
//         variables: {
//           _id
//         },
//         refetchQueries: [
//           {
//             query: GET_UserS
//           }
//         ]
//       })
//       Swal.fire({
//         title: "Success",
//         text: `"${User.name.toUpperCase()}" Deleted`,
//         icon: "success",
//         showConfirmationButton: false,
//         timer: 2250
//       })
//     }
//   })
// }


// let archival = ""
// if(User.isArchived == false) {
//    archival = (
//     <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } > ACTIVE </Button></td>
//   )
// } else {
//   archival =(
//    <td><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } >  ARCHIVED </Button></td>
//   )
// }

//   return (
//     <Fragment>
//         <tr className="bottom-border">
//           <th className="text-center">{index}</th>
//           <td className="text-left">{name.toUpperCase()}</td>
//           <td className="text-center">{moment(createdAt).fromNow()}</td>
//           {/*<td className="text-center">{isArchived.toString()}</td>*/}
//           { archival }
//           <td className="text-center">
//               <Link to={`/buildings/User/${User._id}`} className="btn btn-sm btn-primary mb-1 mr-1">Add Building</Link>{/**/}
//               <Button className="mb-1 btn btn-sm btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i></Button> {/*CANCEL*/}
//               <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id, name) } ><i class="fas fa-wrench"></i></Button> {/*CANCEL*/}
//               {/*<Button className="mb-1 btn btn-success mx-2" onClick={()=> toggle(_id)}>Update</Button>*/}
//           </td>
//         </tr>
//     </Fragment>
//   )
  return(
    <Fragment>
      <h1>USER ROWE</h1>
    </Fragment>
  )
}

export default UserRow;
import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const UserOrdinaryRowMobile = (props) => {

const {
  toggle,
  user,
  index,
  GET_USERS_BY_ROLE_ID,
  updateUser,
  archiveUser,
  deleteUser,
  setLoading
} = props

const {
  _id,
  firstName,
  lastName,
  username,
  email,
  password,
  roleId,
  isArchived,
  createdAt
} = user

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  setLoading(true)
  try{
    await archiveUser({
      variables: {
        _id,
        isArchived: !user.isArchived
      },
      refetchQueries: [
        {
          query: GET_USERS_BY_ROLE_ID,
          variables: {
            roleId: 1
          }
        }
      ]
    })
    setLoading(false)
    // toggle(false, _id)
    Swal.fire({
      title: "Success",
      text: `"${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}" is ${user.isArchived ? "Unarchived" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  }catch(e){
    setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete User",
    text: `Are you sure you want to delete "${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(async response => {

    if(response.value){
      setLoading(true)
      await deleteUser({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_USERS_BY_ROLE_ID,
            variables: {
              roleId: 1
            }
          }
        ]
      })
      setLoading(false)
      Swal.fire({
        title: "Success",
        text: `"${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}" Deleted`,
        icon: "success",
        showConfirmationButton: false,
        timer: 2250
      })
    }
  })
}

let archival = ""
if(user.isArchived == false) {
   archival = (
    <em>Status: ACTIVE </em>
  )
} else {
  archival =(
   <em>Status: ARCHIVED </em>
  )
}

  return (
    <Fragment>
        <tr className="bottom-border">
          <th className="text-center">{index}</th>

          <td className="">
            {firstName.toUpperCase()} {lastName.toUpperCase()}
            <br/>
            Created at: <em>{moment(createdAt).format('MMMM DD, YYYY')}</em>
            <br/>
            {archival}
          </td>

          <td className="">
                <Link to={`/bookings/user/${_id}`} className="btn btn-block btn-sm btn-primary mb-1"><i class="fas fa-eye"></i>&nbsp;&nbsp;Bookings</Link>
                <Button className="mb-1 btn btn-sm btn-block btn-success" onClick={() => toggle(true, _id, firstName, lastName, username, email, password) } ><i class="fas fa-wrench"></i>&nbsp;&nbsp;Update</Button>
          </td>
        </tr>
    </Fragment>
  )
}

export default UserOrdinaryRowMobile;
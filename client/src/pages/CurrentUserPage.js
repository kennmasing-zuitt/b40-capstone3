import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USERS, GET_USERS_BY_ROLE_ID, GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_USER, CREATE_USER, ARCHIVE_USER, UPDATE_USER } from '../graphql/mutations';

import CurrentUserForm from '../forms/CurrentUserForm';
import CurrentUserTable from '../tables/CurrentUserTable';
import CurrentUserModal from '../modals/CurrentUserModal';

const CurrentUserPage = props => {

	const {
		error: userCurrentError,
		loading: userCurrentLoading,
		data: userCurrentQuery,
		refetch: refetchUserCurrent
	} = useQuery(GET_CURRENT_USER, {
		variables: {
			_id: props.userId
		}
	})

	const {
		error: usersOrdinaryError,
		loading: usersOrdinaryLoading,
		data: usersOrdinaryQuery,
		refetch: refetchUsersOrdinary
	} = useQuery(GET_USERS_BY_ROLE_ID, {
		variables: {
			roleId: 3
		}
	})

	const [ createUser ] = useMutation(CREATE_USER)
	const [ updateUser ] = useMutation(UPDATE_USER)
	const [ archiveUser ] = useMutation(ARCHIVE_USER)
	const [ deleteUser ] = useMutation(DELETE_USER)

	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({
		_id: "",
		firstName: "",
		lastName: "",
		username: "",
		email: ""
	})

	const toggle = (close, _id, firstName, lastName, username, email) => {
		setModalData({
			_id,
			firstName,
			lastName,
			username,
			email
		})
		setModal(!modal);
	};

	const onChangeModal = (e) => {
		setModalData({
			...modalData,
			[e.target.name] : e.target.value
		})
	}

	const onSubmitModal = (e) => {
		e.preventDefault()
		updateUser({
			variables: {...modalData},
			refetchQueries: [
				{
					query: GET_USERS_BY_ROLE_ID,
					variables: {
						roleId: 3
					}
				}
			]
		})
		setModalData({
			_id: "",
			firstName: "",
			lastName: "",
			username: "",
			email: ""
		})
		setModal(!modal)
	} 

	if(userCurrentLoading) return <Spinner color="primary"/>
	if(userCurrentError) return <p>{userCurrentError.message}</p>

	if(usersOrdinaryLoading) return <Spinner color="primary"/>
	if(usersOrdinaryError) return <p>{usersOrdinaryError.message}</p>

	return (
		<Fragment>
				<h1 className="container-fluid text-center page-hdr">CURRENT USER PROFILE</h1>
					<div className="d-flex justify-content-center align-items-start col-10 offset-md-1">
						<Col md="6" className="">
							<CurrentUserForm
								toggle={toggle}
								user={userCurrentQuery.userCurrent}
								createUser={createUser}
								GET_USERS_BY_ROLE_ID={GET_USERS_BY_ROLE_ID}
							/>
						</Col>
					</div>
					<CurrentUserModal
						modal={modal}
						toggle={toggle}
						_id={modalData._id}
						firstName={modalData.firstName}
						lastName={modalData.lastName}
						username={modalData.username}
						email={modalData.email}
						onChangeModal={onChangeModal}
						onSubmitModal={onSubmitModal}
					/>
		</Fragment>
	)
}

export default CurrentUserPage;
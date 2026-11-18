import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USERS, GET_USER, GET_USERS_BY_ROLE_ID } from '../graphql/queries';
import { DELETE_USER, CREATE_USER, ARCHIVE_USER, UPDATE_USER } from '../graphql/mutations';

import UserOrdinaryForm from '../forms/UserOrdinaryForm';
import UserOrdinaryTable from '../tables/UserOrdinaryTable';
import UserOrdinaryTableMobile from '../tables/UserOrdinaryTableMobile';
import UserOrdinaryModal from '../modals/UserOrdinaryModal';
import Paginate from '../partials/Paginate';

const UserOrdinaryPage = props => {

	const [isArchived, setIsArchived] = useState(null)

	const {
		error: userError,
		loading: userLoading,
		data: userQuery,
		refetch: refetchUser
	} = useQuery(GET_USER, {
		variables: {
			_id: ""
		}
	})

	const [usersData, setUsersData] = useState({
		users: [],
		total: undefined,
		limit: 10
	})

	const { users, total, limit } = usersData

	const {
		error: usersOrdinaryError,
		loading: usersOrdinaryLoading,
		data: usersOrdinaryQuery,
		refetch: refetchUsersOrdinary
	} = useQuery(GET_USERS_BY_ROLE_ID, {
		variables: {
			roleId: 3,
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchUsersOrdinary()

		if(usersOrdinaryQuery && usersOrdinaryQuery.usersByRoleId){
			setUsersData({
				...usersData,
				users: usersOrdinaryQuery.usersByRoleId,
				total: usersOrdinaryQuery.usersByRoleId[0] ? usersOrdinaryQuery.usersByRoleId[0].total : undefined
			})
		}
	}, [usersOrdinaryQuery])

	const [ createUser ] = useMutation(CREATE_USER)
	const [ updateUser ] = useMutation(UPDATE_USER)
	const [ archiveUser ] = useMutation(ARCHIVE_USER)
	const [ deleteUser ] = useMutation(DELETE_USER)

	const [user, setUser] = useState({})
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({
		_id: "",
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: ""
	})

	const toggle = async (close, _id, firstName, lastName, username, email, password) => {
		if(userLoading) return <Spinner color="primary"/>
		setModalData({
			_id,
			firstName,
			lastName,
			username,
			email,
			password
		})
		if(typeof _id === "string"){
			let res = await refetchUser({_id})
			setUser(res.data.user)
		}
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

	const displayPagination = () => {
		return <Paginate total={total} getDocuments={refetchUsersOrdinary} limit={limit} setLoading={props.setLoading}/>
	}

	const onClickGetArchived = (e) => {
		e.preventDefault()
	  	setIsArchived(true)
	}

	const onClickGetActive = (e) => {
		e.preventDefault()
	  	setIsArchived(false)
	}

	const onClickGetAll = (e) => {
		e.preventDefault()
	  	setIsArchived(null)
	}

	if(usersOrdinaryLoading) return <Spinner color="primary"/>
	if(usersOrdinaryError) return <p>{usersOrdinaryError.message}</p>

	return (
		<Fragment>
				<h1 className="container-fluid text-center page-hdr">USERS PAGE</h1>
				<div className="d-flex justify-content-center align-items-start col-10 offset-md-1">
					<Col md="4" className="landing-desktop">
						<UserOrdinaryForm
							createUser={createUser}
							GET_USERS_BY_ROLE_ID={GET_USERS_BY_ROLE_ID}
							roleId={props.roleId}
							setLoading={props.setLoading}
						/>
					</Col>
					<Col md="8" className="landing-desktop">
						<div className="d-flex justify-content-end mr-3">	
							<div>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
							</div>
						</div>
						<hr/>
						<UserOrdinaryTable
							toggle={toggle}
							users={usersOrdinaryQuery.usersByRoleId}
							GET_USERS_BY_ROLE_ID={GET_USERS_BY_ROLE_ID}
							updateUser={updateUser}
							archiveUser={archiveUser}
							deleteUser={deleteUser}
							setLoading={props.setLoading}
							roleId={props.roleId}
						/>
						<div className="text-right mr-4">
								{ total > limit ? <Paginate getDocuments={refetchUsersOrdinary} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
						</div>
					</Col>
				</div>
				<div>
					<Container className="landing-mobile">
						<Row className="">
							<Col>
								<UserOrdinaryForm
									createUser={createUser}
									GET_USERS_BY_ROLE_ID={GET_USERS_BY_ROLE_ID}
									roleId={props.roleId}
									setLoading={props.setLoading}
								/>
							</Col>
						</Row>
						<div className="d-flex justify-content-end">	
							<div >
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
							</div>
						</div>
						<Row >
							<Col className="col-12 offset-md-1 d-flex justify-content-center align-items-center">
								<UserOrdinaryTableMobile
									toggle={toggle}
									users={usersOrdinaryQuery.usersByRoleId}
									GET_USERS_BY_ROLE_ID={GET_USERS_BY_ROLE_ID}
									updateUser={updateUser}
									archiveUser={archiveUser}
									deleteUser={deleteUser}
									setLoading={props.setLoading}
								/>
							</Col>
						</Row>
						<div className="text-center">
								{ total > limit ? <Paginate getDocuments={refetchUsersOrdinary} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
						</div>
					</Container>
				</div>
				<UserOrdinaryModal
					modal={modal}
					setModal={setModal}
					toggle={toggle}
					user={user}
					_id={modalData._id}
					firstName={modalData.firstName}
					lastName={modalData.lastName}
					username={modalData.username}
					email={modalData.email}
					password={modalData.password}
					updateUser={updateUser}
					archiveUser={archiveUser}
					deleteUser={deleteUser}
					onChangeModal={onChangeModal}
					modalData={modalData}
					setModalData={setModalData}
					GET_USERS_BY_ROLE_ID={GET_USERS_BY_ROLE_ID}
					setLoading={props.setLoading}
					usersOrdinaryLoading={usersOrdinaryLoading}
				/>
		</Fragment>
	)
}

export default UserOrdinaryPage;
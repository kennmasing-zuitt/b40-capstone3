import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { Link, Redirect, Route } from 'react-router-dom';
import { matchPath } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_LOCATION, GET_BUILDING, GET_BUILDINGS_BY_LOCATION } from '../graphql/queries';
import { CREATE_BUILDING, UPDATE_BUILDING, ARCHIVE_BUILDING, DELETE_BUILDING } from '../graphql/mutations';

import AddBuildingForm from '../forms/AddBuildingForm';
import AddBuildingTable from '../tables/AddBuildingTable';
import AddBuildingTableMobile from '../tables/AddBuildingTableMobile';
import AddBuildingModal from '../modals/AddBuildingModal';
import Paginate from '../partials/Paginate';

const AddBuildingPage = (props) => {
	
	const locationId = props.match.params.id

	const [isArchived, setIsArchived] = useState(null)

	const {
		error: buildingError,
		loading: buildingLoading,
		data: buildingQuery,
		refetch: refetchBuilding
	} = useQuery(GET_BUILDING, {
		variables: {
			_id: ""
		}
	})

	const {
		error: locationError,
		loading: locationLoading,
		data: locationQuery,
		refetch: refetchLocation
	} = useQuery(GET_LOCATION, {
		variables: {
			_id: locationId
		}
	})

	const locationName = locationQuery && locationQuery.location.name

	const [buildingsData, setBuildingsData] = useState({
		buildings: [],
		total: undefined,
		limit: 10
	})

	const { buildings, total, limit } = buildingsData

	const {
		error: bldgsByLocError,
		loading: bldgsByLocLoading,
		data: bldgsByLocQuery,
		refetch: refetchBldgsByLoc
	} = useQuery(GET_BUILDINGS_BY_LOCATION, {
		variables: {
			locationId: locationId,
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchBldgsByLoc()

		if(bldgsByLocQuery && bldgsByLocQuery.buildingsLocation){
			setBuildingsData({
				...buildingsData,
				buildings: bldgsByLocQuery.buildingsLocation,
				total: bldgsByLocQuery.buildingsLocation[0] ? bldgsByLocQuery.buildingsLocation[0].total : undefined
			})
		}

	}, [bldgsByLocQuery])

	const [ createBuilding ] = useMutation(CREATE_BUILDING)
	const [ updateBuilding ] = useMutation(UPDATE_BUILDING)
	const [ archiveBuilding ] = useMutation(ARCHIVE_BUILDING)
	const [ deleteBuilding ] = useMutation(DELETE_BUILDING)

	const [building, setBuilding] = useState({})
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({
		_id: "",
		name: ""
	})

	const toggle = async (close, _id, name) => {
		setModalData({
			_id, name
		})
		if(typeof _id ===  "string"){
			let res = await refetchBuilding({_id})
			setBuilding(res.data.building)
		}
		if(close){
			setModal(!modal);
		}
	};

	console.log("RES BUILDING DATA", building)

	const onChangeModal = (e) => {
	setModalData({
			...modalData,
			[e.target.name] : e.target.value
		})
	}

	const onSubmitModal = (e) => {
		e.preventDefault()
		updateBuilding({
			variables: {...modalData},
			refetchQueries: [
				{
					query: GET_BUILDINGS_BY_LOCATION,
					variables: {
						locationId
					}
				}
			]
		})
		setModalData({
			_id: "",
			name: ""
		})
		setModal(!modal)
	} 

	const displayPagination = () => {
		return <Paginate total={total} getDocuments={refetchBldgsByLoc} limit={limit} setLoading={props.setLoading}/>
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

	if(locationLoading) return <Spinner color="primary"/>
	if(locationError) return <p>{locationError.message}</p>
	if(bldgsByLocLoading) return <Spinner color="primary"/>
	if(bldgsByLocError) return <p>{bldgsByLocError.message}</p>

	return (
		<Fragment>
			<h1 className="container-fluid text-center page-hdr">{locationName.toUpperCase()}</h1>
				<div className="d-flex justify-content-center align-items-start col-10 offset-md-1">
				<Col md="4" className="landing-desktop">
					<AddBuildingForm
						locationName={locationName}
						createBuilding={createBuilding}
						locationId={locationId}
						GET_BUILDINGS_BY_LOCATION={GET_BUILDINGS_BY_LOCATION}
						setLoading={props.setLoading}
					/>
				</Col>
				<Col md="8" className="landing-desktop">
					<div className="d-flex justify-content-end mr-3">	
						<div >
							<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
							<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
						</div>
					</div>
					<hr/>
					<AddBuildingTable
						toggle={toggle}
						buildings={buildings}
						locationId={locationId}
						GET_BUILDINGS_BY_LOCATION={GET_BUILDINGS_BY_LOCATION}
						refetchBldgsByLoc={refetchBldgsByLoc}
						updateBuilding={updateBuilding}
						archiveBuilding={archiveBuilding}
						deleteBuilding={deleteBuilding}
						setLoading={props.setLoading}
						setIsArchived={setIsArchived}
					/>
					<div className="text-right mr-4">
						{ total > limit ? <Paginate getDocuments={refetchBldgsByLoc} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
					</div>
				</Col>
				</div>

				<div className="landing-mobile d-flex flex-wrap">
					<Container className="landing-mobile">
						<Row className="">
							<Col>
								<AddBuildingForm
									locationName={locationName}
									createBuilding={createBuilding}
									locationId={locationId}
									GET_BUILDINGS_BY_LOCATION={GET_BUILDINGS_BY_LOCATION}
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
								<AddBuildingTableMobile
									toggle={toggle}
									buildings={buildings}
									locationId={locationId}
									GET_BUILDINGS_BY_LOCATION={GET_BUILDINGS_BY_LOCATION}
									refetchBldgsByLoc={refetchBldgsByLoc}
									updateBuilding={updateBuilding}
									archiveBuilding={archiveBuilding}
									deleteBuilding={deleteBuilding}
									setLoading={props.setLoading}
									bldgsByLocLoading={bldgsByLocLoading}
									setIsArchived={setIsArchived}
								/>
							</Col>
						</Row>
						<div className="text-center">
								{ total > limit ? <Paginate getDocuments={refetchBldgsByLoc} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
						</div>
					</Container>
				</div>
				<AddBuildingModal
					modal={modal}
					setModal={setModal}
					building={building}
					toggle={toggle}
					_id={modalData._id}
					name={modalData.name}
					isArchived={modalData.isArchived}
					onChangeModal={onChangeModal}
					updateBuilding={updateBuilding}
					archiveBuilding={archiveBuilding}
					deleteBuilding={deleteBuilding}
					locationId={locationId}
					GET_BUILDINGS_BY_LOCATION={GET_BUILDINGS_BY_LOCATION}
					setLoading={props.setLoading}
					bldgsByLocLoading={bldgsByLocLoading}
					modalData={modalData}
					setModalData={setModalData}
				/>
		</Fragment>
	)
}

export default AddBuildingPage;
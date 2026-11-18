import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BUILDING, GET_PARKING, GET_LOCATIONS, GET_BUILDINGS, GET_PARKINGS, GET_PARKINGS_BY_BUILDING } from '../graphql/queries';
import { CREATE_PARKING, UPDATE_PARKING, ARCHIVE_PARKING, DELETE_PARKING } from '../graphql/mutations';

import AddParkingForm from '../forms/AddParkingForm';
import AddParkingTable from '../tables/AddParkingTable';
import AddParkingTableMobile from '../tables/AddParkingTableMobile';
import AddParkingModal from '../modals/AddParkingModal';
import Paginate from '../partials/Paginate';

const AddParkingPage = props => {
	
	const buildingId = props.match.params.id

	const [isArchived, setIsArchived] = useState(null)

	const {
		error: parkingError,
		loading: parkingLoading,
		data: parkingQuery,
		refetch: refetchParking
	} = useQuery(GET_PARKING, {
		variables: {
			_id: "" 
		}
	})

	const {
		error: buildingError,
		loading: buildingLoading,
		data: buildingQuery,
		refetch: refetchBuilding
	} = useQuery(GET_BUILDING, {
		variables: {
			_id: buildingId
		}
	})

	const [parkingsData, setParkingsData] = useState({
		parkings: [],
		total: undefined,
		limit: 10
	})

	const { parkings, total, limit } = parkingsData

	const {
		error: parksByBldgError,
		loading: parksByBldgLoading,
		data: parksByBldgQuery,
		refetch: refetchParksByBldg
	} = useQuery(GET_PARKINGS_BY_BUILDING, {
		variables: {
			buildingId: buildingId,
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchParksByBldg()

		if(parksByBldgQuery && parksByBldgQuery.parkingsBuilding){
			setParkingsData({
				...parkingsData,
				parkings: parksByBldgQuery.parkingsBuilding,
				total: parksByBldgQuery.parkingsBuilding[0] ? parksByBldgQuery.parkingsBuilding[0].total : undefined
			})
		}
	}, [parksByBldgQuery])

	const locationId = buildingQuery && buildingQuery.building.locationId._id
	const locationName = buildingQuery && buildingQuery.building.locationId.name
	const buildingName = buildingQuery && buildingQuery.building.name

	const [ createParking ] = useMutation(CREATE_PARKING)
	const [ updateParking ] = useMutation(UPDATE_PARKING)
	const [ archiveParking ] = useMutation(ARCHIVE_PARKING)
	const [ deleteParking ] = useMutation(DELETE_PARKING)

	const [parking, setParking] = useState({})

	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({
		_id: "",
		name: ""
	})

	const toggle = async (close, _id, name) => {
		setModalData({
			_id, name
		})

		if(typeof _id === "string"){
			let res = await refetchParking({_id})
			setParking(res.data.parking)
		}

		if(close){
			setModal(!modal);
		}
	};

	const onChangeModal = (e) => {
		setModalData({
			...modalData,
			[e.target.name] : e.target.value
		})
	}

	const onSubmitModal = (e) => {
		e.preventDefault()
		updateParking({
			variables: {...modalData},
			refetchQueries: [
				{
					query: GET_PARKINGS
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
		return <Paginate total={total} getDocuments={refetchParksByBldg} limit={limit} />
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

	if(buildingLoading) return <Spinner color="primary"/>
	if(buildingError) return <p>{buildingError.message}</p>

	if(parksByBldgLoading) return <Spinner color="primary"/>
	if(parksByBldgError) return <p>{parksByBldgError.message}</p>

	return (
		<Fragment>

				<h1 className="container-fluid text-center page-hdr">{locationName.toUpperCase()}: &nbsp;{buildingName.toUpperCase()}</h1>
					<div className="d-flex justify-content-center align-items-start col-10 offset-md-1 landing-desktop">
					<Col md="4" className="landing-desktop">
						<AddParkingForm
							locationName={locationName}
							buildingName={buildingName}
							locationId={locationId}
							buildingId={buildingId}
							building={buildingQuery.building}
							parkings={parkings}
							createParking={createParking}
							GET_PARKINGS_BY_BUILDING={GET_PARKINGS_BY_BUILDING}
							setLoading={props.setLoading}
						/>
					</Col>
					<Col md="8" className="landing-desktop">
						<div className="d-flex justify-content-end">	
							<div >
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
							</div>
						</div>
						<hr/>
						<AddParkingTable
							toggle={toggle}
							parkings={parkings}							
							buildingId={buildingId}
							GET_PARKINGS_BY_BUILDING={GET_PARKINGS_BY_BUILDING}
							updateParking={updateParking}
							archiveParking={archiveParking}
							deleteParking={deleteParking}
							setLoading={props.setLoading}
						/>
						<div className="text-right mr-2">
							{ total > limit ? <Paginate getDocuments={refetchParksByBldg} limit={limit} total={total} /> : "" }
						</div>
					</Col>
					</div>

					<div>
						<Container className="landing-mobile">
							<Row className="">
								<Col>
									<AddParkingForm
										locationName={locationName}
										buildingName={buildingName}
										locationId={locationId}
										buildingId={buildingId}
										building={buildingQuery.building}
										parkings={parksByBldgQuery.parkingsBuilding}
										createParking={createParking}
										GET_PARKINGS_BY_BUILDING={GET_PARKINGS_BY_BUILDING}
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
									<AddParkingTableMobile
										toggle={toggle}
										parkings={parksByBldgQuery.parkingsBuilding}
										buildingId={buildingId}
										GET_PARKINGS_BY_BUILDING={GET_PARKINGS_BY_BUILDING}
										updateParking={updateParking}
										archiveParking={archiveParking}
										deleteParking={deleteParking}
										setLoading={props.setLoading}
									/>
								</Col>
							</Row>
							<div className="text-center">
								{ total > limit ? <Paginate getDocuments={refetchParksByBldg} limit={limit} total={total} /> : "" }
							</div>
						</Container>
					</div>
					<AddParkingModal
						modal={modal}
						setModal={setModal}
						parking={parking}
						toggle={toggle}
						_id={modalData._id}
						name={modalData.name}
						isArchived={modalData.isArchived}
						onChangeModal={onChangeModal}
						updateParking={updateParking}
						archiveParking={archiveParking}
						deleteParking={deleteParking}
						buildingId={buildingId}
						GET_PARKINGS_BY_BUILDING={GET_PARKINGS_BY_BUILDING}
						setLoading={props.setLoading}
						parksByBldgLoading={parksByBldgLoading}
						modalData={modalData}
						setModalData={setModalData}
					/>
		</Fragment>
	)
}

export default AddParkingPage;
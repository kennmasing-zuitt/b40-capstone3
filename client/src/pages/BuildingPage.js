import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS, GET_BUILDING, GET_BUILDINGS, GET_BUILDINGS_BY_LOCATION, GET_PARKINGS, GET_TOTAL_BUILDINGS } from '../graphql/queries';
import { CREATE_BUILDING, UPDATE_BUILDING, ARCHIVE_BUILDING, DELETE_BUILDING } from '../graphql/mutations';

import BuildingForm from '../forms/BuildingForm';
import BuildingTable from '../tables/BuildingTable';
import BuildingTableMobile from '../tables/BuildingTableMobile';
import BuildingModal from '../modals/BuildingModal';
import Paginate from '../partials/Paginate';

const BuildingsPage = props => {
	
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

	const [buildingsData, setBuildingsData] = useState({
		total: undefined,
		limit: 10
	})

	const { total, limit } = buildingsData

	const {
		error: buildingsError,
		loading: buildingsLoading,
		data: buildingsQuery,
		refetch: refetchBuildings
	} = useQuery(GET_BUILDINGS, {
		variables: {
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchBuildings()

		if(buildingsQuery && buildingsQuery.buildings){
			setBuildingsData({
				...buildingsData,
				total: buildingsQuery.buildings[0] ? buildingsQuery.buildings[0].total : undefined
			})
		}
	}, [buildingsQuery])

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
		if(typeof _id === "string"){
			let res = await refetchBuilding({_id})
			setBuilding(res.data.building)
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
		updateBuilding({
			variables: {...modalData},
			refetchQueries: [
				{
					query: GET_BUILDINGS
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
		return <Paginate total={total} getDocuments={refetchBuildings} limit={limit} setLoading={props.setLoading}/>
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

	if(buildingsLoading) return <Spinner color="primary"/>
	if(buildingsError) return <p>{buildingsError.message}</p>

	return (
		<Fragment>

				<h1 className="container-fluid text-center page-hdr">ALL BUILDINGS</h1>
					<div className="d-flex justify-content-center align-items-start col-10 offset-md-1 landing-desktop">
						<Col md="10" className="landing-desktop">
							<div className="d-flex justify-content-end">	
							<div >
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
							</div>
							</div>
							<hr/>
							<BuildingTable
								toggle={toggle}
								buildings={buildingsQuery.buildings}
								GET_BUILDINGS={GET_BUILDINGS}
								GET_PARKINGS={GET_PARKINGS}
								updateBuilding={updateBuilding}
								archiveBuilding={archiveBuilding}
								deleteBuilding={deleteBuilding}
								setLoading={props.setLoading}
							/>
							<div className="text-right mr-2">
								{ total > limit ? <Paginate getDocuments={refetchBuildings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
							</div>
						</Col>
					</div>

					<div className="landing-mobile d-flex flex-wrap">
						<Container className="landing-mobile">
								<div className="d-flex justify-content-end">	
									<div >
										<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
										<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
										<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
									</div>
								</div>
								<Col className="col-12 offset-md-1 d-flex justify-content-center align-items-center">
									<BuildingTableMobile
										toggle={toggle}
										buildings={buildingsQuery.buildings}
										GET_BUILDINGS={GET_BUILDINGS}
										updateBuilding={updateBuilding}
										archiveBuilding={archiveBuilding}
										deleteBuilding={deleteBuilding}
										setLoading={props.setLoading}
									/>
								</Col>
								<div className="text-center">
									{ total > limit ? <Paginate getDocuments={refetchBuildings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
								</div>
						</Container>
					</div>
					<BuildingModal
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
						GET_BUILDINGS={GET_BUILDINGS}
						setLoading={props.setLoading}
						buildingsLoading={buildingsLoading}
						modalData={modalData}
						setModalData={setModalData}
					/>
		</Fragment>
	)
}

export default BuildingsPage;
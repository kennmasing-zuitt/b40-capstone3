import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCATION, GET_LOCATIONS, GET_BUILDINGS, GET_PARKINGS, GET_TOTAL_LOCATIONS } from '../graphql/queries';
import { CREATE_LOCATION, UPDATE_LOCATION, ARCHIVE_LOCATION, DELETE_LOCATION } from '../graphql/mutations';

import LocationTable from '../tables/LocationTable';
import LocationTableMobile from '../tables/LocationTableMobile';
import LocationModal from '../modals/LocationModal';
import Paginate from '../partials/Paginate';

const LocationPage = props => {
	
	const [isArchived, setIsArchived] = useState(null)

	const [locationsData, setLocationsData] = useState({
		total: undefined,
		limit: 10
	})

	const { total, limit } = locationsData;
	
	const {
		error: locationError,
		loading: locationLoading,
		data: locationQuery,
		refetch: refetchLocation
	} = useQuery(GET_LOCATION, {
		variables: {
			id: ""
		}
	})

	const {
		error: locationsError,
		loading: locationsLoading,
		data: locationsQuery,
		refetch: refetchLocations
	} = useQuery(GET_LOCATIONS, {
		variables: {
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchLocations()

		if(locationsQuery && locationsQuery.locations){
			setLocationsData({
				...locationsData,
				total: locationsQuery.locations[0] ? locationsQuery.locations[0].total : undefined
			})
		}
	}, [locationsQuery])


	const [ createLocation ] = useMutation(CREATE_LOCATION)
	const [ updateLocation ] = useMutation(UPDATE_LOCATION)
	const [ archiveLocation ] = useMutation(ARCHIVE_LOCATION)
	const [ deleteLocation ] = useMutation(DELETE_LOCATION)

	const [location, setLocation] = useState({})

	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({
		_id: "",
		name: "",
	})

	const toggle = async (close, _id, name) => {
		setModalData({
			_id, name
		})

		if(typeof _id === "string"){
			let res = await refetchLocation({_id})

			setLocation(res.data.location)
		}
		if(close){
			setModal(!modal);
		}
	};
	console.log("LOCATION", location)

	const onChangeModal = (e) => {
		setModalData({
			...modalData,
			[e.target.name] : e.target.value
		})
	}

	const displayPagination = () => {
		return <Paginate total={total} getDocuments={refetchLocations} limit={limit} setLoading={props.setLoading}/>
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

	if(locationsLoading) return <Spinner color="primary"/>
	if(locationsError) return <p>{locationsError.message}</p>

	return (
		<Fragment>
			<h1 className="container-fluid text-center page-hdr">ALL LOCATION</h1>
				<div className="d-flex justify-content-center align-items-start col-10 offset-md-1 landing-desktop">
					<Col md="8" className="landing-desktop">
						<div className="d-flex justify-content-end">	
							<div >
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
							</div>
						</div>
						<hr/>
						<LocationTable
							toggle={toggle}
							locations={locationsQuery.locations}
							GET_LOCATIONS={GET_LOCATIONS}
							updateLocation={updateLocation}
							archiveLocation={archiveLocation}
							deleteLocation={deleteLocation}
							setLoading={props.setLoading}
						/>
						<div className="text-right mr-2">
							{ total > limit ? <Paginate getDocuments={refetchLocations} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
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
							<LocationTableMobile
								toggle={toggle}
								locations={locationsQuery.locations}
								GET_LOCATIONS={GET_LOCATIONS}
								updateLocation={updateLocation}
								archiveLocation={archiveLocation}
								deleteLocation={deleteLocation}
								setLoading={props.setLoading}
							/>
						</Col>
						<div className="text-center">
							{ total > limit ? <Paginate getDocuments={refetchLocations} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
						</div>
					</Container>
				</div>
				<LocationModal
					modal={modal}
					setModal={setModal}
					location={location}
					toggle={toggle}
					_id={modalData._id}
					name={modalData.name}
					isArchived={modalData.isArchived}
					onChangeModal={onChangeModal}
					updateLocation={updateLocation}
					archiveLocation={archiveLocation}
					deleteLocation={deleteLocation}
					GET_LOCATIONS={GET_LOCATIONS}
					setLoading={props.setLoading}
					locationsLoading={locationsLoading}
					modalData={modalData}
					setModalData={setModalData}
				/>
		</Fragment>
	)
}

export default LocationPage;
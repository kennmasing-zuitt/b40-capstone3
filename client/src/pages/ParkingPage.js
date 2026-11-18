import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS, GET_PARKING, GET_PARKINGS, GET_TOTAL_PARKINGS } from '../graphql/queries';
import { CREATE_PARKING, UPDATE_PARKING, ARCHIVE_PARKING, DELETE_PARKING } from '../graphql/mutations';

import axios from 'axios';
import { URL } from '../config';
import Swal from 'sweetalert2';
import Paginate from '../partials/Paginate';

import ParkingTable from '../tables/ParkingTable';
import ParkingTableMobile from '../tables/ParkingTableMobile';
import ParkingModal from '../modals/ParkingModal';

const ParkingsPage = props => {

	const [isArchived, setIsArchived] = useState(null)

	const {
		error: parkingError,
		loading: parkingLoading,
		data: parkingQuery,
		refetch: refetchParking
	} = useQuery(GET_PARKING, {
		variables: { _id: "" }
	})
	
	const [parkingsData, setParkingsData] = useState({
		total: undefined,
		limit: 10
	})
	
	const { total, limit } = parkingsData;

	const {
		error: parkingsError,
		loading: parkingsLoading,
		data: parkingsQuery,
		refetch: refetchParkings
	} = useQuery(GET_PARKINGS, {
		variables: {
			isArchived: isArchived,
			limit: limit
		}
	})

	useEffect(() => {
		refetchParkings()
		if(parkingsQuery && parkingsQuery.parkings){
			setParkingsData({
				...parkingsData,
				total: parkingsQuery.parkings[0] ? parkingsQuery.parkings[0].total : undefined
			})
		}
	}, [parkingsQuery])

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
		return <Paginate total={total} getDocuments={refetchParkings} limit={limit} setLoading={props.setLoading}/>
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
	
	if(parkingsLoading) return <Spinner color="primary"/>
	if(parkingsError) return <p>{parkingsError.message}</p>

	return (
		<Fragment>
				<h1 className="container-fluid text-center page-hdr">ALL PARKINGS</h1>
				<div className="d-flex justify-content-center align-items-center col-10 offset-md-1 landing-desktop">
					<Col md="10" className="landing-desktop">
						<div className="d-flex justify-content-end">	
							<div >
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetAll(e) }>Get All</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetActive(e) }>Get Active</button>
								<button className="btn btn-sm btn-outline-secondary mr-1" onClick={ e => onClickGetArchived(e) }>Get Archived</button>
							</div>
						</div>
						<hr/>
						<ParkingTable
							toggle={toggle}
							parkings={parkingsQuery.parkings}
							GET_PARKINGS={GET_PARKINGS}
							updateParking={updateParking}
							archiveParking={archiveParking}
							deleteParking={deleteParking}
							setLoading={props.setLoading}
						/>
						<div className="text-right mr-2">
							{ total > limit ? <Paginate getDocuments={refetchParkings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
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
								<ParkingTableMobile
									toggle={toggle}
									parkings={parkingsQuery.parkings}
									GET_PARKINGS={GET_PARKINGS}
									updateParking={updateParking}
									archiveParking={archiveParking}
									deleteParking={deleteParking}
									setLoading={props.setLoading}
								/>
							</Col>
							<div className="text-center">
								{ total > limit ? <Paginate getDocuments={refetchParkings} limit={limit} total={total} setLoading={props.setLoading}/> : "" }
							</div>
					</Container>
				</div>
				<ParkingModal
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
					GET_PARKINGS={GET_PARKINGS}
					setLoading={props.setLoading}
					parkingsLoading={parkingsLoading}
					modalData={modalData}
					setModalData={setModalData}
				/>
		</Fragment>
	)
}

export default ParkingsPage;
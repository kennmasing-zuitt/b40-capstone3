import React, { Fragment } from 'react';
import {  Button, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Container, Col, Row } from 'reactstrap';
import { FaHeartbeat, FaPiggyBank } from 'react-icons/fa';
import { MdDirectionsBike } from  'react-icons/md';
import { GiEarthAsiaOceania } from 'react-icons/gi'

import HeaderCardBody from '../cardbodies/HeaderCardBody';

const HeaderCard = (props) => {

	return (
		<Fragment>
			<div className="card-group container-fluid mt-5">
				<Row className="mt-5">
					<h1 className="card-hdr-mobile text-center">WHY YOU SHOULD BIKE TO WORK</h1>
				</Row>
				<div className="row d-flex flex-wrap justify-content-center align-items-center">
					<Card className="col-5 container-fluid d-flex justify-content-center align-items-center my-1 mx-1 card-vh">
						<CardBody className="col-12 no-gutters container container-fluid">
							<CardTitle>
								<div className="mb-5">
										<p className="text-center mt-3 icon-mobile">
											<MdDirectionsBike
											className="heartbeat"
											size={100}
											/>
										</p>
									<CardBody className="mt-n4">
										<CardTitle>
											<h2 className="text-center card-title-mobile">AVOID TRAFFIC</h2>
										</CardTitle>
										<CardSubtitle className="text-center card-subtitle">
											<h5>Cyclists don’t get stuck in traffic jams and aren’t susceptible to the usual transit delays of driving or public transportation, making bike commuting as fast or faster than driving for most urban commutes.</h5>
										</CardSubtitle>
									</CardBody>
								</div>
							</CardTitle>
						</CardBody>
					</Card>
					<Card className="col-5 container-fluid d-flex justify-content-center align-items-center my-1 mx-1 card-vh">
						<CardBody className="col-12 no-gutters">
							<CardTitle>
								<div className="mb-5">
										<p className="text-center mt-3 icon-mobile">
											<FaHeartbeat
											className="heartbeat"
											size={100}
											/>
										</p>
									<CardBody className="mt-n4">
										<CardTitle>
											<h2 className="text-center card-title-mobile no-gutters">IMPROVE HEALTH</h2>
										</CardTitle>
										<CardSubtitle className="text-center card-subtitle">
											<h5>You want to exercise, but find it difficult to squeeze a trip to the gym into your regular schedule. If you ride your bike to work you will be feeding two birds with one seed because you just turned your commute time into a workout.</h5>
										</CardSubtitle>
									</CardBody>
								</div>
							</CardTitle>
						</CardBody>
					</Card>
					<Card className="col-5 container-fluid d-flex justify-content-center align-items-center my-1 mx-1 card-vh">
						<CardBody className="col-12 no-gutters">
							<CardTitle>
								<div className="mb-5">
										<p className="text-center mt-3 icon-mobile">
											<FaPiggyBank
											className="piggybank"
											size={100}
											/>
										</p>
									<CardBody className="mt-n4">
										<CardTitle>
											<h2 className="text-center card-title-mobile no-gutters">SAVE MONEY</h2>
										</CardTitle>
										<CardSubtitle className="text-center card-subtitle">
											<h5>Instead of sitting in a car, spending your money on gas, you can put that cash in the bank because you won’t be using it when you ride your bike to work.</h5>
										</CardSubtitle>
									</CardBody>
								</div>
							</CardTitle>
						</CardBody>
					</Card>
					<Card className="col-5 container-fluid d-flex justify-content-center align-items-center my-1 mx-1 card-vh">
						<CardBody className="col-12 no-gutters">
							<CardTitle>
								<div className="mb-5">
										<p className="text-center mt-3 icon-mobile">
											<GiEarthAsiaOceania
											className="piggybank"
											size={100}
											/>
										</p>
									<CardBody className="mt-n3">
										<CardTitle>
											<h2 className="text-center card-title-mobile-02 no-gutters">PROTECT THE ENVIRONMENT</h2>
										</CardTitle>
										<CardSubtitle className="text-center card-subtitle">
											<h5>It has been suggested that air pollution from car exhaust is one of the possible causes of climate change. If you ride your bike to work you will feel better knowing that you are doing your part to tread lightly on Mother Earth.</h5>
										</CardSubtitle>
									</CardBody>
								</div>
							</CardTitle>
						</CardBody>
					</Card>
				</div>
				<Row className="d-flex justify-content-center align-items-center mt-4">
					<Button type="button" color="primary" className="btn btn-lg rounded-pill btn-text">&nbsp; KNOW MORE &nbsp;</Button>
				</Row>
			</div>
		</Fragment>
	)
}

export default HeaderCard;
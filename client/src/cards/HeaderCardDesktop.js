import React, { Fragment } from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Container, Col, Row } from 'reactstrap';
import { FaHeartbeat, FaPiggyBank } from 'react-icons/fa';
import { MdDirectionsBike } from  'react-icons/md';
import { GiEarthAsiaOceania } from 'react-icons/gi'

import HeaderCardBody from '../cardbodies/HeaderCardBody';

const HeaderCard = (props) => {

	return (
		<Fragment>
			<div className="card-group container-fluid mt-5 col-12 no-gutters home02-pad">
				<div className="mt-5 d-flex justify-content-center col-12 no-gutters">
					<h1 className="card-hdr-desktop text-center">WHY YOU SHOULD BIKE TO WORK</h1>
				</div>
				<div className="col-12 mt-5 mb-3">
					<div className="d-flex justify-content-center col-10 offset-md-1">
						<Card className="col-3 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh">
							<CardBody className="col-12 no-gutters">
								<CardTitle>
									<div className="mb-5">
											<p className="text-center mt-2 icon-desktop">
												<MdDirectionsBike
												className="heartbeat"
												size={125}
												/>
											</p>
										<CardBody className="mt-n4">
											<CardTitle>
												<h2 className="text-center card-title-desktop">AVOID<br/>TRAFFIC</h2>
											</CardTitle>
											<CardSubtitle className="text-center card-subtitle">
												<h5 className="card-subtitle">Cyclists don’t get stuck in traffic jams and aren’t susceptible to the usual transit delays of driving or public transportation, making bike commuting as fast or faster than driving for most urban commutes.</h5>
											</CardSubtitle>
										</CardBody>
									</div>
								</CardTitle>
							</CardBody>
						</Card>

						<Card className="col-3 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh">
							<CardBody className="col-12 no-gutters">
								<CardTitle>
									<div className="mb-5">
											<p className="text-center mt-2 icon-desktop">
												<FaHeartbeat
												className="heartbeat"
												size={125}
												/>
											</p>
										<CardBody className="mt-n4">
											<CardTitle>
												<h2 className="text-center card-title-desktop">IMPROVE HEALTH</h2>
											</CardTitle>
											<CardSubtitle className="text-center card-subtitle">
												<h5 className="card-subtitle">You want to exercise, but find it difficult to squeeze a trip to the gym into your regular schedule. If you ride your bike to work you will be feeding two birds with one seed because you just turned your commute time into a workout.</h5>
											</CardSubtitle>
										</CardBody>
									</div>
								</CardTitle>
							</CardBody>
						</Card>

						<Card className="col-3 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh">
							<CardBody className="col-12 no-gutters">
								<CardTitle>
									<div className="mb-5">
											<p className="text-center mt-2 icon-desktop">
												<FaPiggyBank
												className="piggybank"
												size={125}
												/>
											</p>
										<CardBody className="mt-n4">
											<CardTitle>
												<h2 className="text-center card-title-desktop">SAVE<br/>MONEY</h2>
											</CardTitle>
											<CardSubtitle className="text-center card-subtitle">
												<h5 className="card-subtitle">Instead of sitting in a car, spending your money on gas, you can put that cash in the bank because you won’t be using it when you ride your bike to work.</h5>
											</CardSubtitle>
										</CardBody>
									</div>
								</CardTitle>
							</CardBody>
						</Card>

						<Card className="col-3 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh">
							<CardBody className="col-12 no-gutters">
								<CardTitle>
									<div className="mb-5">
											<p className="text-center mt-2 icon-desktop">
												<GiEarthAsiaOceania
												className="piggybank"
												size={125}
												/>
											</p>
										<CardBody className="mt-n3">
											<CardTitle>
												<h2 className="text-center card-title-desktop-02">PROTECT THE<br/>ENVIRONMENT</h2>
											</CardTitle>
											<CardSubtitle className="text-center card-subtitle">
												<h5 className="card-subtitle">It has been suggested that air pollution from car exhaust is one of the possible causes of climate change. If you ride your bike to work you will feel better knowing that you are doing your part to tread lightly on Mother Earth.</h5>
											</CardSubtitle>
										</CardBody>
									</div>
								</CardTitle>
							</CardBody>
						</Card>
					</div>
				</div>
				<Row className="col-12 d-flex justify-content-center align-items-center mt-4">
					<Button type="button" color="primary" className="btn btn-lg rounded-pill btn-text">&nbsp; KNOW MORE &nbsp;</Button>
				</Row>
			</div>
		</Fragment>
	)
}

export default HeaderCard;
import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import { FaHeartbeat, FaPiggyBank, FaCrown, FaUsers, FaUserPlus } from 'react-icons/fa';
import { MdDirectionsBike } from  'react-icons/md';
import { GiEarthAsiaOceania } from 'react-icons/gi'

const UserAdminCardMobile = props => {

	return (
		<Fragment>
				<Card className="col-12 container-fluid d-flex justify-content-center align-items-center card-vh-roles mb-4">
					<CardBody className="col-12 no-gutters ">
						<CardTitle className="">
							<div className="mb-5 ">
									<p className="text-center mt-2 icon-mobile">
										<FaUserPlus
										className="heartbeat"
										size={125}
										/>
									</p>
								<CardBody className="mt-n4 ">
									<CardTitle className="mb-4 ">
										<h2 className="text-center card-title-mobile">ADMIN<br/>USERS</h2>
									</CardTitle>
									<Link to={`users/admin/2`} className="btn btn-sm btn-block btn-primary mr-1">View</Link>

								</CardBody>
							</div>
						</CardTitle>
					</CardBody>
				</Card>

				<Card className="col-12 container-fluid d-flex justify-content-center align-items-center card-vh-roles mb-4">
					<CardBody className="col-12 no-gutters ">
						<CardTitle className="">
							<div className="mb-5 ">
									<p className="text-center mt-2 icon-mobile ">
										<FaUsers
										className="heartbeat"
										size={125}
										/>
									</p>
								<CardBody className="mt-n4 ">
									<CardTitle className="mb-4 ">
										<h2 className="text-center card-title-mobile">ORDINARY<br/>USERS</h2>
									</CardTitle>
									<Link to={`users/ordinary/3`} className="btn btn-sm btn-block btn-primary mr-1">View</Link>

								</CardBody>
							</div>
						</CardTitle>
					</CardBody>
				</Card>
		</Fragment>
	)
}

export default UserAdminCardMobile;
import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import UserSuperAdminCard from '../cards/UserSuperAdminCard';
import UserAdminCard from '../cards/UserAdminCard';
import UserSuperAdminCardMobile from '../cards/UserSuperAdminCardMobile';
import UserAdminCardMobile from '../cards/UserAdminCardMobile';

const UserRolesPage = props => {

	let userData = ""
	if(props.roleId == 1) {
		userData = (
			<Fragment>
	`			<div className="col-10 mr-5 offset-md-1">
					<Col className="landing-desktop d-flex col-12">
						<UserSuperAdminCard />
					</Col>
				</div>
				<div className="col-12 card-mobile">
					<Col className="d-flex flex-wrap col-12">
						<UserSuperAdminCardMobile />
					</Col>	
				</div>	`
			</Fragment>
		)
	} else if(props.roleId == 2) {
		userData = (
			<Fragment>
				<div className="col-10 mr-5 offset-md-1">
					<Col className="landing-desktop d-flex col-12">
						<UserAdminCard />
					</Col>
				</div>
				<div className="col-12 card-mobile">
					<Col className="d-flex flex-wrap col-12">
						<UserAdminCardMobile />
					</Col>	
				</div>
			</Fragment>	
		)
	}

	return (
		<Fragment>
			<h1 className="container-fluid text-center page-hdr">USER ROLES PAGE</h1>
			{userData}
		</Fragment>
	)
}

export default UserRolesPage;
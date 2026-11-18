import React, { Fragment } from 'react';
import { Col } from 'reactstrap';

import RegisterForm from '../forms/RegisterForm';
import Image01 from "../images/styling/biketowork3.png";

import logo from "../images/styling/parqerlogo04.png"

const RegisterPage = (props) => {
	return (
		<Fragment>
			<div className="d-flex justify-content-center align-items-center login-vh no-gutters">
				<Col md="7" className="login-img">
					<img src={Image01} className="img-size img-position"/>
				</Col>
				<Col md="4" className="container-fluid">
					<div className="d-flex justify-content-center mr-2">
						<img src={logo} className="parqer-logo-login mb-3 mr-3"/>
					</div>
					<h1 className="text-center">REGISTER</h1>
					<RegisterForm setLoading={props.setLoading}/>
				</Col>
			</div>
		</Fragment>	
	)
}

export default RegisterPage;
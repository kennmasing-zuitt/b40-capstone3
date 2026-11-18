import React, { Fragment, useState } from 'react';
import { Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

import LoginForm from '../forms/LoginForm';
import Image01 from "../images/styling/biketowork4.png";
import logo from '../images/styling/parqerlogo04.png';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '../graphql/mutations'

const LoginPage = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isRedirected, setIsRedirected] = useState(false)

	const [ login ] = useMutation(LOGIN_MUTATION)


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
					<h1 className="text-center">LOGIN</h1>
					<LoginForm
						setLoading={props.setLoading}
						login={login}
					/>
				</Col>
			</div>
		</Fragment>	
	)
}

export default LoginPage;
import React, { Fragment, useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config';



const LoginForm = (props) => {

const [formData, setFormData] = useState({
	username: "",
	email: "",
	password: ""
})

const { username, email, password } = formData;

const [ disabledBtn, setDisabledBtn ] = useState(true)

const onChangeHandler = e => {
	setFormData({
		...formData,
		[e.target.name] : e.target.value
	})
}

const onSubmitHandler = async (e) => {
		e.preventDefault()
		props.setLoading(true)
		await props.login({
			variables: {
				...formData,
				username: username,
				password: password
			}
		}).then((response) => {
			let data = response.data.login

			console.log("LOGIN DATA", data)

			if(data != null){
				localStorage.setItem("token", data.token)
				localStorage.setItem("_id", data._id)
				localStorage.setItem("roleId", data.roleId)
				localStorage.setItem("firstName", data.firstName)
				localStorage.setItem("lastName", data.lastName)
				localStorage.setItem("username", data.username)
				localStorage.setItem("email", data.email)

				Swal.fire({
		          title: "Success",
		          text: "Welcome, " + data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1) + " " + data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1) + "!",
		          icon: "success",
		          showConfirmationButton: false,
		          timer: 3000
		        })

				return window.location = "/"
			} else {
				props.setLoading(false)
				localStorage.removeItem("token")
				localStorage.removeItem("_id")
				localStorage.removeItem("roleId")
				localStorage.removeItem("firstName")
				localStorage.removeItem("lastName")
				localStorage.removeItem("username")
				localStorage.removeItem("email")
				Swal.fire({
					title: "Error",
					text: "Username, Email or Password don't match!",
					icon: "error",
					showConfirmationButton: false,
					timer: 3000
				})
				console.log(e.message)
			}
		})
	}

// const onSubmitHandler = async e => {
// 	e.preventDefault();
// 	props.setLoading(true)
// 	try{
// 		const config = {
// 			headers: {
// 				'Content-Type' : 'application/json'
// 			}
// 		}
// 		const body = JSON.stringify(formData)
		
// 		const res = await axios.post(`${URL}/users/login`, body, config)

// 		console.log("USER DATA", res.data.user)

// 		localStorage.setItem("token", res.data.token)
// 		localStorage.setItem("_id", res.data.user._id)
// 		localStorage.setItem("roleId", res.data.user.roleId)
// 		localStorage.setItem("firstName", res.data.user.firstName)
// 		localStorage.setItem("lastName", res.data.user.lastName)
// 		localStorage.setItem("username", res.data.user.username)
// 		localStorage.setItem("email", res.data.user.email)

// 		Swal.fire({
//           title: "Success",
//           text: "Welcome, " + localStorage.firstName.charAt(0).toUpperCase() + localStorage.firstName.slice(1) + " " + localStorage.lastName.charAt(0).toUpperCase() + localStorage.lastName.slice(1) + "!",
//           icon: "success",
//           showConfirmationButton: false,
//           timer: 3000
//         })

// 		return window.location = "/"

// 	} catch(e) {
// 		props.setLoading(false)
// 		localStorage.removeItem("token")
// 		localStorage.removeItem("_id")
// 		localStorage.removeItem("roleId")
// 		localStorage.removeItem("firstName")
// 		localStorage.removeItem("lastName")
// 		localStorage.removeItem("username")
// 		localStorage.removeItem("email")
// 		Swal.fire({
// 			title: "Error",
// 			text: "Username, Email or Password don't match!",
// 			icon: "error",
// 			showConfirmationButton: false,
// 			timer: 3000
// 		})
// 		console.log(e.message)
// 	}
	
// }

  //USE EFFECT
  useEffect(() => {
  	if(username !== "" && password !== "") {
  		setDisabledBtn(false) 
  	} else {
  		setDisabledBtn(true)
  	}
  }, [formData])


	return (
		<Fragment>
			<Form className="cotainer container-fluid my-3 mt-5" onSubmit={ e => onSubmitHandler(e) }>
				<FormGroup>
			        <Label for="exampleEmail">Username</Label>
			        <Input
			        	type="text"
			        	name="username"
			        	id="username"
			        	value={username}
			        	onChange={ e => onChangeHandler(e) }
			        	required
			        	pattern="[a-zA-Z0-9]+"
			        />
			      </FormGroup>
			      <FormGroup>
			        <Label for="examplePassword">Password</Label>
			        <Input 
			        	type="password"
			        	name="password"
			        	id="password"
			        	value={password}
			        	onChange={ e => onChangeHandler(e) }
			        	required
			        	className="mb-4"
			        />
			      </FormGroup>
				<Button
					color="primary"
					className="btn mb-4 btn-block"
					disabled={disabledBtn}>
					Login
				</Button>
				<p className="d-flex justify-content-center">
						Don't have an account yet? <Link to="/register">&nbsp;Register</Link>
				</p>
			</Form>
			<div className="d-flex justify-content-center mt-5">
				<div className="">
					<table className="">
						<tr>
							<th></th>
							<th><h6 className="text-center ">LOGIN CREDENTIALS</h6></th>
							<th></th>
						</tr>
						<tr>
							<th className="text-center">USERNAME</th>
							<th className="text-center">PASSWORD</th>
							<th className="text-center">ROLE</th>
						</tr>
						<tr>
							<td className="text-center">superadmin123</td>
							<td className="text-center">123123123</td>
							<td className="text-center">super admin</td>
						</tr>
						<tr>
							<td className="text-center">admin123</td>
							<td className="text-center">123123123</td>
							<td className="text-center">admin</td>
						</tr>
						<tr>
							<td className="text-center">user123</td>
							<td className="text-center">123123123</td>
							<td className="text-center">user</td>
						</tr>
					</table>
				</div>
			</div>
		</Fragment>
	)
}

export default LoginForm;
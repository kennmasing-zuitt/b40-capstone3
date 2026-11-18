import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

const NotFoundPage = props => {
	return (
		<Container>
			<Row>
				<Col className="m-3">
					<h1 className="page-hdr">PAGE NOT FOUND</h1>
					<Link to="/home" className="bottom-border navlink-body">> Return Home</Link>
				</Col>
			</Row>
		</Container>
	)
}

export default NotFoundPage;
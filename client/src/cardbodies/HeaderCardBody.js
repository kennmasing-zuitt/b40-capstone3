import React, { Fragment } from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import axios from 'axios';

const HeaderCardBody = (props) => {

	return (
		<Fragment>
			<Card className="mb-5">
				<CardBody>
					<CardTitle><h1 className="text-center card-hdr">NAME</h1></CardTitle>
					<CardSubtitle className=""><h5>DESCRIPTION</h5></CardSubtitle>
				</CardBody>
					<img className="img-fluid w-100 row no-gutters mt-n3" src="" />
				<CardBody>
					<CardText className="text-center">SAMPLE</CardText>
					<Button className="ml-1 btn btn-block btn-warning" >RATE ME</Button>
				</CardBody>
			</Card>
		</Fragment>
	)
}

export default HeaderCardBody;
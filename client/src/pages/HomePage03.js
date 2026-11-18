import React, { Fragment } from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, CardHeader, CardFooter, Container, Col, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

const HomePage03 = (props) => {
	return (
		<Fragment>
			<div className="landing-mobile">
				<div className="col-12 d-flex justify-content-center align-items-center landing-mobile no-gutters ">
					<Card>
						<CardHeader tag="h3" className="card-hdr-txt01">Featured</CardHeader>
						<CardBody>
							<CardTitle className="card-title-home03-mobile">Cycling through the metro's traffic</CardTitle>
							<CardText className="card-text03">
								Tired of the sorry state of public transportation, a Filipino commuter makes the shift to bike commuting to 'improve his quality of life'
							</CardText>
							<a href="https://www.rappler.com/nation/232086-manila-moves-cycling-through-manila-traffic" target="_blank" className="btn btn-secondary">Read more</a>
						</CardBody>
					</Card>
		     	</div>
			</div>
			<div className="landing-desktop">
				<Col className="col-6 landing-desktop">
					<Card>
						<CardHeader tag="h3" className="card-hdr-txt01">Featured</CardHeader>
						<CardBody>
							<CardTitle className="card-title-text02">Cycling through the metro's traffic</CardTitle>
							<CardText className="card-text03">
								Tired of the sorry state of public transportation, a Filipino commuter makes the shift to bike commuting to 'improve his quality of life'
							</CardText>
							<a href="https://www.rappler.com/nation/232086-manila-moves-cycling-through-manila-traffic" target="_blank" className="btn btn-secondary">Read more</a>
						</CardBody>
					</Card>
		     	</Col>
				<Col className="col-7 landing-desktop">

				</Col>
			</div>
     	</Fragment>
	)
}

export default HomePage03;
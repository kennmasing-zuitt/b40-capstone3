import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

import bikeparking from '../images/styling/bikeparking.png';
import HeaderCardMobile from '../cards/HeaderCardMobile';
import HeaderCardDesktop from '../cards/HeaderCardDesktop';

const HomePage01 = (props) => {
	return (
		<Fragment>
			<Row className="landing-mobile">
				<HeaderCardMobile />
			</Row>
			<div className="landing-desktop col-12">
				<HeaderCardDesktop/>
			</div>
		</Fragment>
	)
}

export default HomePage01;
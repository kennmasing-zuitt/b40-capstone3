import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

import FooterMobile from '../partials/FooterMobile';
import FooterDesktop from '../partials/FooterDesktop';

const FooterPage = (props) => {
	return (
		<Fragment>
			<Col className="col-12 footer-mobile no-gutters">
				<FooterMobile/>
			</Col>
			<div className="col-12 footer-desktop no-gutters">
				<FooterDesktop/>
			</div>
		</Fragment>
	)
}

export default FooterPage;
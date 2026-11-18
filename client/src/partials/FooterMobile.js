import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

import logo from '../images/styling/parqerlogo07.png';

const FooterMobile = (props) => {
	return (
		<Fragment>
			<div className="container-fluid col-12 no-gutters d-flex bg-primary">
				<div className="col-12 text-center">
					<div className="col-12 d-flex justify-content-center align-items-center mt-3">
						<div className="col-2">
							<div className="">
							  <img className="parqer-logo-footer" src={logo}/>
							</div>
						</div>
						<div className="container-fluid col-8 d-flex justify-content-center">
							<div className="container-fluid">
								<h6 className="smallheader-footer smalltxt-ftr"></h6>
							</div>
						</div>
				    	<div className="col-2">
							<div className="d-flex justify-content-end">
								<button className="btn btn-outline-light rounded-pill px-3">Contribute</button>
							</div>
						</div>
			    	</div>
			    	<div className="container-fluid">
						<div className="container-fluid">
							<div className="row container-fluid pl-1">
								<h6 className="text-white ml-3">BIKE TO WORK. SKIP THE CAR</h6>
							</div>
							<div class="row d-flex justify-content-end" id="socialmedia">
								<i className="fab fa-facebook-f ml-1 mr-2 fa-2x d-flex justify-content-center align-items-center" id="socialmediaicons"></i>
								<i className="fab fa-twitter mx-2 fa-2x d-flex justify-content-center align-items-center" id="socialmediaicons"></i>
								<i className="fab fa-instagram mx-2 fa-2x d-flex justify-content-center d-flex align-items-center" id="socialmediaicons"></i>
								<i className="fab fa-linkedin-in mx-2 fa-2x d-flex justify-content-center d-flex align-items-center" id="socialmediaicons"></i>
							</div>
						</div>
			    	</div>
					<div class="container-fluid d-flex justify-content-center container-fluid col-12 col-sm-12 col-md-12 card-body2 copyright-nextline mt-3">
						<ul class="d-flex justify-content-center mr-0 col-10 col-sm-10 col-md-10 card-body2">
							<li className="list-unstyled">
							<a href="" className="px-0 footer-txt-mobile text-white">A-Z-SITE INDEX |</a>&nbsp;
							</li>
							<li className="list-unstyled">
							<a href="" className="px-0 footer-txt-mobile text-white">CONTACT |</a>&nbsp;
							</li>
							<li className="list-unstyled">
							<a href="" className="px-0 footer-txt-mobile text-white">COPYRIGHT |</a>&nbsp;
							</li>
							<li className="list-unstyled">
							<a href="" className="px-0 footer-txt-mobile text-white">PRIVACY NOTICE |</a>&nbsp;
							</li>
							<li className="list-unstyled">
							<a href="" className="px-0 footer-txt-mobile text-white">TERMS OF USE</a>&nbsp;
							</li>
						</ul>
					</div>
					<div className="container-fluid d-flex justify-content-center col-12 col-sm-12 col-md-12 card-body2 copyright-nextline">
						<small className="text-center text-white">&copy; 2019 <strong>Parqer Philippines</strong> <span>| All rights reserved</span></small>
					</div>
	        	</div>
			</div>
		</Fragment>
	)
}

export default FooterMobile;
import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

import logo from '../images/styling/parqerlogo07.png';

const FooterDesktop = (props) => {
	return (
		<Fragment>
			<div className="col-12 no-gutters d-flex">
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
			    	<div className="mt-n3">
						<div className="d-flex justify-content-center">
								<hr className="hrcolor py-0" />
						</div>

						<div className="d-flex ">
							<div className="container-fluid d-flex justify-content-start col-5 col-sm-5 col-md-5 card-body2 copyright-sameline">
									<small className="smalltxt-ftr">&copy; 2019 <strong>Parqer Philippines</strong> <span>| All rights reserved</span></small>
							</div>

							<div className="container-fluid d-flex justify-content-end container-fluid col-7 col-sm-7 col-md-7 card-body2 copyright-sameline">
								<ul className="d-flex justify-content-end mr-0 col-12 col-sm-12 col-md-12 card-body2">
									<li className="list-unstyled smalltxt-ftr">
										<a href="" className="px-0 smalltxt-ftr"> A-Z-SITE INDEX </a> |&nbsp;
									</li>
									<li className="list-unstyled smalltxt-ftr">
										<a href="" className="px-0 smalltxt-ftr"> CONTACT </a> |&nbsp;
									</li>
									<li className="list-unstyled smalltxt-ftr">
										<a href="" className="px-0 smalltxt-ftr"> COPYRIGHT </a> |&nbsp;
									</li>
									<li className="list-unstyled smalltxt-ftr">
										<a href="" className="px-0 smalltxt-ftr"> PRIVACY NOTICE </a> |&nbsp;
									</li>
									<li className="list-unstyled smalltxt-ftr">
										<a href="" className="px-0 smalltxt-ftr"> TERMS OF USE</a> &nbsp;
									</li>
								</ul>
							</div>
						</div>

					</div>
	
	        	</div>

			</div>
		</Fragment>
	)
}

export default FooterDesktop;
import React, { Fragment, useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../config'

import logo from '../images/styling/parqerlogo09.png';
import logo2 from '../images/styling/parqerlogo12.png';

const LandingPage = (props) => {

	return (
    <Fragment>
          <div class="Container App landing landing-desktop"> 
                <div className="mt-n5">
                      <div className="d-flex justify-content-center">
                            <img src={logo2} className="parqer-logo-landing-text" />
                      </div>
                       <div className="">
                            <h1 className="text-landing-desktop pre-margin text-center"> Reserve a slot. Commute to work. </h1>
                      </div>
                      <div className="Container mt-n5 mb-4 d-flex justify-content-center align-items-center">
                            <div class="menu">
                                  <div class="item item3">
                                        <div class="shadow"></div>
                                        <div class="left"></div>
                                        <div class="right"></div>
                                        <div class="top d-flex justify-content-center align-items-center">
                                              <Link to="/login"><img src={logo} className="parqer-logo-landing" /></Link>
                                        </div>
                                  </div>      
                            </div>
                      </div>
                </div>
          </div>
          <div class="Container App landing landing-mobile"> 
                <div className="mt-n5">
                      <div className="d-flex justify-content-center">
                            <img src={logo2} className="parqer-logo-landing-text" />
                      </div>
                       <div className="">
                            <h1 className="text-landing-desktop pre-margin text-center"> Reserve a slot. Commute to work. </h1>
                      </div>
                      <div className="Container mt-n5 mb-4 d-flex justify-content-center align-items-center">
                            <div class="menu">
                                  <div class="item item3">
                                        <div class="shadow"></div>
                                        <div class="left"></div>
                                        <div class="right"></div>
                                        <div class="top d-flex justify-content-center align-items-center">
                                              <Link to="/login"><img src={logo} className="parqer-logo-landing" /></Link>
                                        </div>
                                  </div>      
                            </div>
                      </div>
                </div>
          </div>
    </Fragment>
	)
}

export default LandingPage;
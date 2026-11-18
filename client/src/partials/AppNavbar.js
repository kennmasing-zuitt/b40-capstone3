import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
// import axios from 'axios';
import { URL } from '../config';

import logo from '../images/styling/parqerlogo07.png';

const AppNavbar = (props) => {

  const {
    token,
    _id,
    currentUser,
    roleId
  } = props

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onClickHandler = async  (e) => {
    await props.setLoading(true)

    props.setLoading(false)
  }

  let leftLinks = "";
  if(parseInt(roleId) === 1) {
    leftLinks = (
      <Fragment>
        <NavItem>
          <Link to="/bookings" className="nav-link">Bookings</Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className="mr-5">
            Resources
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link to="/locations" className="nav-link">Locations</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/buildings" className="nav-link">Buildings</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/parkings" className="nav-link">Parkings</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link to="/resources/add" className="nav-link"><i class="fas fa-plus-square"></i>&nbsp;&nbsp;Add New Resources</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
           <Link to="/users" className="nav-link">Users</Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className="mr-5">
            Test Bookings
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link to="/newbooking" className="nav-link">Create Test Booking</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/mybookings" className="nav-link">View Test Booking</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    )
  } else if(parseInt(roleId) === 2) {
    leftLinks = (
      <Fragment>
        <NavItem>
          <Link to="/bookings" className="nav-link">Bookings</Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className="mr-5">
            Resources
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link to="/locations" className="nav-link">Locations</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/buildings" className="nav-link">Buildings</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/parkings" className="nav-link">Parkings</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
           <Link to="/users" className="nav-link">Users</Link>
        </NavItem>
      </Fragment>
    )
  } else if(parseInt(roleId) === 3) {
    leftLinks = (
      <Fragment>
        <NavItem>
          <Link to="/mybookings" className="nav-link">My Bookings</Link>
        </NavItem>
         <NavItem>
          <Link to="/home" className="nav-link">Book Now!</Link>
        </NavItem> 
      </Fragment>
    )
  }

  let rightLinks = "";
  if(!token) {

  } else {
    rightLinks = (
     <Fragment>
         <Link to="/me" className="btn btn-outline-light">Welcome, {currentUser.charAt(0).toUpperCase()}{currentUser.slice(1)} </Link>
         <Link to="/logout" className="ml-3 btn btn-outline-light">Logout</Link>
      </Fragment>
    )
  }

  let navItems = ""
  if(parseInt(roleId) === 1) {
    navItems = (
      <Fragment>
          <NavItem>
              <a href="/bookings" className="text-white" onClick={ e => onClickHandler(e) }>Bookings</a>
          </NavItem>
          <li>
              <a href="#resources" data-toggle="collapse" aria-expanded="false" className="text-white">Resources</a>
              <ul className="collapse list-unstyled" id="resources">
                  <li>
                      <a href="/locations" className="text-white" onClick={ e => onClickHandler(e) }>Locations</a>
                  </li>
                  <li>
                      <a href="/buildings" className="text-white" onClick={ e => onClickHandler(e) }>Buildings</a>
                  </li>
                  <li>
                      <a href="/parkings" className="text-white" onClick={ e => onClickHandler(e) }>Parkings</a>
                  </li>
                  <li>
                      <a href="/resources/add" className="text-white" onClick={ e => onClickHandler(e) }><i class="fas fa-plus-square"></i>&nbsp;&nbsp;Add New Resources</a>
                  </li>
              </ul>
          </li>
          <NavItem>
              <a href="/users" className="text-white" onClick={ e => onClickHandler(e) }>Users</a>
          </NavItem>
          <li>
              <a href="#testBooking" data-toggle="collapse" aria-expanded="false" className="text-white">Test Bookings</a>
              <ul className="collapse list-unstyled" id="testBooking">
                  <li>
                      <a href="/newbooking" className="text-white" onClick={ e => onClickHandler(e) }>Create Test Booking</a>
                  </li>
                  <li>
                      <a href="/mybookings" className="text-white" onClick={ e => onClickHandler(e) }>View Test Booking</a>
                  </li>
              </ul>
          </li>

      </Fragment>
    )
  } else if(parseInt(roleId) === 2) {
    navItems = (
      <Fragment>
          <NavItem>
              <a href="/bookings" className="text-white" onClick={ e => onClickHandler(e) }>Bookings</a>
          </NavItem>
           <li>
              <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="text-white">Resources</a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                  <li>
                      <a href="/locations" className="text-white" onClick={ e => onClickHandler(e) }>Locations</a>
                  </li>
                  <li>
                      <a href="/buildings" className="text-white" onClick={ e => onClickHandler(e) }>Buildings</a>
                  </li>
                  <li>
                      <a href="/parkings" className="text-white" onClick={ e => onClickHandler(e) }>Parkings</a>
                  </li>
              </ul>
          </li>
          <NavItem>
              <a href="/users" className="text-white" onClick={ e => onClickHandler(e) }>Users</a>
          </NavItem>
      </Fragment>
    )
  } else if(parseInt(roleId) === 3) {
    navItems = (
      <Fragment>
          <NavItem>
              <a href="/mybookings" className="text-white" onClick={ e => onClickHandler(e) }>My Bookings</a>
          </NavItem>
          <NavItem>
              <a href="/home" className="text-white" onClick={ e => onClickHandler(e) }>Book Now!</a>
          </NavItem>
      </Fragment>
    )
  }


return (
    <Fragment>    
        <div className="">
            <div className="overlay mt-n5"></div>
            <div className="">
                <Navbar color="primary" dark expand="md" className="navbar-height mb-5">
                    <NavbarBrand className="font-weight-bold ml-3 d-flex mb-n1" href="/">
                        <img src={logo} className="parqer-logo mr-3"/>
                    </NavbarBrand>
                        <NavbarToggler onClick={toggle} id="sidebarCollapse" />
                        <Collapse isOpen={isOpen} navbar className="desktop-view">
                            <Nav className="mr-auto" navbar>
                                { leftLinks }
                            </Nav>
                            <div className="mr-3">
                                { rightLinks }
                            </div>
                        </Collapse>
                </Navbar>
            </div>
            <div className="wrapper mobile-view">
                {/*<!-- Sidebar  -->*/}
                <Navbar id="sidebar" className="">
                    <div id="dismiss">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="sidebar-header">
                        <img src={logo} className="parqer-logo mr-5"/>
                    </div>
                    <ul className="list-unstyled components">
                       <p>Welcome, {currentUser.charAt(0).toUpperCase()}{currentUser.slice(1)}</p>
                       {navItems}
                    </ul>
                    <ul className="list-unstyled CTAs">
                        <li>
                            <a href="/me" className="download">Update Profile</a>
                        </li>
                        <li>
                            <a href="/logout" className="article">Logout</a>
                        </li>
                    </ul>
                </Navbar>
            </div>
        </div>
    </Fragment>
  )

}

export default AppNavbar;

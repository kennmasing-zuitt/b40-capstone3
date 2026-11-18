import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.css';
import './style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';

//IMPORT COMPONENTS/PAGES
import AppNavbar from './partials/AppNavbar';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LocationPage from './pages/LocationPage';
import AddLocationPage from './pages/AddLocationPage';
import BuildingPage from './pages/BuildingPage';
import AddBuildingPage from './pages/AddBuildingPage';
import AddParkingPage from './pages/AddParkingPage';
import ParkingPage from './pages/ParkingPage';
import BookingPage from './pages/BookingPage';
import BookingPageUser from './pages/BookingPageUser';
import BookingsByUserPage from './pages/BookingsByUserPage';
// import HomePage from './pages/HomePage';
import HomePageREST from './pages/HomePageREST';
import NewBookingPage from './pages/NewBookingPage';
import CurrentUserPage from './pages/CurrentUserPage';
import UserRolesPage from './pages/UserRolesPage';
import UserSuperAdminPage from './pages/UserSuperAdminPage';
import UserAdminPage from './pages/UserAdminPage';
import UserOrdinaryPage from './pages/UserOrdinaryPage';
import NotFoundPage from './pages/NotFoundPage';

import ApolloClient from 'apollo-boost';
// import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// "start": "react-scripts --max_old_space_size=4096 start",
// "start": "serve -s build",
// let backend = "http://localhost:8000/graphql" || "https://parqer-booking-server.herokuapp.com/graphql"
// let backend = "http://localhost:8000/graphql"
let backend = "https://parqer-booking-server.herokuapp.com/graphql"
const client = new ApolloClient({ uri: backend }) //CHANGE PORT IF NECESSARY

const App = () => {

  const [appData, setAppData] = useState({
    token: localStorage.token,
    _id: localStorage._id,
    roleId: localStorage.roleId,
    firstName: localStorage.firstName,
    lastName: localStorage.lastName,
    username: localStorage.username,
    email: localStorage.email
  })

  const { token, _id, roleId, firstName, lastName, username, email } = appData;

  const [loading, setLoading] = useState(false);

  if(loading) {
    return (
      <Container className="App">
        <Row className="">
          <Col id="loaderContainer" >
            <div id="loader">
              <Loader
                type="RevolvingDot"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  const getCurrentUser = () => {
    return { token, _id, roleId, firstName, lastName, username, email }
  }

  const Load = (props, page) => {

    /*--------------AUTH ROUTES----------------*/
    //LANDING PAGE
    if(page === "LandingPage" && token) {
      return  <Redirect to="/home" />
    } else if(page === "LandingPage") {
      return <LandingPage {...props} token={token} roleId={roleId} setLoading={setLoading}/>
    }//REFACTOR FOR LANDING


    //LOGIN PAGE
    if(page === "LoginPage" && token) {
      return <Redirect to="/" />
    } else if(page === "LoginPage") {
      return <LoginPage {...props} setLoading={setLoading} currentUser={getCurrentUser}/>
    }

    //REGISTER PAGE
    if(page === "RegisterPage" && token) {
      return <Redirect to="/" />
    } else if(page === "RegisterPage") {
      return <RegisterPage {...props} setLoading={setLoading}/>
    }

    if(!token) return <Redirect to="/login" />

    if( page === "LogoutPage" ) {
      localStorage.clear()
      setAppData({
        token,
        username
      })
      setLoading(true)

      Swal.fire({
            title: "Success",
            text: "Logout successful!",
            icon: "success",
            showConfirmationButton: false,
            timer: 3000
          })

      return window.location = "/"
    }

    if(roleId == 1 ){
        switch(page) {
            case "HomePageREST": return <HomePageREST {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "NewBookingPage": return <NewBookingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "AddLocationPage": return <AddLocationPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "LocationPage": return <LocationPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BuildingPage": return <BuildingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "AddBuildingPage": return <AddBuildingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "AddParkingPage": return <AddParkingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "ParkingPage": return <ParkingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BookingPage": return <BookingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BookingPageUser": return <BookingPageUser {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BookingsByUserPage": return <BookingsByUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "CurrentUserPage": return <CurrentUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserSuperAdminPage": return <UserSuperAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserAdminPage": return <UserAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserOrdinaryPage": return <UserOrdinaryPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserRolesPage": return <UserRolesPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            default:  return <NotFoundPage />
        }
    } else if(roleId == 2 ){
        switch(page) {
            case "HomePageREST": return <HomePageREST {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "NewBookingPage": return <NewBookingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "LocationPage": return <LocationPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BuildingPage": return <BuildingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "ParkingPage": return <ParkingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BookingPage": return <BookingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BookingsByUserPage": return <BookingsByUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "CurrentUserPage": return <CurrentUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserAdminPage": return <UserAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserOrdinaryPage": return <UserOrdinaryPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "UserRolesPage": return <UserRolesPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            default:  return <NotFoundPage />
        }
    } else if(roleId == 3){
        switch(page) {
            case "HomePageREST": return <HomePageREST {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "BookingPageUser": return <BookingPageUser {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            case "CurrentUserPage": return <CurrentUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
            default:  return <NotFoundPage />
        }
    }

    switch(page) {
          case "HomePageREST": return <HomePageREST {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "NewBookingPage": return <NewBookingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "AddLocationPage": return <AddLocationPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "LocationPage": return <LocationPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "BuildingPage": return <BuildingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "AddBuildingPage": return <AddBuildingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "AddParkingPage": return <AddParkingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "ParkingPage": return <ParkingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "BookingPage": return <BookingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "BookingPageUser": return <BookingPageUser {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "BookingsByUserPage": return <BookingsByUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "CurrentUserPage": return <CurrentUserPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "UserSuperAdminPage": return <UserSuperAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "UserAdminPage": return <UserAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "UserOrdinaryPage": return <UserOrdinaryPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          case "UserRolesPage": return <UserRolesPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
          default:  return <NotFoundPage />
    }
  }

  let navbar = ""
  if(!token){

  } else {
    navbar = (
      <AppNavbar token={token} currentUser={firstName} roleId={roleId} className="bg-secondary" _id={_id} setLoading={setLoading}/>
    )
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        { navbar }
        <Switch>
          <Route exact path="/" render={ (props)=> Load(props, "LandingPage") } />
          <Route exact path="/home" render={ (props) => Load(props, "HomePageREST") } />
          <Route path="/logout" render={ (props) => Load(props, "LogoutPage") } />
          <Route path="/login" render={ (props) => Load(props, "LoginPage") } />
          <Route path="/register" render={ (props) => Load(props, "RegisterPage") } />
          <Route path="/me" render={ (props) => Load(props, "CurrentUserPage") } />
          <Route path="/users/superadmin/:id" render={ (props) => Load(props, "UserSuperAdminPage") } />
          <Route path="/users/admin/:id" render={ (props) => Load(props, "UserAdminPage") } />
          <Route path="/users/ordinary/:id" render={ (props) => Load(props, "UserOrdinaryPage") } />
          <Route path="/users" render={ (props) => Load(props, "UserRolesPage") } />
          <Route path="/parkings/building/:id" render={ (props) => Load(props, "AddParkingPage") } />
          <Route path="/parkings" render={ (props) => Load(props, "ParkingPage") } />
          <Route path="/buildings/location/:id" render={ (props) => Load(props, "AddBuildingPage") } />
          <Route path="/buildings" render={ (props) => Load(props, "BuildingPage") } />
          <Route path="/locations" render={ (props) => Load(props, "LocationPage") } />
          <Route path="/resources/add" render={ (props) => Load(props, "AddLocationPage") } />
          <Route path="/bookings/user/:id" render={ (props) => Load(props, "BookingsByUserPage") } />
          <Route path="/bookings" render={ (props) => Load(props, "BookingPage") } />
          <Route path="/newbooking" render={ (props) => Load(props, "NewBookingPage") } />
          <Route path="/mybookings" render={ (props) => Load(props, "BookingPageUser") } />
          <Route path="*" render={ (props) => Load(props, "NotFoundPage") } />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

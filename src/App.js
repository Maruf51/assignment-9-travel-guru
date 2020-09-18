import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import './App.css';
import Booking from './Components/Booking/Booking';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import ErrorRoute from './Components/ErrorRoute/ErrorRoute';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import TouristSpot from './Components/TouristSpot/TouristSpot';
import TouristSpotDetail from './Components/TouristSpotDetail/TouristSpotDetail';
import fakeData from './FakeData/FakeData.js'

export const TouristSpotData = createContext();
export const LoggedInUser = createContext();

function App() {

  const [spotData, setSpotData] = useState(fakeData[0]);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    success: false,
    error: ''
  });

  return (
    <TouristSpotData.Provider value={[spotData, setSpotData]}>
      <LoggedInUser.Provider value={[user, setUser]}> 
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/booking/:touristSpot">
              <Booking></Booking>
            </PrivateRoute>
            <Route path='/create-new-account'>
              <CreateAccount></CreateAccount>
            </Route>
            <Route path="/details/:nickName">
              <TouristSpotDetail></TouristSpotDetail>
            </Route>
            <Route exact path="/">
              <TouristSpot></TouristSpot>
            </Route>
            <Route exact path='*'>
              <ErrorRoute></ErrorRoute>
            </Route>
          </Switch>
        </Router>
      </LoggedInUser.Provider>
    </TouristSpotData.Provider>
  );
}

export default App;

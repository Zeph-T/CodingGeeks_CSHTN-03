import React, { useEffect, useState } from "react";
import http from "./services/httpService";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { server_url } from "./config.json";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout"
import Register from "./components/Auth/register";
import Activate from './components/Auth/Activation';
import Navbar from "./components/Navbar/navbar";
import ProtectedRoute from "./components/Product/Product";
import Product from "./components/Product/Product";
import CustomSnackBar from '../src/components/common/SnackBar';

import "./App.css";
import { api } from "./utilities";


function App(props) {
  const [user, setUser] = useState(); // to save user details.
  const oSnackBar = React.createRef();
  
  let openSnackBar = (message) => {
    if(oSnackBar.current){
      oSnackBar.current.openSnackBar(message);
    }
  }
  
  let closeSnackBar = () => {
    if(oSnackBar.current){
      oSnackBar.current.closeSnackBar();
    }
  }
  useEffect(() => {
    // this function checks if the user is logged in and store details of user object.
    async function Start() {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        http.get(api.BASE_URL  + api.CHECK_FOR_LOGGED_IN_USER ,{headers : {accesstoken : jwt}}).then(oUser=>{
          if(oUser){
            setUser(oUser.data);
          }
        }).catch(err=>{
          console.log(err);
        });
      }else{
        props.history.push('login')
      }
    }
    Start();
  }, []);
  return (
    <BrowserRouter basename="/">
      {user && user._id && <Navbar user={user} /> }
      <Switch>
        {/* All the routes are handled here */}
        <Route path="/login" render={(props)=><Auth openSnackBar={openSnackBar} {...props}/> } />
        <Route path="/register" render={(props)=><Register openSnackBar={openSnackBar} {...props}/> }  />
        <Route path="/activateUser" render={(props)=> <Activate {...props} />} />
        <ProtectedRoute
          path="/product/:id"
          render={(props) => <Product {...props} user={user} />}
        />
        <Route path="/logout" exact component={Logout} />
      </Switch>
      <CustomSnackBar ref={oSnackBar} />
    </BrowserRouter>
  );
}

export default App;

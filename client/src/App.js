import React from "react";
import './App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Dashboard from "./DashBoard/Dashboard"
import RecordDetails from "./Records/RecordDetails"
import SignIn from "./auth/SignIn"
import Patient_SignIn from "./auth/Patient_SignIn";
import Insurance_SignIn from "./auth/Insurance_SignIn";
import SignUp from "./auth/SignUp";
import CreatePatientRecord from "./Records/CreatePatientRecord";
import Patient_SignUp from "./auth/Patient_SignUp"
import Patient_Dashboard from "./DashBoard/Patient_Dashboard";
import Insurance_Dashboard from "./DashBoard/Insurance_Dashboard";
import Patient_Search from "./Search/Patient_Search";
import Insurance_SignUp from "./auth/Insurance_SignUp";
import Navbar from "./LayOut/Navbar";
import Profile from "./auth/profile";
import TransactionRecords from "./Records/TransactionRecords";
import TransactionSummary from "./Records/TransactionSummary";
import Home from "./HomePage/pages";
import CreatePatientClaim from "./Records/CreatePatientClaim";
import AboutPage from "./LayOut/AboutPage";
import ContactUs from "./LayOut/ContactUs";
const App = () => {
    //Requiring All the pages to navigate   
    return (

        <div>
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                        <Route path="/Medical_Dashboard" component={Dashboard} />
                        <Route path="/Record/:id" component={RecordDetails} />
                        <Route path="/SignIn" component={SignIn} />
                        <Route path="/Insurance_signIn" component={Insurance_SignIn} />
                        <Route path="/Patient_signIn" component={Patient_SignIn} />
                        <Route path="/SignUp" component={SignUp} />                        
                        <Route path={"/Patient_SignUp"} component={Patient_SignUp} />
                        <Route path={"/Insurance_SignUp"} component={Insurance_SignUp} />
                        <Route path="/ADD" component={CreatePatientRecord} />                            
                        <Route path="/Profile" component={Profile} />
                        <Route path="/Patient_dashboard" component={Patient_Dashboard} />
                        <Route path="/Insurance_dashboard" component={Insurance_Dashboard} />
                        <Route path="/CLAIM" component={CreatePatientClaim} />
                        <Route path="/Search" component={Patient_Search} />
                        <Route path="/transaction/:id" component={TransactionRecords} />
                        <Route path="/TransSummary" component={TransactionSummary} />   
                         <Route path="/AboutUs" component={AboutPage} /> 
                         <Route path="/ContactUs" component={ContactUs} />                  
                    </Switch>
                </BrowserRouter>
               
            </div>
        </div>

    );

}

export default App

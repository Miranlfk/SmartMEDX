import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Services from './pages/services';
import Contact from './pages/contact';


import signinPatient from './pages/signinPatient';
import signinMedical from './pages/signinMedical';
import signinInsurance from './pages/signinInsurance';
import SignUpInsurance from './pages/SignUpInsurance';
import SignUpMedicalTeam from './pages/SignUpMedicalTeam';
import SignUpPatient from './pages/SignUpPatient';
import ShowOptionsPatient from './pages/ShowOptionsPatient';
import ShowOptionsMedical from './pages/ShowOptionsMedical';
import ShowOptionsInsurance from './pages/ShowOptionsInsurance';
import ImagePatient from './components/ImagePagePatient/ImagePatient';


function App() {
  return (
    
    

    <Router>
       <Navbar /> 
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/services' component={Services} />
        <Route path='/contact-us' component={Contact} />
       
    
        <Route path= '/signinPatient' component={signinPatient}/>
        <Route path= '/signinInsurance' component={ signinInsurance}/>
        <Route path= '/signinMedical' component={signinMedical}/>
        <Route path= '/SignUpInsurance' component={SignUpInsurance}/>
        <Route path= '/SignUpMedicalTeam' component={ SignUpMedicalTeam}/>
        <Route path= '/SignUpPatient' component={SignUpPatient}/>
        <Route path= '/ShowOptionsPatient' component={ ShowOptionsPatient}/>
        <Route path= '/ShowOptionsMedical' component={ ShowOptionsMedical}/>
        <Route path= '/ShowOptionsInsurance' component={ ShowOptionsInsurance}/>
        <Route path= '/ImagePatient' component={ ImagePatient}/>
      </Switch>
    </Router>
    
  );
}

export default App;

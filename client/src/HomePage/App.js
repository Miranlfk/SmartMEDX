import React from 'react';
import './App.css';
import Patient_SignIn from '../auth/Patient_SignIn';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages';
import SigninPage from './pages/signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/Patient_SignIn' element={<Patient_SignIn/>} exact/>
      </Routes>

    </Router>
  );
}

export default App;
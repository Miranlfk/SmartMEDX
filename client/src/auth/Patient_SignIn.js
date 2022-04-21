import React, { Component } from 'react'
import { connect } from 'react-redux';
import { patient_signIn } from '../Redux-Store/Actions/PatientActions'
import { Redirect } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import user from "../images/UserPatient.png"
import './StyleSheet.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { FaUserInjured } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { AiFillFolderAdd } from "react-icons/ai";



class Patient_SignIn extends Component {
  state = {//stating the sign in auth attributes
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.patient_signIn(this.state);// handling dispatching action through the properties
  };
  render() {
    const { Patients, authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/Patient_dashboard" />;
    return (
      <>        
        <div className='button-container'>

          <div className='b1'>
            <Link to='/Insurance_signIn'>
              <button type="button" className="button-1">  <FaUserTie size={35} /> Insurance
              </button>
            </Link>
          </div>

          <div className='b2'>
            <Link to='/Patient_signIn'>
              <button type="button" className="button-2"> <FaUserInjured size={35} />  Patient</button>
            </Link>
          </div>

          <div className='b3'>
            <Link to='/SignIn'>
              <button type="button" className="button-3">  <AiFillFolderAdd size={35} /> Medical</button>
            </Link>
          </div>
        </div>     



        <Row>
          <Col lg={4} md={6} sm={12} className='text-center mt-5  p-5'>
            <h3 className='medical-head'> Sign in  Patient</h3>
            <img className='icon-img' src={user} alt='icon' />
            <form className="white" onSubmit={this.handleSubmit}>
              <h5 className="grey-text text-darken-3">Sign In</h5>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Login</button>
                <div className="center red-text">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>
            </form>

          </Col>

        </Row>

      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    //accessing the reducer to get authError which declared in InitState
    authError: state.Patient.authError,
     //accessing the firebase auth functionality
    auth: state.firebase.auth,
     //accessing the fireStore to get Patients Collection
    Patients: state.firestore.ordered.Patients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patient_signIn: creds => dispatch(patient_signIn(creds))//dispatching the signIn Patient action 
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Patients" }])//connecting with firestore collection
)(Patient_SignIn);

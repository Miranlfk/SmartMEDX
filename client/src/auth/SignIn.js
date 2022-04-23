import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { signIn } from "../Redux-Store/Actions/MedicalActions"
import { Redirect } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { FaUserInjured } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { AiFillFolderAdd } from "react-icons/ai";
import user from '../images/UserMedical.png';
import './StyleSheet.css';

class SignIn extends Component {
  state = {//stating the sign in auth attributes
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({// handling the form inputs when changeover
      [e.target.id]: e.target.value// assigning values according to id
    });
  };
  handleSubmit = e => {    
    e.preventDefault();
    this.props.signIn(this.state);// handling dispatching action through the properties
  };
  render() {
    const { Doctors, authError, auth } = this.props;
    return (
      <> {/* mapping the specific Doctors with id */}
        {Doctors && Doctors.map(Doctor => {
          if (auth.uid == Doctor.id) {
            return <Redirect to={"/Medical_Dashboard"}></Redirect>;
          }
          return (
            <></>
          )
        })

        }
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

          <Row >
            <Col lg={4} md={6} sm={12} className='text-center mt-5  p-5'>
              <h3 className='medical-head'> Sign in  Medical Team</h3>
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
                  <button className="btn indigo darken-4 z-depth-1">Login</button>
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
    authError: state.Medical.authError,
    //accessing the firebase auth functionality
    auth: state.firebase.auth,
    //accessing the fireStore to get Doctors Collection
    Doctors: state.firestore.ordered.Doctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))//dispatching the signIn Medical action 
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Doctors" }]) //connecting with firestore collection
)(SignIn);

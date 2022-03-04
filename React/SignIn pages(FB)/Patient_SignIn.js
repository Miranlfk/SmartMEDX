import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { patient_signIn } from '../Redux-Store/Actions/PatientAction';
import { Redirect } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';



class Patient_SignIn extends Component {
  state = {
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
    this.props.patient_signIn(this.state);
  };
  render() {
    const { Patients, authError, auth } = this.props;
    return (
      <div>
        {Patients && Patients.map(Patient => {
          if (auth.uid == Patient.id) {
            return <Redirect to="/" />;
          }
          return (
            <></>
          )
        })
        }
        <div className="container">
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
        </div>)
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.Patient.authError,
    auth: state.firebase.auth,
    Patients: state.firestore.ordered.Patients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patient_signIn: creds => dispatch(patient_signIn(creds))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Patients" }])
)(Patient_SignIn);

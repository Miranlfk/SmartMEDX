import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { insurance_signIn } from '../Redux-Store/Actions/InsuranceAction';
import { Redirect } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';



class Insurance_SignIn extends Component {
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
    this.props.insurance_signIn(this.state);
  };
  render() {
    const { Insurances, authError, auth } = this.props;
    return (
      <div>
        {Insurances && Patients.map(Insurance => {
          if (auth.uid == Insurance.id) {
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
    authError: state.Insurance.authError,
    auth: state.firebase.auth,
    Insurance: state.firestore.ordered.Insurance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    insurance_signIn: creds => dispatch(insurance_signIn(creds))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Insurance" }])
)(Insurance_SignIn);
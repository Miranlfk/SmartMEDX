import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { signIn } from "../Redux-Store/Actions/MedicalActions"
import { Redirect } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';



class SignIn extends Component {
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
    this.props.signIn(this.state);
  };
  render() {
    const { Doctors, authError, auth } = this.props;
    return (
      <div>
        {Doctors && Doctors.map(Doctor => {
          if (auth.uid == Doctor.id) {
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
    authError: state.Medical.authError,
    auth: state.firebase.auth,
    Doctors: state.firestore.ordered.Doctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Doctors" }])
)(SignIn);

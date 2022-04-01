import React, { Component } from 'react'
import { connect } from 'react-redux';
import { insurance_signIn } from '../Redux-Store/Actions/InsuranceActions';
import { Redirect } from "react-router-dom"
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { FaUserInjured } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { AiFillFolderAdd } from "react-icons/ai";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import user from "../images/UserInsurance.png"
import './StyleSheet.css';


class Insurance_SignIn extends Component {
  //stating the sign in auth attributes
  state = {
    email: "",
    password: ""
  };
  handleChange = e => { // handling the form inputs when changeover
    this.setState({
      [e.target.id]: e.target.value // assigning values according to id
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.insurance_signIn(this.state);  // handling dispatching action through the properties
  };
  render() {
    const { insuranceMembers, authError, auth } = this.props;
    return (
      <div>
        <div>
        {/* mapping the specific Insurance with id */}
          {insuranceMembers && insuranceMembers.map(Insurance => {
            if (auth.uid == Insurance.id) {                     
              return <Redirect to="/Insurance_dashboard" />;
            }
            return (
              <></>
            )
          })
          }
          {/* button container to select the party */}
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
                <button type="button" className="button-3"> <AiFillFolderAdd size={35} />  Medical</button>
              </Link>
            </div>


          </div>
        </div>

        <div>
          <Row >
            <Col lg={4} md={6} sm={12} className='text-center mt-5  p-5'>
              <h3 className='medical-head'> Sign in Insurance</h3>
              <img className='icon-img' src={user} alt='icon' />

              {/* form to fill authentication sectors */}
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
                    {/* displaying authentication error if some error triggers */}
                    {authError ? <p>{authError}</p> : null}
                  </div>
                </div>
              </form>
            </Col>

          </Row>

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    
    auth: state.firebase.auth,
    //accessing the reducer to get authError which declared in InitState
    authError: state.Insurance.authError,   
     //accessing the fireStore to get Insurance Collection
    insuranceMembers: state.firestore.ordered.Insurance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //dispatching the Insurance_sigIN action 
    insurance_signIn: creds => dispatch(insurance_signIn(creds))
  };
};

export default compose(
  //connecting to fireStore Collection
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Insurance" }])
)(Insurance_SignIn);
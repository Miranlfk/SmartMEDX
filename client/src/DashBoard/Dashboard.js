import React, { Component } from "react";
import { connect } from 'react-redux'
import './DashBoardStyles.css';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Patient_Search from '../Search/Patient_Search';

class Dashboard extends Component {
  render() {
    const { doctors, auth } = this.props;
    if (!auth.uid) return <Redirect to="/SignIn" />;

    return (
      <>
        {doctors && doctors.map(Doctor => {
          if (auth.uid == Doctor.id) {
            return (
              <div class="center">
                <div class="card-panel hoverable">
                  <img class="rounded-circle z-depth-2" alt="100x100" src="https://i.pravatar.cc/300?img=5"
                    data-holder-rendered="true"></img>
                  <div class="card-panel blue darken-2">
                    <div class="card-panel-content white-text">
                      <span class="card-panel-title" ><h3> Welcome Dr.{Doctor.firstName}</h3></span>
                      <h5>Name :{Doctor.firstName} {Doctor.lastName}</h5>
                      <h5>Address : {Doctor.Address}</h5>
                      <h5>NIC : {Doctor.NIC}</h5>
                      <h5> Profession : {Doctor.profession}</h5>
                    </div>
                    
                  </div>

                </div>
                <div class="center">
                  <div class="row">
                    <div class="col s12 m8">
                      <div class="card-panel deep-orange accent-2" >
                        <div class="card-image">
                          <i class="large material-icons">
                            person_search
                          </i>

                        </div>
                        <span class="card-title">Search Patient</span>
                        <div class="card-content">
                          <h5>Access to Relevant Patient</h5>
                          <Patient_Search />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            )
          }
        })}

      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    doctors: state.firestore.ordered.Doctors,
    auth: state.firebase.auth,
    Medical: state.Medical.isMedical
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Doctors" }])
)(Dashboard);
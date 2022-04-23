import React, { Component } from "react";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Patient_Search from "../Search/Patient_Search";


class Insurance_Dashboard extends Component {
  render() {
    const { insuranceMembers, auth } = this.props;
    if (!auth.uid) return <Redirect to="/Insurance_signIn" />;
    
    return (
      <>
        {insuranceMembers && insuranceMembers.map(insurance => {
          if (auth.uid == insurance.id) {
            // retrieving and displaying the sgned in person
            return (
              <div class="center">
                <div class="card-panel hoverable">
                  <img class="rounded-circle z-depth-2" alt="100x100" src="https://i.pravatar.cc/300?img=68"
                    data-holder-rendered="true"></img>
                  <div class="card-panel blue darken-2">
                    <div class="card-panel-content white-text">
                      <span class="card-panel-title" ><h3> Welcome Mr.{insurance.firstName}</h3></span>
                      <h5>Name :{insurance.firstName} {insurance.lastName}</h5>
                      <h5>Insurance Company : {insurance.InsuranceCompany}</h5>
                      <h5>NIC : {insurance.NIC}</h5>
                      <h5>Profession : {insurance.profession}</h5>
                    </div>

                  </div>

                </div>
                <div class="center">
                  <div class="row">
                    <div class="col s12 m8">
                      <div class="card-panel  " >
                        <div class="card-image">
                          <i class="large material-icons">
                          attach_money
                          </i>

                        </div>
                        {/* Adding claim to a patient */}
                        <span class="card-title">Current Patient Info</span>
                        <div class="card-content">
                        <h5> Current Patient ID :{insurance.patientID}</h5>
                        <h5> Surgery Cost : {insurance.SurgeryCost} </h5>
                        <NavLink to="/CLAIM"><button className="btn blue">Add Claim</button></NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="center">
                  <div class="row">
                    <div class="col s12 m8">
                      <div class="card-panel teal darken-1" >
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


  };
}
const mapStateToProps = state => {
  console.log(state);
  return {
    insuranceMembers: state.firestore.ordered.Insurance,
    auth: state.firebase.auth,
    Insurance: state.Insurance.isInsurance
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Insurance" }])
)(Insurance_Dashboard);
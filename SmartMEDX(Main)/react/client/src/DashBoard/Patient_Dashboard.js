
import 'bootstrap/dist/css/bootstrap.css';
import './DashBoardStyles.css';
import { ImProfile } from "react-icons/im";

import React, { Component } from "react";

import RecordDetails from "../Records/RecordDetails";
import RecordList from "../Records/RecordList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import RecordSummary from "../Records/RecordSummary";
import TransactionSummary from '../Records/TransactionSummary';

class Patient_Dashboard extends Component {
  render() {
    const { patients, auth } = this.props;
    if (!auth.uid) return <Redirect to="/Patient_signIn" />;

    return (
      <div>
        {patients && patients.map(patient => {
          if ( auth.uid == patient.firebaseUID) {
            return (

              <div>
                <div class="center">
                  <div class="card-panel hoverable">
                    <img class="rounded-circle z-depth-2" alt="100x100" src="https://i.pravatar.cc/300?img=12"
                      data-holder-rendered="true"></img>
                    <div class="card-panel blue darken-2">
                      <div class="card-panel-content white-text">
                        <span class="card-panel-title" ><h3> Hello {patient.firstName}!!!</h3></span>
                        <h5>Name :{patient.firstName} {patient.lastName}</h5>
                        <h5>Address : {patient.Address}</h5>
                        <h5>NIC : {patient.NIC}</h5>
                        <h5>Current Medication : {patient.CurrentMedication}</h5>
                      </div>
                      <div class="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                      </div>
                    </div>

                  </div>
                </div>
                <div>
                  <Link to={"/record/" + patient.id} key={patient.id}>
                    <RecordSummary record={patient} />

                  </Link>
                </div>
                <div>
                  <Link to={"/transaction/" + patient.id} key={patient.id}>
                    <TransactionSummary record={patient} />

                  </Link>
                </div>
              </div>
            )
          }
        })}
      </div>
    );
  };
};

const mapStateToProps = state => {
  console.log(state);
  return {
    patients: state.firestore.ordered.Patients,
    auth: state.firebase.auth,
    Patient: state.Patient.isPatient
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Patients" }])
)(Patient_Dashboard);

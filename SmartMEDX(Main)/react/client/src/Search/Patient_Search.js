import React, { Component } from "react";

import RecordDetails from "../Records/RecordDetails";
import RecordList from "../Records/RecordList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { bootstrap } from 'bootstrap';
import { Link } from "react-router-dom";
import RecordSummary from "../Records/RecordSummary";
import moment from "moment";
import TransactionRecords from "../Records/TransactionRecords";
import TransactionSummary from "../Records/TransactionSummary";

class Patient_Search extends Component {
    state = {
        patientID: null,
        access: false
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });


    };


    render() {
        const { patients, auth } = this.props;
        const { patientID, access } = this.state;

        console.log(patientID)
        return (

            <div className="container">

                <form className="deep-orange accent-2" >
                    <h5 className="grey-text text-darken-3">Search</h5>

                    <div className="input-field">
                        <label htmlFor="text">Patient ID</label>
                        <input type="text" id="patientID" onChange={this.handleChange} />
                    </div>


                </form>
                <div>

                    {patients && patients.map(patient => {
                        if (patientID == patient.id) {
                            return (
                                <div>
                                    <br />

                                    <div><Link to={"/record/" + patient.id} key={patient.id}>
                                        <RecordSummary record={patient} />

                                    </Link>
                                    </div>
                                    <div><Link to={"/transaction/" + patient.id} key={patient.id}>
                                        <TransactionSummary patient={patient} />

                                    </Link>
                                    </div>
                                </div>

                            )
                        }
                    })}
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        patients: state.firestore.ordered.Patients,
        auth: state.firebase.auth,
        Medical: state.Medical.isMedical
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "Patients" }])
)(Patient_Search);
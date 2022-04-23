import React, { Component } from "react";


import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from "react-router-dom";
import RecordSummary from "../Records/RecordPanel";
import TransactionSummary from "../Records/TransactionSummary";

class Patient_Search extends Component {
    state = {
        patientID: null,       
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    render() {
        const { patients, Medical } = this.props;
        const { patientID } = this.state;

        console.log(patientID)
        return (
            <div className="container">
                <form className=" teal darken-1 " >
                    <h5 className="text-darken-3">Search</h5>
                    <div className="input-field">
                        <label htmlFor="text">Patient ID</label>
                        <input type="text" id="patientID" onChange={this.handleChange} />
                    </div>
                </form>
                <div>
                    {/* mapping the patients */}
                    {patients && patients.map(patient => {
                        if (patientID == patient.id) {
                            return (
                                <div>
                                    <br />
                                    {/* linking the patient according to pateint id */}
                                    <div><Link to={"/record/" + patient.id} key={patient.id}>
                                        <RecordSummary record={patient} />
                                    </Link>
                                    </div>
                                    {!Medical ?
                                        <div><Link to={"/transaction/" + patient.id} key={patient.id}>
                                            <TransactionSummary patient={patient} />

                                        </Link>
                                        </div>
                                        : null
                                    }
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
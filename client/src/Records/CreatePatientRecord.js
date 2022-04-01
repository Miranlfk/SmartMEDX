import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateRecord } from "../Redux-Store/Actions/MedicalActions";
import { Redirect } from "react-router-dom";

class CreatePatientRecord extends Component {
    state = {
        patientID: "",
        CurrentMedication: "",
        SurgeryCost: "",

    };
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();

        this.props.CreatePatientRecord(this.state);

    };
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/SignIn" />;
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Add patient Record</h5>
                    <div className="input-field">
                        <input type="text" id="CurrentMedication" onChange={this.handleChange} />
                        <label htmlFor="title">Current Medication</label>
                    </div>
                    <div className="input-field">
                        <textarea
                            id="SurgeryCost"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                        />
                        <label htmlFor="content">Surgery Cost</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="patientID" onChange={this.handleChange} />
                        <label htmlFor="title">PatientID</label>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">ADD</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        CreatePatientRecord: (record) => dispatch(CreateRecord(record))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePatientRecord);
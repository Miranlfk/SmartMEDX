import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CreateClaim } from "../Redux-Store/Actions/InsuranceActions";

class CreatePatientClaim extends Component {
    state = {
        patientID: "",
        
        patientfunds: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.CreatePatientClaim(this.state);
    };
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/SignIn" />;
        return (
            <div className="container">
                

                    <form className="white" onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Add Patient Funds</h5>
                        <div className="input-field">
                            <input type="text" id="patientfunds" onChange={this.handleChange} />
                            <label htmlFor="title">Patient Funds</label>
                        </div><div className="input-field">
                            <input type="text" id="patientID" onChange={this.handleChange} />
                            <label htmlFor="title">Patient ID</label>
                        </div>
                        <div>
                            <button type="submit"  className="btn pink lighten-1 z-depth-0">Add Claim</button>
                            
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
        CreatePatientClaim: (record) => dispatch(CreateClaim(record))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePatientClaim);
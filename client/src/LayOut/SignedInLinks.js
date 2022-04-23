import React from "react";
// import {
//     Nav,
//     NavLink,
//     Bars,
//     NavMenu,
//     NavBtn,
//     NavBtnLink
// } from './SignInLinkElements';
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../Redux-Store/Actions/MedicalActions";
import { patient_signOut } from "../Redux-Store/Actions/PatientActions";
import { insurance_signOut } from "../Redux-Store/Actions/InsuranceActions";


//calling on navbar to show when logged in
const SignedInLinks = (props) => {
    const { auth, auth_p, auth_i } = props;
    return (
        <div>
            <ul className="right">
                {/* partitioning the transaction methods */}
                {auth ?
                    <li>
                        <NavLink to="/ADD">Set Patient Cost</NavLink>
                    </li>
                    : null
                }
                 
                <li>
                    {/* Triggering SignOut Options  */}
                    <a onClick={auth ? props.signOut : auth_p ? props.patient_signOut :auth_i ? props.insurance_signOut : null }><Link to={"/"}>Log Out</Link></a>
                </li>
                <li>
                    <NavLink to="/AboutUs" >
                        About Us
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ContactUs" >
                        Contact US                   
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Updates" >
                        Updates
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};


const mapStateToProps = state => {
    // console.log(state);
    return {
        auth: state.Medical.isMedical,
        auth_p: state.Patient.isPatient,
        auth_i: state.Insurance.isInsurance
    };
};
const mapDispatchToProps = dispatch => {
    return {
        //Actions to signOut in every party
        signOut: () => dispatch(signOut()),
        patient_signOut: () => dispatch(patient_signOut()),
        insurance_signOut: () =>dispatch(insurance_signOut()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignedInLinks);
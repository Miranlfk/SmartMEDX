import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {

    const { auth, profile } = props;
    const links = auth.uid ? (
        //showing when memeber succesfully logged in
        <SignedInLinks profile={profile} />
    ) : (
        //showing when memeber succesfully logged Out
        <SignedOutLinks />
    );
    return (
        <nav>
            <div class="nav-wrapper black">
                <a href="/" className="brand-logo blue-text darken-2" style={{left:"10px"}}>SmartMEDX</a>                
                <ul class="right">
                    <li>{links}</li>
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = state => {

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default connect(mapStateToProps)(Navbar);
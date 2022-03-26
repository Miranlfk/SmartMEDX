import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <div>
            <ul className="right">
                <li>
                    <NavLink to="/SignUp">Signup</NavLink>
                </li>
                <li>
                    <NavLink to="/SignIn">SignIn</NavLink>
                </li>

                <li>
                    <NavLink to="/Patient_signIn">About US</NavLink>
                </li>
                <li>
                    <NavLink to="/P_SignUp">Contact Us</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SignedOutLinks;
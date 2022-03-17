import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './SignOutLinkElements';

function SignOutLinksNav() {
 return (
    <>
      <Nav>
        <NavLink to='/'> SMARTMEDEX
       
          
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
         
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>

         
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signinPatient'>Log Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};


export default SignOutLinksNav;

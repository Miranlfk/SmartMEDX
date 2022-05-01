
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../Redux-Store/Actions/MedicalActions"
import { storage } from "firebase";
import { Link } from "react-router-dom";
import { FaUserInjured } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { AiFillFolderAdd } from "react-icons/ai";


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import login2 from '../images/login2.png';



class SignUp extends Component {

    state = {

        email: "",
        password: "",
        firstName: "",
        lastName: "",
        nic: "",
        Qulification: "",
        Address: "",
        profession: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.signUp(this.state);
    };


    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to="/Medical_Dashboard" />;
        return (
            <>

                <div className='background'>

                    <div className='button-container'>

                        <div className='b1'>
                            <Link to='/Insurance_SignUp'>
                                <button type="button" className="button-1">  <FaUserTie size={30} /> Insurance
                                </button>
                            </Link>
                        </div>

                        <div className='b2'>
                            <Link to='/Patient_SignUp'>
                                <button type="button" className="button-2"> <FaUserInjured size={35} />  Patient</button>
                            </Link>
                        </div>

                        <div className='b3'>
                            <Link to='/SignUp'>
                                <button type="button" className="button-3">  <AiFillFolderAdd size={35} /> Medical</button>
                            </Link>
                        </div>
                    </div>

                    <Container className="mt-5">
                        
                        <Row >
                            <Col lg={4} md={6} sm={12} className='text-center mt-2  p-2'>
                                <h3 className='medicalup-head' > Sign Up Medical</h3>


                                <Form>
                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='email' id="email" placeholder='Enter email' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='password' id="password" placeholder='password' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                                        <Form.Control type='text' id="firstName" placeholder='First Name' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                                        <Form.Control type='text' id="lastName" placeholder='Last Name' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="nic" placeholder='Nic Number' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="Qualification" placeholder='Qualification' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="profession" placeholder='Profession' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="Address" placeholder='Address' onChange={this.handleChange} />
                                    </Form.Group>
                                  

                                    <div className="input-field">
                                        <button className="btn blue darken-1 z-depth-0" onClick={this.handleSubmit}>Sign Up</button>
                                        <div className="center red-text">
                                            {authError ? <p>{authError}</p> : null}
                                        </div>
                                    </div>

                                </Form>

                            </Col>
                            <Col lg={8} md={6} sm={12}>
                                <img className='w-20' src={login2} alt='' />
                            </Col>
                        </Row>
                    </Container>

                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        //accessing the reducer to get authError which declared in InitState
        auth: state.firebase.auth,
        authError: state.Medical.authError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //dispatching the signUp action of a doctor
        signUp: newDoctor => dispatch(signUp(newDoctor))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);


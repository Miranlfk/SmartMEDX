
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './StyleSheet.css';
import { FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiFillFolderAdd } from "react-icons/ai";
import { FaUserInjured } from 'react-icons/fa';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import InsuranceCover from '../images/InsuranceCover.png'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { insurance_signUp } from "../Redux-Store/Actions/InsuranceActions";
;

class Insurance_SignUp extends Component {
    //stating the signUp auth attributes
    state = {

        email: "",
        password: "",
        firstName: "",
        lastName: "",
        nic: "",
        employee_ID: "",
        InsuranceCompany: "",
        profession: ""

    };
    handleChange = e => {
        this.setState({// handling the form inputs when changeover
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.insurance_signUp(this.state);// handling dispatching action through the properties
    };



    render() {
        const { auth, authError } = this.props;
        //condition to Redirect profile page if User has Signed In correctly
        if (auth.uid) return <Redirect to="/Profile" />;
        return (
            <div>

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
                                <h3 className='insuranceup-head' > Sign Up Insurance</h3>

                                {/* setting up the form to SignUp inputs */}

                                <Form>
                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='email' id="email" placeholder='Enter email' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                                        <Form.Control type='text' id="password" placeholder='Password' onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='email' id="firstName" placeholder='First Name' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="lastName" placeholder='last Name' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="nic" placeholder='Nic Number' onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="employee_ID" placeholder='Employee ID' onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="InsuranceCompany" placeholder='Insurance Company' onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="profession" placeholder='Profession' onChange={this.handleChange}/>
                                    </Form.Group>
                                    
                                    <div className="input-field">
                                        <button className="btn blue darken-1 z-depth-0" onClick={this.handleSubmit}>Sign Up</button>
                                        <div className="center red-text">
                                            {authError ? <p>{authError}</p> : null}
                                        </div>
                                    </div>

                                    <Link to='/Profile' >
                                        <Button className='next'> Next</Button>
                                    </Link>

                                </Form>
                            </Col>
                            <Col lg={8} md={6} sm={12}>
                                <img className='w-20' src={InsuranceCover} alt='' />
                            </Col>
                        </Row>


                    </Container>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        //accessing the reducer to get authError which declared in InitState
        authError: state.Insurance.authError
    };
};

const mapDispatchToProps = dispatch => {
    return {//dispatching the Insurance_signUP action 
        insurance_signUp: newInsurance => dispatch(insurance_signUp(newInsurance))
    };
};

export default connect(
    //exporting the component with mapping states with props 
    mapStateToProps,
    mapDispatchToProps
)(Insurance_SignUp);

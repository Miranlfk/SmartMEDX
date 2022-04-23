import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './StyleSheet.css';
import { FaUserTie } from 'react-icons/fa';
import { AiFillFolderAdd } from "react-icons/ai";
import { FaUserInjured } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PatientCover from '../images/PatientCover.png';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { patient_signUp } from '../Redux-Store/Actions/PatientActions';
import { getWeb3 } from "../getWeb3";
import map from "../artifacts/deployments/map.json";
import { getEthereum } from "../getEthereum";



class Patient_SignUp extends Component {

    //stating up the Patient Attributes and contract components
    state = {

        web3: null,
        accounts: null,
        chainid: null,

        email: "",
        password: "",
        firstName: "",
        lastName: "",
        nic: "",
        Career: "",
        Address: "",
        CurrentMedication: "",


        patientID: "",

        registration: null,
        healthStorage: null,
        healthRecords: []

    }


    componentDidMount = async () => {

        // Get network provider and web3 instance.
        const web3 = await getWeb3()

        // Try and enable accounts (connect metamask)
        try {
            const ethereum = await getEthereum()
            ethereum.request({ method: 'eth_requestAccounts' });


        } catch (e) {
            console.log(`Could not enable accounts. Interaction with contracts not available.
        Use a modern browser with a Web3 plugin to fix this issue.`)
            console.log(e)
        }

        // Use web3 to get the user's accounts
        const accounts = await web3.eth.getAccounts()

        // Get the current chain id
        const chainid = parseInt(await web3.eth.getChainId());


        //setting updated state
        this.setState({
            web3,
            accounts,
            chainid,

        }, this.loadInitialContracts);

    }


    loadInitialContracts = async () => {

        var _chainID = 0;
        //connecting to ganache development Server with its chain ID
        if (this.state.chainid === 1337) {
            _chainID = "dev"
        }

        //loading HealthRecords contract with its abi
        const healthStorage = await this.loadContract(_chainID, "HealthRecords")


        if (!healthStorage) {
            return
        }

        this.setState({
            healthStorage,

        })
    }

    loadContract = async (chain, contractName) => {
        // Load a deployed contract instance into a web3 contract object
        const { web3 } = this.state

        // Get the address of the most recent deployment from the deployment map
        let address
        try {
            address = map[chain][contractName][0]
        } catch (e) {
            console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
            return undefined
        }

        // Load the artifact with the specified address
        let contractArtifact
        try {
            contractArtifact = await import(`.././artifacts/deployments/${chain}/${address}.json`)
        } catch (e) {
            console.log(`Failed to load contract artifact ".././artifacts/deployments/${chain}/${address}.json"`)
            return undefined
        }


        return new web3.eth.Contract(contractArtifact.abi, address)
    }




    contractsubmit = async (e) => {
        e.preventDefault();//preventing Default process of submitting form
        const { accounts, healthStorage, firstName, lastName, nic, Career, Address, CurrentMedication, email } = this.state

        const _Email = email;
        const _firastname = firstName;
        const _lastName = lastName;
        const _nic = nic;
        const _Career = Career;
        const _Address = Address;
        const _CurrentMedication = CurrentMedication;

        //adding patient into blockchain node via calling the smart contract function
        healthStorage.methods.SignupPatient(_Email, _firastname, _lastName, _nic, _Career, _Address, _CurrentMedication).send({ from: accounts[0] })
            .on('receipt', async () => {
                this.setState({
                    patientID: await healthStorage.methods.patientIDGenerator().call() //assigning the patientID which retrieved from SmartContract
                })
            })
        console.log(this.patientID)

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.patient_signUp(this.state);
    };

    render() {
        const {
            web3, accounts,

        } = this.state

        if (!web3) {
            return <div>Loading Web3, accounts, and contracts...</div>
        }


        const isAccountsUnlocked = accounts ? accounts.length > 0 : false // checking the Metamask accounts are unlocked by User to operate
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to="/Patient_dashboard" />;//redirecting to patient Dashboard when user  signUp successsfull
        return (

            <>
                <div className='background'>
                    {/* party Selection Holder */}
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
                                <h3 className='patientup-head' > Sign Up Patient</h3>


                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='email' id="email" placeholder='Enter email' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                                        <Form.Control type='text' id="password" placeholder='Password' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="firstName" placeholder='First Name' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="lastName" placeholder='Last Name' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="nic" placeholder='Nic Number' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="Career" placeholder='Career' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="Address" placeholder='Address' required onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                                        <Form.Control type='text' id="CurrentMedication" placeholder='Current medication' required onChange={this.handleChange} />
                                    </Form.Group>



                                    <div className="input-field">
                                        <button onClick={this.contractsubmit} className="btn blue z-depth-1">IDGEN</button>

                                        <button type="submit" disabled={!isAccountsUnlocked} className="btn blue z-depth-1">Sign Up</button>
                                        <div className="center red-text">
                                            {authError ? <p>{authError}</p> : null}
                                        </div>
                                    </div>
                                </Form>

                            </Col>
                            <Col lg={8} md={6} sm={12}>
                                <img className='cover-1' src={PatientCover} alt='' />
                            </Col>
                        </Row>
                    </Container>
                </div>
                
            </>

        );
    };
};


const mapStateToProps = state => {
    return {
        //accessing the reducer to get authError,auth which declared in InitState
        auth: state.firebase.auth,
        authError: state.Patient.authError
    };
};

const mapDispatchToProps = dispatch => {
    return {// dispatching the patient Signup action
        patient_signUp: newPatient => dispatch(patient_signUp(newPatient))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Patient_SignUp);



import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { getWeb3 } from "../getWeb3";
import { getEthereum } from "../getEthereum";
import map from "../artifacts/deployments/map.json";
import { CreateClaim } from "../Redux-Store/Actions/InsuranceActions";
import "bootstrap/dist/css/bootstrap.css";
import Form from 'react-bootstrap/Form';


class TransactionRecords extends Component {

    state = {

        web3: null,
        accounts: null,
        chainid: null,

        claimAmount: 0,
        surgeryCost: 0,
        patientPayment: 0,
        patientfunds: 0,
        transactions: null,
        transactionslist: [],

        registration: null,

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

        this.setState({
            web3,
            accounts,
            chainid,

        }, this.loadInitialContracts);

    }


    loadInitialContracts = async () => {

        var _chainID = 0;
        if (this.state.chainid === 3) {
            _chainID = 3;
        }
        if (this.state.chainid === 1337) {
            _chainID = "dev"
        }


        const transactions = await this.loadContract(_chainID, "Transactions")
        const healthRecords = await this.loadContract(_chainID, "HealthRecords")



        if (!transactions || !healthRecords) {
            return
        }
        //this.setState(this.getFiles());
        //const regValue = await registration.methods.patientIDGenerator().call();
        //const simpleValue = await simpleStorage.methods.get().call()

        this.setState({
            transactions,
            healthRecords


            // simpleValue,
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


    // const { record, auth } = props;
    // if (!auth.uid) return <Redirect to="/signin" />;

    HandleTransactions = async () => {
        const { accounts, transactions, healthRecords } = this.state;


        let handleTrans = await transactions.handleClaim().call({ from: accounts[0] })
        console.log(handleTrans);
    }

    setTransactionDetails = async (e) => {
        e.preventDefault();
        try {

            const { patient } = this.props;
            const { accounts, healthRecords, transactions, surgeryCost, claimAmount, patientPayment, patientfunds } = this.state;



            const patientID = patient.patientID;
            console.log(patientID)
            let _account = await healthRecords.methods.patientIdentity(patientID).call({ from: accounts[0] });
            console.log(_account);
            let patientfund = await transactions.methods.setPatientFunds(patient.patientfunds).call({ from: accounts[0] });
            console.log(patientfund);

            this.surgeryCost = await transactions.methods.setSurgeryCost(patient.SurgeryCost).call({ from: accounts[0] });
            console.log(this.surgeryCost);

            this.claimAmount = await transactions.methods.setClaim(claimAmount).call({ from: accounts[0] });
            console.log(this.claimAmount);

            let trans = transactions.methods.addTransaction(patientID, claimAmount, surgeryCost, patientPayment, patientfunds).send({ from: accounts[0] });
            console.log(trans);

        }
        catch (error) {

            console.log(error);

        }
    };
    getTransactions = async () => {

        const { patient } = this.props;
        const { accounts, transactions, transactionslist } = this.state;

        const patientID = patient.patientID;
        console.log(patientID)
        let TransactionListLen = await transactions.methods.getTransactionLength(patientID).call({ from: accounts[0] });
        console.log(TransactionListLen)
        let Transactions = [];

        for (let i = 0; i < TransactionListLen; i++) {

            let trans = await transactions.methods.retrieveTransaction(i, patientID).call({ from: accounts[0] });
            Transactions.push(trans);
        }
        this.setState({ transactionslist: Transactions });
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
    insuranceHandleSubmit = e => {
        const { patient } = this.props;
        const patientID = patient.patientID;
        console.log(patientID)
        e.preventDefault();
        this.props.TransactionRecords(this.state2);

    }
    insuranceHandleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    render() {

        const isAccountsUnlocked = this.state.accounts ? this.state.accounts.length > 0 : false
        const { patient, patientIdentity, insuranceIdentity } = this.props;
        const {
            transactionslist
        } = this.state

        if (patient || patientIdentity || insuranceIdentity) {
            console.log(patient.firstName)
            const { auth, authError } = this.props;
            return (
                <div>
                    {!this.state.web3 &&
                        <div>Loading Web3, accounts, and contracts...</div>

                    }
                    {(isNaN(this.state.chainid) || this.state.chainid < 42) &&
                        <div>Wrong Network! Switch to your local RPC "Localhost: 8545" in your Web3 provider (e.g. Metamask)</div>
                    }
                    <div className="center">
                        <div className="card-panel blue accent-3 z-depth-0">
                            <div className="card-content">
                                <h4 className="card-title">Patient :{patient.firstName}</h4>
                                <h5>Patient ID :{patient.patientID}</h5>
                                <h5>Current Medication Status :{patient.CurrentMedication}</h5>
                                <h5>Surgery Cost :{patient.SurgeryCost}</h5>
                                {/* <h5>Last Updated :{patient.updatedAt}</h5> */}
                            </div>
                            {/* <div className="card-action grey lighten-4 grey-text">

                            <div>{moment(patient.createdAt.toDate()).calendar()}</div>
                        </div> */}
                        </div>
                    </div>
                    {
                        !isAccountsUnlocked ?
                            <p><strong>Connect with Metamask and refresh the page to
                                be able to edit the storage fields.</strong>
                            </p>
                            : null
                    }

                    <div className="Transaction">
                        <div>

                            {patientIdentity ?
                                <form className="white" onSubmit={this.setTransactionDetails}>
                                    <h5 className="grey-text text-darken-3">Add claim Amount</h5>
                                    <div className="input-field">
                                        <input type="text" id="claimAmount" onChange={this.handleChange} />
                                        <label htmlFor="title">Current Medication</label>
                                    </div>
                                    <div>
                                        <button type="submit" disabled={!isAccountsUnlocked} className="btn pink lighten-1 z-depth-0">Settle the Claim</button>
                                        <div className="center red-text">
                                            {authError ? <p>{authError}</p> : null}
                                        </div>
                                    </div>

                                </form>
                                : null
                            }
                        </div>
                        <div class="highlight">
                            <h4>Transaction History</h4>
                            <button className="btn deep-orange z-depth-1" onClick={this.getTransactions}>Show Transactions</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Surgery Cost</th>
                                        <th>Surgery Claim</th>
                                        <th>Patient Funds</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {transactionslist !== [] ? transactionslist.map((item, key) => (
                                    <tr>
                                        
                                        <th>{item[1]}</th>
                                        <th>{item[0]}</th>
                                        <th>{item[3]}</th>
                                            
                                        
                                    </tr>
                                )) : null}
                            </tbody>
                            </table>
                        </div>

                    </div>
                </div >

            );
        } else {
            return (
                <div className="container center">
                    <p>NOT...</p>
                </div>
            );
        }
    };
}

const mapStateToProps = (state, ownedProps) => {
    console.log(state);
    const id = ownedProps.match.params.id;
    const patients = state.firestore.data.Patients;
    const patient = patients ? patients[id] : null;

    return {

        patient: patient,
        auth: state.firebase.auth,
        medicalIdentity: state.Medical.isMedical,
        patientIdentity: state.Patient.isPatient,
        insuranceIdentity: state.Insurance.isInsurance

    };
};
const mapDispatchToProps = dispatch => {
    return {
        TransactionRecords: patient => dispatch(CreateClaim(patient))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),

    firestoreConnect([
        {
            collection: "Patients"
        }
    ])
)(TransactionRecords);
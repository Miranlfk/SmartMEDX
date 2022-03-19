import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { getWeb3 } from "../getWeb3";
import { getEthereum } from "../getEthereum";
import map from "../artifacts/deployments/map.json"
import { create } from 'ipfs-http-client';
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from 'reactstrap';
import Moment from 'react-moment';

const RecordDetails = (props) => {


  const [state1, setState1] = useState({

    web3: null,
    accounts: null,
    chainid: null, 

  })
  const [state2, setState2] = useState({

    registration: null,
    patient_name: null,
    contact_number: 0,
    Age: 0,
    Career: null,
    Address: null,
    Email: null,
    CurrentMedication: null,
    patientID:0,
    regValue: null

  })
  const [state3, setState3] = useState({
    claim : 0,
    surgeryCost : 0,
    patientPayment : 0,
    patientfunds : 0,
    transactionslist : []// trasnaction state3
  })
  const [files, setfiles] = useState({
    // healthStorage: null,
    healthStorageNew: null,
    healthRecords: []

  })

  useEffect(() => {
    Mounting()


  }, [])

  useEffect(() => {

    if (state1.web3 && state1.accounts && state1.chainid) {
      loadInitialContracts()
    } else {
      console.log("Not Loaded")
    }

  }, [state1])
  const Mounting = async () => {

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



    setState1({
      web3,
      accounts,
      chainid,

    }, loadInitialContracts);

  };


  const { patient, medicalTeam, insuranceCorp, medicalIdentity ,patientIdentity, insurnaceID } = props;
  // if (!auth.uid) return <Redirect to="/signin" />;

  const loadInitialContracts = async () => {
    // <=42 to exclude Kovan, <42 to include kovan

    var _chainID = 0;
    if (state1.chainid === 42) {
      _chainID = 42;
    }
    if (state1.chainid === 1337) {
      _chainID = "dev"
    }
    console.log(_chainID)
    const registration = await loadContract(_chainID, "Registration")
    const healthStorageNew = await loadContract(_chainID, "HealthRecordsNew")
    const transactions = await loadContract(_chainID, "Transactions")
    console.log(healthStorageNew)

    if (!registration || !healthStorageNew || !transactions) {
      return
    }
    const regValue = await registration.methods.patientIDGenerator().call();
    await getFiles();
    console.log(regValue)

    setState2({
      ...state2,
      registration,
      regValue,

    })
    setfiles({

      
      ...files,
      healthStorageNew,
    })
  }

  const loadContract = async (chain, contractName) => {
    // Load a deployed contract instance into a web3 contract object
    const { web3 } = state1

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
      contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
      console.log(`Failed to load contract artifact "../artifacts/deployments/${chain}/${address}.json"`)
      return undefined
    }

    return new web3.eth.Contract(contractArtifact.abi, address)
  }

  // const { record, auth } = props;
  // if (!auth.uid) return <Redirect to="/signin" />;
  const getFiles = async () => {
    //TODO
    try {

      const { accounts } = state1;
      const { healthStorageNew } = files;
      const {registration} = state2;

      if(patient||patientIdentity){

        const patientID=(patient.patientID) ;
        console.log(patientID)

        const _account = await registration.methods.patientIdentity(patientID).call({ from: accounts[0] });        
        console.log(_account)
        let accountSet =await healthStorageNew.methods.accountSet("0x0129D91C98121A89EedbC98203F0292191EeDC22").call({ from: accounts[0] });
        console.log(accountSet)
        let settedAccount = await healthStorageNew.methods.accountRetriever().call({ from: accounts[0] });
        console.log(settedAccount)
      }
      let filesLength = await healthStorageNew.methods.getLength().call({ from: accounts[0] });
      let filesstore = []

      for (let i = 0; i < filesLength; i++) {
        let file = await healthStorageNew.methods.retrieve_Records(i).call({ from: accounts[0] });
        filesstore.push(file);
      }
      setfiles({ healthRecords: filesstore });

    } catch (error) {
      console.log(error);
    }

  };


  const onDrop = async (file) => {
    try {

      const { accounts } = state1;
      const { healthStorageNew } = files;
      const {registration} = state2


      const client = create('https://ipfs.infura.io:5001/api/v0');

      // const result = await ipfs.add(stream);

      //const added = await client.add(file);
      let added = await client.add({
        path: `Diagnosis/${file.name}`,
        content: file
      }, { wrapWithDirectory: true })
      console.log(added);
      let v1CID = added.cid.toV1();
      const url2 = `https://${v1CID}.ipfs.dweb.link`
      console.log(url2);


      const timeStamp = Math.round(+ new Date() / 1000);
      const type = file.name.substr(file.name.lastIndexOf("." + 1));
      
      const patientID=patient.patientID ;
      console.log(patientID)
      let _account = await registration.methods.patientIdentity(patientID).call({ from: accounts[0] });
      let accountSet =await healthStorageNew.methods.accountSet(_account).call({ from: accounts[0] });
      console.log(_account);
      console.log(accountSet);

      let uploaded = healthStorageNew.methods.adding_Record(url2, file.name, type, timeStamp).send({ from: accounts[0] });
      console.log(uploaded);
      loadInitialContracts();
      await getFiles();
      //const url = `https://ipfs.infura.io/ipfs/${added.path}`

    } catch (error) {
      console.log(error);
    }
  };

  const HandleTransactions = async () => {
    let handleTrans = await transactions.handleClaim().call ({ from: accounts[0] })
    console.log(handleTrans);
  }

  const setTransactionDetails = async () => {
    try{

      const { accounts } = state1;
      const { transactions } = state3;

      if(patient||patientIdentity){

      const patientID=patient.patientID ;
      console.log(patientID)
      let _account = await registration.methods.patientIdentity(patientID).call({ from: accounts[0] });
      console.log(_account);
      let patientfund =await transactions.methods.setPatientFunds(patientfund).call({  from: accounts[0] });
      console.log(patientfund);

    } else if (medicalTeam || medicalIdentity){
      const medicalID = medicalTeam.medicalID;
      console.log(medicalID)

      let surgeryCost =await transactions.methods.setSurgeryCost(surgeryCost).call({  from: accounts[0] });
      console.log(surgeryCost);

    } else if (insuranceCorp || insurnaceID ) {

      const insuranceID = insuranceCorp.insuranceCorp;
      console.log(insuranceID);

      let claim = await transactions.methods.setClaim(claim).call({  from: accounts[0] });
      console.log(claim);

    } else{
      console.log("Invalid User")
    }

    let TransactionListLen = await transactions.methods.getLength().call({ from: accounts[0] });
    console.log(TransactionListLen)
    let TransactionList = []
    let trans = transactions.methods.addTransaction(claim, surgeryCost, _pCost, patientfund).send({ from: accounts[0] });
    console.log(trans);

    // for (let i = 0; i < TransactionListLen; i++) {
    //   //let trans = await transactions.methods.addTransaction().call({ from: accounts[0] });
      
    //   TransactionList.push(trans);
    // }
    //setState3({ transactionslist: TransactionList });
  }
    catch (error){
      console.log(error);

    }
  };

  const detailsToBlockchain = (props) => {
    const { auth } = props;
    const name = props.profile.Name;
    console.log(name)
  }

  const {
    healthRecords
  } = files
  const isAccountsUnlocked = state1.accounts ? state1.accounts.length > 0 : false


  if (patient|| medicalIdentity) {
    console.log(patient.firstName)
    return (
      <div>
        {!state1.web3 &&
          <div>Loading Web3, accounts, and contracts...</div>

        }
        {(isNaN(state1.chainid) || state1.chainid < 42) &&
          <div>Wrong Network! Switch to your local RPC "Localhost: 8545" in your Web3 provider (e.g. Metamask)</div>
        }
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{patient.firstName}</span>
              <p>{patient.Desease}</p>
              <p>{state2.solidityValue}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted by Dr {patient.authorFirstName}
              </div>
              {/* <div>{moment(record.createdAt.toDate()).calendar()}</div> */}
            </div>
          </div>
        </div>
        {
          !isAccountsUnlocked ?
            <p><strong>Connect with Metamask and refresh the page to
              be able to edit the storage fields.</strong>
            </p>
            : null
        }
        <div className="FileStore">
          <div className="container pt-6">
            { medicalIdentity ?
                <StyledDropZone onDrop={onDrop} />:null
            }
            
            <button onClick={getFiles}>Show Files</button>
            <Table>
              <thead>
                <tr>
                  <th width="7%" scope="row">Type</th>
                  <th>File Name</th>
                  <th>Date </th>
                </tr>
              </thead>
              <tbody>
                {healthRecords !== [] ? healthRecords.map((item, key) => (
                  <tr>
                    <th><FileIcon size={35} extension={item[2]} {...defaultStyles[item[2]]} /></th>
                    <th><a href={item[0]}>{item[1]}</a></th>
                    <th>
                      <Moment format="YYYY/MM/DD" unix='true'>{item[3]}</Moment>
                    </th>
                  </tr>
                )) : null}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>NOT...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownedProps) => {
  console.log(state);
  const id = ownedProps.match.params.id;
  const patients = state.firestore.data.Patients;
  const patient = patients ? patients[id] : null;

  return {

    patient: patient,
    auth: state.firebase.auth,
    medicalIdentity: state.Medical.isMedical,
    patientIdentity: state.Patient.isPatient

  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "Patients"
    }
  ])
)(RecordDetails);


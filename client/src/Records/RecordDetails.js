import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { getWeb3 } from "../getWeb3";
import { getEthereum } from "../getEthereum";
import map from "../artifacts/deployments/map.json";
import { create } from 'ipfs-http-client';
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from 'reactstrap';
import Moment from 'react-moment';


const RecordDetails = (props) => {

    //making use of UseState Hooks on functional component
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
   
    const [files, setfiles] = useState({
      // healthStorage: null,
      healthStorage: null,
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
  
    //assigning the parsed props
    const { patient, medicalIdentity ,patientIdentity } = props;
    
    const loadInitialContracts = async () => {
      
      var _chainID = 0;
     //connecting the ganache-cli chainID
      if (state1.chainid === 1337) {
        _chainID = "dev"
      }
      console.log(_chainID)
     
      //loading the Health Storage
      const healthStorage = await loadContract(_chainID, "HealthRecords")    
      console.log(healthStorage)
  
      if ( !healthStorage ) {
        return
      }
      
      await getFiles();
      
  
      setState2({
        ...state2,
      })
      setfiles({
        ...files,
        healthStorage,
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
  
    //Retrieving Health Records from the IPFS Storage
    const getFiles = async () => {
      
      try {
  
        const { accounts } = state1;
        const { healthStorage } = files;
       
        
        const patientID=(patient.patientID) ;
          console.log(patientID)
        //validating the patient accessability 
        if(patient||patientIdentity){
          //assigning the patient ID to recognize 
          const patientID=(patient.patientID) ;
          console.log(patientID)
          
        }
        //accessing the smart contract functions to retrieve the length
        let filesLength = await healthStorage.methods.getLength(patientID).call({ from: accounts[0] });
        let filesstore = []
        //Iterating to Store files in a local array to showcase on page
        for (let i = 0; i < filesLength; i++) {
          const patientID=(patient.patientID) ;
          console.log(patientID)
          let file = await healthStorage.methods.retrieve_Records(i,patientID).call({ from: accounts[0] });
          filesstore.push(file);
        }
        //updating up the state
        setfiles({ healthRecords: filesstore });
  
      } catch (error) {
        console.log(error);
      }
  
    };
  
  //onDrop to add files to upload
    const onDrop = async (file) => {
      try {
              
        const { accounts } = state1;
        const { healthStorage } = files;
        
        //creating the ipfs public-infura gateway to add files on 
        const client = create('https://ipfs.infura.io:5001/api/v0');
      
        //adding the files in a specified path
        let added = await client.add({
          path: `Diagnosis/${file.name}`,
          content: file
        }, { wrapWithDirectory: true })
        console.log(added);
        //remaking the CID to v1cid version
        let v1CID = added.cid.toV1();
        //generating  the url to access the 
        const url = `https://${v1CID}.ipfs.dweb.link`
        console.log(url);
  
        //creating the timestamp and type to display
        const timeStamp = Math.round(+ new Date() / 1000);
        const type = file.name.substr(file.name.lastIndexOf("." + 1));
        
        const patientID=patient.patientID ;
        console.log(patientID)
        
        //accessing to the smart contract functions
        let uploaded = healthStorage.methods.adding_Record(url, file.name, type, timeStamp, patientID).send({ from: accounts[0] });
        console.log(uploaded);
        loadInitialContracts();
        await getFiles();
        
  
      } catch (error) {
        console.log(error);
      }
    };

    const {
        healthRecords
    } = files
    const isAccountsUnlocked = state1.accounts ? state1.accounts.length > 0 : false


    if (patient || medicalIdentity ) {
        console.log(patient.firstName)
        return (
            <div>
                {!state1.web3 &&
                    <div>Loading Web3, accounts, and contracts...</div>

                }
                {(isNaN(state1.chainid)) &&
                    <div>Wrong Network! Switch to your local RPC "Localhost: 8545" in your Web3 provider (e.g. Metamask)</div>
                }
                <div className="center">
                    <div className="card-panel teal darken-1 z-depth-1">
                        <div className="card-content">
                            <h4 className="card-title">Patient Name:{patient.firstName}</h4>
                            <h5>Patient ID     :{patient.patientID}</h5>
                            <h5>Patient Status :{patient.CurrentMedication}</h5>
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
                        {medicalIdentity ?
                            <StyledDropZone onDrop={onDrop} /> : null
                        }

                        <button className="btn teal lighten-2 z-depth-1" onClick={getFiles}>Show Files</button>
                        <Table>
                            <thead>
                                <tr>
                                    <th width="7%" scope="row">Type</th>
                                    <th>File Name</th>
                                    <th>Date </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* mapping the health Records to showcase */}
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
//mapping states to props , derives from Reducers
const mapStateToProps = (state, ownedProps) => {
    console.log(state);
    const id = ownedProps.match.params.id;
    const patients = state.firestore.data.Patients;
    const patient = patients ? patients[id] : null;

    return {

        patient: patient,
        auth: state.firebase.auth,
        //access verification
        medicalIdentity: state.Medical.isMedical,
        patientIdentity: state.Patient.isPatient,
        insuranceIdentity: state.Insurance.isInsurance

    };
};

export default compose(
    connect(mapStateToProps),
    //connecting to the patients collection
    firestoreConnect([
        {
            collection: "Patients"
        }
    ])
)(RecordDetails);
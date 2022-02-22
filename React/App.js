import React, { Component } from "react"
import './App.css'
import { getWeb3 } from "./getWeb3";
import map from "./artifacts/deployments/map.json";
import { getEthereum } from "./getEthereum";
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from 'reactstrap';
import FormREg from './Form';
import { create } from 'ipfs-http-client';
import fileReaderPullStream from 'pull-file-reader';
import Moment from 'react-moment';




class App extends Component {

    state = {
        web3: null,
        accounts: null,
        chainid: null,

        registration: null,
        patient_name: null,
        contact_number: 0,
        Age: 0,
        Career: null,
        Address: null,
        Email: null,
        CurrentMedication: null,

        healthStorage: null,
        // simpleValue: 0,
        // simpleInput: 0,
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
        
        
      
        this.setState({
            web3,
            accounts,
            chainid,
            
        }, await this.loadInitialContracts);

        await this.getFiles();


    }

    loadInitialContracts = async () => {

        var _chainID = 0;
        if (this.state.chainid === 3) {
            _chainID = 3;
        }
        if (this.state.chainid === 1337) {
            _chainID = "dev"
        }

        const registration = await this.loadContract(_chainID, "Registration")
        const healthStorage = await this.loadContract(_chainID, "HealthRecords")


        if (!registration || !healthStorage) {
            return
        }
        //this.setState(this.getFiles());
        const regValue = await registration.methods.patientIDGenerator().call();
        //const simpleValue = await simpleStorage.methods.get().call()

        this.setState({
            registration,
            regValue,
            healthStorage,
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
            contractArtifact = await import(`./artifacts/deployments/${chain}/${address}.json`)
        } catch (e) {
            console.log(`Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`)
            return undefined
        }
        

        return new web3.eth.Contract(contractArtifact.abi, address)
    }

    changeReg = async (e) => {
        const { accounts, registration, regInput } = this.state
        e.preventDefault()
        const value = parseInt(regInput)
        if (isNaN(value)) {
            alert("invalid value")
            return
        }
        await registration.methods.SignupPatient(value).send({ from: accounts[0] })
            .on('receipt', async () => {
                this.setState({
                    regValue: await registration.methods.patientIDGenerator().call()
                })
            })
    }

    changeRecord = async (e) => {
        const { accounts, healthStorage, simpleInput } = this.state
        e.preventDefault()
        const value = parseInt(simpleInput)
        if (isNaN(value)) {
            alert("invalid value")
            return
        }
        await healthStorage.methods.set(value).send({ from: accounts[0] })
            .on('receipt', async () => {
                this.setState({
                    simpleValue: await healthStorage.methods.get().call()
                })
            })
    }

    getFiles = async () => {
        //TODO
        try {
            const { accounts, healthStorage } = this.state;
            let filesLength = await healthStorage.methods.getLength().call({ from: accounts[0] });
            let files = []
            for (let i = 0; i < filesLength; i++) {
                let file = await healthStorage.methods.retrieve_Records(i).call({ from: accounts[0] });
                files.push(file);
            }
            this.setState({ healthRecords: files });
        } catch (error) {
            console.log(error);
        }

    };


    onDrop = async (file) => {
        try {
            const { healthStorage, accounts } = this.state;

            const client = create('https://ipfs.infura.io:5001/api/v0');

            // const result = await ipfs.add(stream);
            const stream = fileReaderPullStream(file);
            const added = await client.add(file);
            console.log(added);
            let v1CID = added.cid.toV1();
            const url2 = `https://${v1CID}.ipfs.dweb.link`
            console.log(url2);

            const timeStamp = Math.round(+ new Date() / 1000);
            const type = file.name.substr(file.name.lastIndexOf("." + 1));
            let uploaded = await healthStorage.methods.adding_Record(url2, file.name, type, timeStamp).send({ from: accounts[0] });
            console.log(uploaded);
            this.getFiles();

            //const url = `https://ipfs.infura.io/ipfs/${added.path}`






        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {
            web3, accounts,
            // registration,
            regValue, regInput,
            //simpleStorage,
            simpleValue, simpleInput,
            healthRecords
        } = this.state

        if (!web3) {
            return <div>Loading Web3, accounts, and contracts...</div>
        }


        const isAccountsUnlocked = accounts ? accounts.length > 0 : false


        return (<div className="App">
            <h1>SmartMEDX EHR System.</h1>
            <h2>
                Registration
            </h2>
            {
                !isAccountsUnlocked ?
                    <p><strong>Connect with Metamask and refresh the page to
                        be able to edit the storage fields.</strong>
                    </p>
                    : null
            }
            <h2>Signup Patient</h2>

            <div>The stored value is: {regValue}</div>
            <br />
            <form onSubmit={(e) => this.changeReg(e)}>
                <div>
                    <label>Change the value to: </label>
                    <br />
                    <input
                        name="regInput"
                        type="text"
                        value={regInput}
                        onChange={(e) => this.setState({ regInput: e.target.value })}
                    />
                    <br />
                    <button type="submit" disabled={!isAccountsUnlocked}>Submit</button>
                </div>
            </form>

            <h2>Simple Storage</h2>
            <div>The stored value is: {simpleValue}</div>
            <br />
            <form onSubmit={(e) => this.changeRecord(e)}>
                <div>
                    <label>Change the value to: </label>
                    <br />
                    <input
                        name="simpleInput"
                        type="text"
                        value={simpleInput}
                        onChange={(e) => this.setState({ simpleInput: e.target.value })}
                    />
                    <br />
                    <button type="submit" disabled={!isAccountsUnlocked}>Submit</button>
                </div>
            </form>

            <div className="FileStore">
                <div className="container pt-6">
                    <StyledDropZone onDrop={this.onDrop} />
                    <button onClick={this.getFiles}>Show Files</button>
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

            <div>
                <FormREg></FormREg>
                <div className="App">
                    <h1>IPFS Example</h1>
                    <input
                        type="file"
                        onChange={this.onDrop}
                    />
                    {
                        this.fileUrl && (
                            <img src={this.fileUrl} width="600px" />
                        )
                    }
                </div>
            </div>
        </div>)
    }
}

export default App

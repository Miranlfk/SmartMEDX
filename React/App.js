
import React, { Component } from "react"
import './App.css'
import { getWeb3 } from "./getWeb3"
import map from "./artifacts/deployments/map.json"
import { getEthereum } from "./getEthereum"

class App extends Component {

    state = {
        web3: null,
        accounts: null,
        chainid: null,
        registration: null,
        regValue: 0,
        regInput: null,
        simpleStorage: null,
        simpleValue: 0,
        simpleInput: 0,
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
        const chainid = parseInt(await web3.eth.getChainId())

        this.setState({
            web3,
            accounts,
            chainid
        }, await this.loadInitialContracts)

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
        const simpleStorage = await this.loadContract(_chainID, "SimpleStorage")

        if (!registration || !simpleStorage) {
            return
        }

        const regValue = await registration.methods.patientIDGenerator().call()
        const simpleValue = await simpleStorage.methods.get().call()

        this.setState({
            registration,
            regValue,
            simpleStorage,
            simpleValue,
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

    changeSimple = async (e) => {
        const { accounts, simpleStorage, simpleInput } = this.state
        e.preventDefault()
        const value = parseInt(simpleInput)
        if (isNaN(value)) {
            alert("invalid value")
            return
        }
        await simpleStorage.methods.set(value).send({ from: accounts[0] })
            .on('receipt', async () => {
                this.setState({
                    simpleValue: await simpleStorage.methods.get().call()
                })
            })
    }

    render() {
        const {
            web3, accounts,
            // registration,
            regValue, regInput,
            //simpleStorage,
            simpleValue, simpleInput
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
            <form onSubmit={(e) => this.changeSimple(e)}>
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
        </div>)
    }
}

export default App
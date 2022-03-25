// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

import './HealthRecords.sol';

contract Transactions is HealthRecords{

    bool approved = false;

//Creating the structure of Transactions and declaring attributes
    struct Transaction {
        uint Date;
        string surgeryName;
        uint claim;
        uint surgeryCost;
        uint patientPayment;
        uint patientfunds;
    }
    
    Transaction public transaction = Transaction({
            Date: 0,
            surgeryName: "",
            claim : 0,
            surgeryCost : 0,
            patientPayment : 0,
            patientfunds : 0
    });

    //mapping the transactions with the address 
    mapping(address => Transaction[]) public TransactionList;

    //setter function to set the Date
    function setDate(uint _date) public {
            transaction.Date = _date;
    }
    
    //getter function to retrieve the Date
    function getDate() public view returns (uint) {
            return transaction.Date;
    }
    
    //setter function to set the Surgery Name
    function setSurgeryName(string memory _sName) public {
            transaction.surgeryName = _sName;
    }
    
    //getter function to retrieve the Surgery Name
    function getSurgeryName() public view returns (string memory) {
            return transaction.surgeryName;
    }

    //setter function to set the Claimable Amount : set by an Insurance Agent
    function setClaim(uint _claim) public {
            transaction.claim = _claim;
    }
    
    //getter function to retrieve the Claimable Amount
    function getClaim() public view returns (uint) {
            return transaction.claim;
    }
    
    //setter function to set the Surgery Cost : set by a Doctor / Medical Team
    function setSurgeryCost(uint _sCost) public {
            transaction.surgeryCost = _sCost;
    }
    
    //getter function to retrieve the Surgery Cost
    function getSurgeryCost() public view returns (uint) {
            return transaction.surgeryCost;
    }
    
    //setter function to set the Patient Charge : set within a function 
    function setPatientCharge(uint _pCost) public {
            transaction.patientPayment = _pCost;
    }
    
    //getter function to retrieve the Patient Charge
    function getPatientCharge() public view returns (uint) {
            return transaction.patientPayment;
    }
    
    //setter function to set the Patient Funds : set by a Patient 
    function setPatientFunds(uint _funds) public {
            transaction.patientfunds = _funds;
    }
    
    //getter function to retrieve the Patient Funds
    function getPatientFunds() public view returns (uint) {
            return transaction.patientfunds;
    }
    
    //Function to add a Transaction into the TransactionList
    function addTransaction(bytes10 _PatientID, uint _date, string memory _surgeryName,  uint _claim, uint _sCost, uint _pCost, uint _funds)  public{
        Patient memory patient = PatientList[_PatientID];
        TransactionList[patient.accountNum].push(Transaction({Date: _date, surgeryName: _surgeryName, claim :_claim, surgeryCost : _sCost, patientPayment : _pCost, patientfunds : _funds}));
    }
    
    //Function to retrieve a Transaction from the TransactionList
    function retrieveTransaction(uint _id, bytes10 _PatientID) external view returns(uint, string memory, uint, uint, uint, uint){
            Patient memory patient = PatientList[_PatientID];
            Transaction memory transaction = TransactionList[patient.accountNum][_id];
           return (transaction.Date, transaction.surgeryName, transaction.claim, transaction.surgeryCost, transaction.patientPayment, transaction.patientfunds);
    }
    
    //Function to retrieve the Length of the TransactionList
    function getTransactionLength(bytes10 _PatientID) public view returns(uint){
        Patient memory patient = PatientList[_PatientID];
        return TransactionList[patient.accountNum].length;
    }
    
    //Function to Handle a CLaim
    function handleClaim() external {
            //first checks if claimable amount approved is greater than SurgeryCost then the Patient is approved
            if (getClaim() >= getSurgeryCost() ){
                    approved = true;
            }
            else {
                    //since Surgery Cost is gretaer the remainder is assigned as the charge from Patient
                    setPatientCharge(getSurgeryCost() - getClaim());
                    manageFunds();
            }

    }
    
    //Function to manage Funds determinig if Patient has sufficient funds to proceed with a Surgery
    function manageFunds() internal {
            //requires patient funds to be greater than the patient charge for surgery to be appproved.
            require (getPatientFunds() > getPatientCharge(), "Insufficient Patient Funds");
            approved = true;
    }


}
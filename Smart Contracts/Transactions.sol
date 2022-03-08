// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

import './Registration.sol';

contract Transactions{

    bool approved = false;

    struct Transaction {
        uint claim;
        uint surgeryCost;
        uint patientPayment;
        uint patientfunds;

    }

    Transaction public transaction = Transaction({
            claim : 0,
            surgeryCost : 0,
            patientPayment : 0,
            patientfunds : 0
    });
    
    mapping(uint => Transaction[]) public TransactionList;

    function setClaim(uint _claim) public {
            transaction.claim = _claim;
    }

    function getClaim() public view returns (uint) {
            return transaction.claim;
    }
    
    function setSurgeryCost(uint _sCost) public {
            transaction.surgeryCost = _sCost;
    }

    function getSurgeryCost() public view returns (uint) {
            return transaction.surgeryCost;
    }

    function setPatientCharge(uint _pCost) public {
            transaction.patientPayment = _pCost;
    }

    function getPatientCharge() public view returns (uint) {
            return transaction.patientPayment;
    }

    function setPatientFunds(uint _funds) public {
            transaction.patientfunds = _funds;
    }

    function getPatientFunds() public view returns (uint) {
            return transaction.patientfunds;
    }

    function addTransaction  (uint _id,  uint _claim, uint _sCost, uint _pCost, uint _funds) public { 
        TransactionList[_id].push(Transaction({claim :_claim, surgeryCost : _sCost, patientPayment : _pCost, patientfunds : _funds}));
    }


    function handleClaim() external {
            if (getClaim() >= getSurgeryCost() ){
                    approved = true;
            }
            else {
                    setPatientCharge(getSurgeryCost() - (getClaim() +  getPatientFunds()));
                    manageFunds();
            }

    }

    function manageFunds() internal view {
            require (getPatientFunds() > getPatientCharge(), "Insufficient Patient Funds");
    }

}
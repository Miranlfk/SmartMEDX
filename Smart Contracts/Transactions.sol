// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

contract Transactions{
    uint32 claim = 0;
    uint32 surgeryCost = 0;
    uint32 patientPayment = 0;
    uint32 patientfunds = 0;
    uint32[] transactionsList;
    bool approved = false;


    function setClaim(uint32 clm) public {
            claim = clm;
    }

    function getClaim() public view returns (uint32) {
            return claim;
    }
    
    function setSurgeryCost(uint32 cost) public {
            surgeryCost = cost;
    }

    function getSurgeryCost() public view returns (uint32) {
            return surgeryCost;
    }

    function setPatientCharge(uint32 cost) public {
            patientPayment = cost;
    }

    function getPatientCharge() public view returns (uint32) {
            return patientPayment;
    }

    function setPatientFunds(uint32 funds) public {
            patientfunds = funds;
    }

    function getPatientFunds() public view returns (uint32) {
            return patientfunds;
    }

    function handleClaim() public {
            if (getSurgeryCost() <= getClaim()){
                    approved = true;
                    setPatientCharge(0);
            }
            else {
                    setPatientCharge(getSurgeryCost() - getClaim());
                    manageFunds();
            }
            transactionsList.push(getClaim());
    }

    function manageFunds() internal{
            if (getPatientFunds() > getPatientCharge()){
                    approved = true;
            } else{
                    revert ("Insufficient Funds");                  
            }
            
    }

    function viewTransactions() public view {
            for (uint i = 0; i < transactionsList.length; i++){
                   transactionsList[i];
            }

    }

}
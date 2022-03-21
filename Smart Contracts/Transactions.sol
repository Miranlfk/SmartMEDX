// SPDX-License-Identifier:MIT
// npm install -g ganache-cli
pragma solidity ^0.8.7;

import "./Registration.sol";

contract Transactions {
    bool approved = false;
    address PID;

    constructor() {
        PID = msg.sender;
    }

    struct Transaction {
        uint256 claim;
        uint256 surgeryCost;
        uint256 patientPayment;
        uint256 patientfunds;
    }

    Transaction public transaction =
        Transaction({
            claim: 0,
            surgeryCost: 0,
            patientPayment: 0,
            patientfunds: 0
        });

    mapping(uint256 => Transaction[]) public TransactionList;

    function setClaim(uint256 _claim) public {
        transaction.claim = _claim;
    }

    function getClaim() public view returns (uint256) {
        return transaction.claim;
    }

    function setSurgeryCost(uint256 _sCost) public {
        transaction.surgeryCost = _sCost;
    }

    function getSurgeryCost() public view returns (uint256) {
        return transaction.surgeryCost;
    }

    function setPatientCharge(uint256 _pCost) public {
        transaction.patientPayment = _pCost;
    }

    function getPatientCharge() public view returns (uint256) {
        return transaction.patientPayment;
    }

    function setPatientFunds(uint256 _funds) public {
        transaction.patientfunds = _funds;
    }

    function getPatientFunds() public view returns (uint256) {
        return transaction.patientfunds;
    }

    function accountSet(address _account) public payable {
        PID = _account;
    }

    function addTransaction(
        uint256 _id,
        uint256 _claim,
        uint256 _sCost,
        uint256 _pCost,
        uint256 _funds
    ) public {
        TransactionList[_id].push(
            Transaction({
                claim: _claim,
                surgeryCost: _sCost,
                patientPayment: _pCost,
                patientfunds: _funds
            })
        );
    }

    function handleClaim() external {
        if (getClaim() >= getSurgeryCost()) {
            approved = true;
        } else {
            setPatientCharge(
                getSurgeryCost() - (getClaim() + getPatientFunds())
            );
            manageFunds();
        }
    }

    function manageFunds() internal view {
        require(
            getPatientFunds() > getPatientCharge(),
            "Insufficient Patient Funds"
        );
    }

    function getLength(uint256 _id) external view returns (uint256) {
        return TransactionList[_id].length;
    }
}

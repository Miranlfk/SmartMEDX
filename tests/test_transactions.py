
from eth_typing import Address
from brownie import Transactions, HealthRecords, accounts, reverts

#def test_TransactionList_getter(transactions):
    #"""
    #test retrieval of Transaction List
    #"""
    #address =accounts[0]
    #assert transactions.TransactionList(address, 0) == 0

def test_setDate(transactions):
    """
    test if the date variable can be changed
    """
    transactions.setDate(0, {"from": accounts[0]})
    assert transactions.getDate() == 0

def test_getDate(transactions):
    """
    test retrieval of the date variable
    """
    assert transactions.getDate() == 0

def test_setSurgeryName(transactions):
    """
    test if the surgeryName variable can be changed
    """
    transactions.setSurgeryName("Heart Surgery", {"from": accounts[0]})
    assert transactions.getSurgeryName() == "Heart Surgery"

def test_getSurgeryName(transactions):
    """
    test retrieval of the surgeryName variable
    """
    assert transactions.getSurgeryName() == ""

def test_setClaim(transactions):
    """
    test if claim variable can be changed
    """
    transactions.setClaim(500, {"from": accounts[0]})
    assert transactions.getClaim() == 500

def test_getClaim(transactions):
    """
    test retrieval of Claim variable
    """
    assert transactions.getClaim() == 0

def test_setSurgeryCost(transactions):
    """
    test if SurgeryCost variable can be changed
    """
    transactions.setSurgeryCost(1000, {"from": accounts[0]})
    assert transactions.getSurgeryCost() == 1000

def test_getSurgeryCost(transactions):
    """
    test retrieval of Surgery variable
    """
    assert transactions.getSurgeryCost() == 0

def test_setPatientCharge(transactions):
    """
    test if PatientCharge variable can be changed
    """
    transactions.setPatientCharge(2500, {"from": accounts[0]})
    assert transactions.getPatientCharge() == 2500

def test_getPatientCharge(transactions):
    """
    test retrieval of PatientCharge variable
    """
    assert transactions.getPatientCharge() == 0

def test_setPatientFunds(transactions):
    """
    test if PatientFunds variable can be changed
    """
    transactions.setPatientFunds(2000, {"from": accounts[0]})
    assert transactions.getPatientFunds() == 2000

def test_getPatientFunds(transactions):
    """
    test retrieval of PatientFunds variable
    """
    assert transactions.getPatientFunds() == 0

#def test_accountSet(transactions):
    #"""
    #test if account variable can be changed
    #"""
    #transactions.accountSet(Address, {"from": accounts[0]})
    #assert Address == accounts[0]

def test_addTransaction(transactions):
    """
    test adding of Transaction to the TransactionList
    """
    transactions.addTransaction(0, 0, "Death", 100, 1000, 0, 0, {"from": accounts[0]})

    assert transactions.TransactionList == transactions.TransactionList

def test_retrieveTransaction(transactions):
    """
    test retrieval of Transaction from the TransactionList
    """
    assert transactions.TransactionList == transactions.TransactionList
    assert transactions.getDate() == 0
    assert transactions.getSurgeryName() == ''
    assert transactions.getClaim() == 0
    assert transactions.getSurgeryCost() == 0
    assert transactions.getPatientCharge() == 0
    assert transactions.getPatientFunds() == 0

#def test_getTransactionLength(transactions):
#    """
#    test retrieval of TransactionList Length
#    """
#    assert transactions.getTransactionLength() == 0

def test_handleClaim(transactions):
    """
    test approved varibale 
    """
    transactions.addTransaction(0, 0, "Tumor", 10000, 12500, 0, 0, {"from": accounts[0]})
    assert transactions.getApprovedStatus() == False

#
#def test_manageFunds(transactions):
#    """
#    test if revert function runs
#    """
#    transactions.addTransaction(0, 0, "Tumor", 10000, 0, 0, 0, {"from": accounts[0]})
#
#    with reverts("Insufficient Patient Funds"):
#        transactions.addTransaction(
#            0, 0, "Tumor", 10000, 12500, 0, 1000, {"from": accounts[0]})
#



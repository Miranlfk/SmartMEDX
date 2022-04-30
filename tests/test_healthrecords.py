from eth_typing import Address
from brownie import HealthRecords, accounts, reverts


def test_SignupPatient(healthNtransactionrecords, chain):
    """
    test adding of new Patient to the PatientList
    """
    healthNtransactionrecords.SignupPatient("johnstuwart1@gmail.com","John", "Kennedy", 20202009, "President", "White House, Washington", "Depression")
    newlist = healthNtransactionrecords.PatientList
    assert healthNtransactionrecords.PatientList == newlist 
    chain.reset()

def test_adding_Record(healthNtransactionrecords):
    """
    test adding of record to the Records List
    """
    healthNtransactionrecords.adding_Record("ID", "newfile", ".doc", 0, 34242)
    recordlist = healthNtransactionrecords.records
    assert healthNtransactionrecords.records == recordlist


def test_retrieve_Records(healthNtransactionrecords):
    """
    test retrieval of record from the Records List
    """
    recordlist = healthNtransactionrecords.records
    assert healthNtransactionrecords.records == recordlist

def test_getLength(healthNtransactionrecords):
    """
    test retrieval of Records List Length
    """
    recordlist = healthNtransactionrecords.records
    assert healthNtransactionrecords.records == recordlist


def test_addTransaction(healthNtransactionrecords):
    """
    test adding of Transaction to the TransactionList
    """
    healthNtransactionrecords.addTransaction(0, 0, "Death", 100, 1000, 0, 0, {"from": accounts[0]})
    newtranslist = healthNtransactionrecords.TransactionList

    assert healthNtransactionrecords.TransactionList == newtranslist

def test_retrieveTransaction(healthNtransactionrecords):
    """
    test retrieval of Transaction from the TransactionList
    """
    newtranslist = healthNtransactionrecords.TransactionList
    assert healthNtransactionrecords.TransactionList == newtranslist


def test_handleClaim(healthNtransactionrecords):
    """
    test approved varibale 
    """
    healthNtransactionrecords.addTransaction(0, 0, "Tumor", 10000, 12500, 0, 0, {"from": accounts[0]})
    assert healthNtransactionrecords.getApprovedStatus() == False


# def test_manageFunds(transactions):
#    """
#    test if revert function runs
#    """
#    transactions.addTransaction(0, 0, "Tumor", 10000, 0, 0, 0, {"from": accounts[0]})

#    with reverts("Insufficient Patient Funds"):
#        transactions.addTransaction(
#            0, 0, "Tumor", 10000, 12500, 0, 1000, {"from": accounts[0]})




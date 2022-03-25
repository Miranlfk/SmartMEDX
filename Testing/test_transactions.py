
from eth_typing import Address
from brownie import Transactions, HealthRecords, accounts, reverts


def test_TransactionList_getter(transactions):
    """
    test retrieval of Transaction List
    """
    assert transactions.TransactionList(accounts[0]) == [0, 0, 0, 0]


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


def test_accountSet(transactions):
    """
    test if account variable can be changed
    """
    transactions.accountSet(Address, {"from": accounts[0]})
    assert Address == accounts[0]


def test_addTransaction(transactions):
    """
    test adding of Transaction to the TransactionList
    """
    transactions.addTransaction(0, 10000, 12500, 2500, 2500, {"from": accounts[0]})

    assert transactions.TransactionList[id] == 0
    assert transactions.TransactionList.getClaim() == 10000
    assert transactions.TransactionList.getSurgeryCost() == 12500
    assert transactions.TransactionList.getPatientCharge() == 2500
    assert transactions.TransactionList.getPatientFunds() == 2500


def test_retrieveTransaction(transactions):
    """
    test retrieval of Transaction from the TransactionList
    """
    assert transactions.TransactionList[id] == 0
    assert transactions.TransactionList.getClaim() == 0
    assert transactions.TransactionList.getSurgeryCost() == 0
    assert transactions.TransactionList.getPatientCharge() == 0
    assert transactions.TransactionList.getPatientFunds() == 0


def test_getTransactionLength(transactions):
    """
    test retrieval of TransactionList Length
    """
    assert transactions.getLength() == 0

def test_handleClaim(transactions):
    """
    test if approved varibale turns true
    """
    transactions.addTransaction(
        0, 10000, 12500, 2500, 2500, {"from": accounts[0]})
    assert transactions.approved == True


def test_manageFunds(transactions):
    """
    test if revert function runs
    """
    transactions.addTransaction(1, 10000, 0, 0, 0, {"from": accounts[0]})

    with reverts("Insufficient Patient Funds"):
        transactions.addTransaction(
            1, 10000, 12500, 2500, 1000, {"from": accounts[0]})




from eth_typing import Address
from brownie import HealthRecords, accounts, reverts


def test_PatientList_getter(healthrecords):
    """
    test retrieval of Patient List
    """
    assert healthrecords.PatientList(accounts[0]) == ["", "", "", 0,"", "", "", 0]

def test_SignupPatient(healthrecords):
    """
    test adding of new Patient to the PatientList
    """
    healthrecords.SignupPatient("patient1@gmail.com", "John", "Kennedy", 20202009, "President", "White House, Washington", "Depression")

    assert healthrecords.PatientList.Email == "patient1@gmail.com"
    assert healthrecords.PatientList.firstName == "John"
    assert healthrecords.PatientList.lastName == "Kennedy"
    assert healthrecords.PatientList.Career == "President"
    assert healthrecords.PatientList.Address == "White House, Washington"
    assert healthrecords.PatientList.CurrentMedication == "Depression"


def test_accountSet(healthrecords):
    """
    test if account variable can be changed
    """
    healthrecords.accountSet(Address, {"from": accounts[0]})
    assert healthrecords.accountRetriever() == accounts[0]

 
def test_accountRetriever(healthrecords):
    """
    test retrieval of account variable
    """
    assert healthrecords.accountRetriever() == accounts[0]


def test_records_getter(healthrecords):
    """
    test retrieval of records
    """
    assert healthrecords.records(accounts[0]) == ["", "", "", 0]


def test_adding_Record(healthrecords):
    """
    test adding of record to the Records List
    """
    healthrecords.adding_Record("ID", "newfile", ".doc", 0, 34242)

    assert healthrecords.records.FID == "ID"
    assert healthrecords.records.fileName == "newfile"
    assert healthrecords.records.fileType == ".doc"
    assert healthrecords.records.Date == 0


def test_retrieve_Records(healthrecords):
    """
    test retrieval of record from the Records List
    """
    assert healthrecords.records.FID == ""
    assert healthrecords.records.fileName == ""
    assert healthrecords.records.fileType == ""
    assert healthrecords.records.Date == 0

def test_getLength(healthrecords):
    """
    test retrieval of Records List Length
    """
    assert healthrecords.getLength() == 0

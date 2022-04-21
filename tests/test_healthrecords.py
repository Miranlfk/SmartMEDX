from eth_typing import Address
from brownie import HealthRecords, accounts, reverts

#def test_PatientList_getter(healthrecords):
    #"""
    #test retrieval of Patient List
    #"""
    #assert healthrecords.PatientList(accounts[0]) == ["", "", "", 0,"", "", "", 0]

def test_SignupPatient(healthrecords, chain):
    """
    test adding of new Patient to the PatientList
    """
    healthrecords.SignupPatient("John", "Kennedy", 20202009, "President", "White House, Washington", "Depression")
    newlist = healthrecords.PatientList
    #assert healthrecords.PatientList(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00') == (["John", "Kennedy", 20202009, "President", "White House, Washington","Depression"])
    assert healthrecords.PatientList == newlist 
    chain.reset()
    #assert healthrecords.PatientList.Patient.Email == "patient1@gmail.com"
    #assert healthrecords.PatientList.Patient.firstName == "John"
    #assert healthrecords.PatientList.Patient.lastName == "Kennedy"
    #assert healthrecords.PatientList.Patient.Career == "President"
    #assert healthrecords.PatientList.Patient.Address == "White House, Washington"
    #assert healthrecords.PatientList.PatientCurrentMedication == "Depression"

#def test_records_getter(healthrecords):
#    """
#    test retrieval of records
#    """
#    assert healthrecords.records(accounts[0]) == ["", "", "", 0]

def test_adding_Record(healthrecords):
    """
    test adding of record to the Records List
    """
    healthrecords.adding_Record("ID", "newfile", ".doc", 0, 34242)
    recordlist = healthrecords.records
    assert healthrecords.records == recordlist
    #assert healthrecords.fileName == "newfile"
    #assert healthrecords.fileType == ".doc"
    #assert healthrecords.Date == 0


def test_retrieve_Records(healthrecords):
    """
    test retrieval of record from the Records List
    """
    recordlist = healthrecords.records
    assert healthrecords.records == recordlist
    #assert healthrecords.Record.fileName == ""
    #assert healthrecords.Record.fileType == ""
    #assert healthrecords.Record.Date == 0

def test_getLength(healthrecords):
    """
    test retrieval of Records List Length
    """
    recordlist = healthrecords.records
    assert healthrecords.records == recordlist

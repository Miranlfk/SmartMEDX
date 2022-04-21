// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;


contract HealthRecords{
    
    bytes10 _P_ID;

//Creating the structure of Patients by declaring attributes
    struct Patient{

        string Email;
        string firstName;       
        string lastName; 
        uint NIC;        
        string Career;
        string Address;        
        string CurrentMedication;
        address accountNum;

    }
    //mapping the patients with unique ID 
    mapping( bytes10 => Patient)  public  PatientList;

    //Storing patients on blockchain when user sginUp
    function SignupPatient(string memory _Email,string memory _firstName,string memory _lastName, uint _NIC, string memory _Career, string memory _Address,  string memory _currentMedication) public   {
        //generating patient unique ID with keccack256 with cryptographic Encryption
        _P_ID = bytes10(keccak256(abi.encodePacked(_firstName,msg.sender)));
        //appending values to the relevant patient    
        PatientList[_P_ID] = Patient({Email:_Email,firstName:_firstName,lastName:_lastName, NIC:_NIC, Career:_Career, Address:_Address,CurrentMedication:_currentMedication,accountNum: msg.sender});
        
    }     
        //Retrieving the patient Id to the client
     function patientIDGenerator() public view returns(bytes10){        
       return _P_ID;
    }
        //Retrieving the patient account number to the client according the patient ID
    function patientIdentity(bytes10 _PatientID) public view returns(address){
        Patient memory patient = PatientList[_PatientID];
        
        return (patient.accountNum);
    }
    //Creating the structure of Health Records by declaring files attributes
    struct Record{

        string FID;
        string fileName;
        string fileType;
        uint Date; 
    }
    

    mapping(address => Record[]) records;// mapping for user to unique records 
   
    //adding Health Records to specified patient account
    function adding_Record(string memory _FID,string memory _fileName,string memory _fileType, uint _date, bytes10 _PatientID) public{
        Patient memory patient = PatientList[_PatientID];
        records[patient.accountNum].push(Record({FID :_FID,fileName: _fileName,fileType:_fileType,Date :_date }));
    } 

    //Retrieving Health Records from specified patient account
    function retrieve_Records(uint _indexNum,bytes10 _PatientID) public view returns(string memory, string memory, string memory, uint){
         Patient memory patient = PatientList[_PatientID];
        Record memory record = records[patient.accountNum][_indexNum];
        return (record.FID, record.fileName, record.fileType, record.Date);
    }
    // getting file count loop through every files and render
    function getLength(bytes10 _PatientID) public view returns(uint){
        Patient memory patient = PatientList[_PatientID];
        return records[patient.accountNum].length;
    }
    
}
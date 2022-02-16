// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

contract Registration{

    address admin;
    bool IDGenerated;    
    bytes10 _P_ID;
    
    
    constructor(){
        admin = msg.sender; // assigning owner of the contract to manipulate
    }

    //making doctor Structure
    struct Doctor{

        string name;        
        uint contact_number;
        uint NIC;
        string Qulification;
        string Citizenship;
        string Address;
        string profession;

    }
    
    mapping(uint => Doctor) public DoctorList; //mapping each one of doctors with NIC


    modifier OnlyOwner(){       // Giving administrative privilages to owner
        require(admin == msg.sender);
        _;
    }

    // regitering 1st parties
    function SignupDoctor(string memory _name, uint _contactnumber,uint _NIC, string memory _Qualification, string memory _Citizenship, string memory _Address,  string memory _profession) public OnlyOwner   {            
    
        DoctorList[_NIC] = Doctor(_name,_contactnumber,_NIC, _Qualification,_Citizenship,_Address,_profession);

    }

    
    struct Patient{

        string name;        
        uint contact_number;
        uint Age;
        string Career;
        string Address;
        string Citizenship;
        string CurrentMedication;

    }
    
    mapping( bytes10 => Patient) public PatientList;

    
    function SignupPatient(string memory _name, uint _contactnumber, uint _Age, string memory _Career, string memory _Address,  string memory _Citizenship, string memory _currentMedication) public OnlyOwner  {
        
        _P_ID = bytes10(keccak256(abi.encodePacked(_name,msg.sender)));       
    
        PatientList[_P_ID] = Patient(_name,_contactnumber, _Age,_Career,_Address,_Citizenship,_currentMedication);

        
    } 

    function patientIDGenerator() public view returns(bytes10){
        
        return _P_ID;
    }

    struct Insurance{

        string name;
        uint contact_number;
        uint employeeID;
        string Profession;
        string InsuranceCompany;
        string Citizenship;

    }
    
    mapping( uint => Insurance) public InsuranceList;

    
    function SignupInsurance(string memory _name, uint _contactnumber, uint _employeeID, string memory _Profession, string memory _InsuranceCompany,  string memory _Citizenship) public OnlyOwner {        
        
    
        InsuranceList[_employeeID] = Insurance(_name,_contactnumber, _employeeID,_Profession,_InsuranceCompany,_Citizenship);

        
    } 

    


}

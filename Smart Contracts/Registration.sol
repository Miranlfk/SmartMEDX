// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

contract Registration{

    
    bool IDGenerated;
    bytes10 _P_ID;
    
        
    
    //making doctor Structure
    // struct Doctor{

    //     string name;
    //     uint contact_number;
    //     uint NIC;
    //     string Qulification;
    //     string Citizenship;
    //     string Address;
    //     string profession;
        

    // }
    
    // mapping(uint => Doctor) public DoctorList; //mapping each one of doctors with NIC


    // modifier OnlyOwner(){       // Giving administrative privilages to owner
    //     require(admin == msg.sender);
    //     _;
    // }

    // // regitering 1st parties
    // function SignupDoctor(string memory _name, uint _contactnumber,uint _NIC, string memory _Qualification, string memory _Citizenship, string memory _Address,  string memory _profession) public OnlyOwner   {            
    
    //     DoctorList[_NIC] = Doctor(_name,_contactnumber,_NIC, _Qualification,_Citizenship,_Address,_profession);

    // }

    
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
    
    mapping( bytes10 => Patient) public PatientList;

    
    function SignupPatient(string memory _Email,string memory _firstName,string memory _lastName, uint _NIC, string memory _Career, string memory _Address,  string memory _currentMedication) public   {
        
        _P_ID = bytes10(keccak256(abi.encodePacked(_firstName,msg.sender)));       
    
        PatientList[_P_ID] = Patient({Email:_Email,firstName:_firstName,lastName:_lastName, NIC:_NIC, Career:_Career, Address:_Address,CurrentMedication:_currentMedication,accountNum: msg.sender});

        
    } 
    

     function patientIDGenerator() public view returns(bytes10){        
       return _P_ID;
    }

    function patientIdentity(bytes10 _PatientID) public view returns(address){
        Patient memory patient = PatientList[_PatientID];
    
        return (patient.accountNum);
    }


    // function accountGetter() public view returns(address){
    //     return msg.sender;
    // }

    // function patientGetter(bytes10 ID) public view returns(address _account){         
    //     return PatientList[ID].accountNum;
    // }
    // struct Insurance{

    //     string name;
    //     uint contact_number;
    //     uint employeeID;
    //     string Profession;
    //     string InsuranceCompany;
    //     string Email;

    // }
    
    // mapping( uint => Insurance) public InsuranceList;

    
    // function SignupInsurance(string memory _name, uint _contactnumber, uint _employeeID, string memory _Profession, string memory _InsuranceCompany,  string memory _email) public OnlyOwner {        
    
    //     InsuranceList[_employeeID] = Insurance(_name,_contactnumber, _employeeID,_Profession,_InsuranceCompany,_email);        
    // } 


}

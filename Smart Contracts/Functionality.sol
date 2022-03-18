// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

import './Registration.sol';
import './HealthRecordsNew.sol';

// contract Functionality{
//     bool insurerVerified;
//     uint storedData = 5;
//     address Admin;

//     modifier OnlyOwner(){
//         require(Admin == msg.sender);
//         _;
//     }


//     function addPatient (address _ehr, string memory _name, uint _contactnumber, uint _Age, string memory _Career, string memory _Address, string memory _Citizenship, string memory _currentMedication ) external OnlyOwner(){
//         Registration(_ehr).SignupPatient(_name, _contactnumber, _Age, _Career, _Address, _Citizenship, _currentMedication);
//     }


//     function viewHealthRecord(address _ehr, uint _indexNum) public view returns (string memory, string memory, string memory, uint) {
//        return HealthRecordsNew(_ehr).retrieve_Records(_indexNum);

//     }

//     function requestHealthRecord(address _insuranceAccess, uint _indexNum) public view  {
//         if (insurerVerified == true){
//             viewHealthRecord(_insuranceAccess, _indexNum);
//         } else{
//             revert("Insurance Agent not Verified");
//         }
//     }

//     function updateHealthRecord(address _ehr, string memory _FID, string memory _fileName, string memory _fileType, uint _date) public OnlyOwner(){
//         HealthRecordsNew(_ehr).adding_Record(_FID, _fileName, _fileType, _date);
//     }



// }

// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;
import "./Registration.sol";

contract HealthRecordsNew is Registration  {

    
    bytes10 PatientID;
    address public Paccount;
    
    
    struct Record{

        string FID;
        string fileName;
        string fileType;
        uint Date; 
    }
    // constructor(address _account) {
    //     account = _account;
    // }

    mapping(address => Record[]) records;// mapping for user to unique records 

    function accountSet(address _account) payable public {
        Paccount=_account;
    }

    function accountRetriever() public view returns(address){
        return Paccount;
    }

    function adding_Record(string memory _FID,string memory _fileName,string memory _fileType, uint _date) external{

        records[Paccount].push(Record({FID :_FID,fileName: _fileName,fileType:_fileType,Date :_date }));

    } 

    
    function retrieve_Records(uint _indexNum) external view returns(string memory, string memory, string memory, uint){
        Record memory record = records[Paccount][_indexNum];
        return (record.FID, record.fileName, record.fileType, record.Date);
    }

    function getLength() external view returns(uint){
        return records[Paccount].length;
    }
    
}
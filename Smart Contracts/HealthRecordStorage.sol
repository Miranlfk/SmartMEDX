// SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;

contract HealthRecords{

    struct Record{

        string FID;
        string fileName;
        string fileType;
        uint Date;
 
    }


    mapping(address => Record[]) records;// mapping for user to unique records 

    function adding_Record(string memory _FID,string memory _fileName,string memory _fileType, uint _date) external{

        records[msg.sender].push(Record({FID :_FID,fileName: _fileName,fileType:_fileType,Date :_date }));

    } 

    function retrieve_Records(uint _indexNum) external view returns(string memory, string memory, string memory, uint){
        Record memory record = records[msg.sender][_indexNum];
        return (record.FID, record.fileName, record.fileType, record.Date);
    }

    function getLength() external view returns(uint){
        return records[msg.sender].length;
    }
    



}
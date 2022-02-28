// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

contract Transcation{
    uint256 storedData = 5;

    function set(uint256 _x) public {
            storedData = _x;
    }

    function get() public view returns (uint256) {
            return storedData;
    }
}

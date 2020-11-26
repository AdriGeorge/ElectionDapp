// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 < 0.8.0;

contract Election {
    
    struct candidate {
        string name;
        uint vote;
        bool voted;
    }
    
    mapping (address => candidate) candidateList;
    mapping (uint => address) candidateAddress;
    
    address owner;
    bool start;
    bool close;
    uint candidateLength = 0;

    event Winner(address, string, uint);
    
    modifier validCandidate {
        require(candidateList[msg.sender].voted == false, "already voted"); 
        require(start == true, "false");
        _;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    
    constructor() public{
        owner = msg.sender;
        start = false;
        close = false;
    }
    
    function vote(address _candidate) public validCandidate {
        require(close == false, "Election is close");
        // Not allow to vote for yourself
        require (msg.sender != _candidate, "you can not vote for yourself");
        candidateList[_candidate].vote += 1;
        candidateList[msg.sender].voted = true;
    }
    
    function addCandidate(address _newCandidate, string memory _name) public onlyOwner{
        require(start == false && close == false);
        candidateAddress[candidateLength] = _newCandidate;
        candidateLength += 1;
        candidateList[_newCandidate].name = _name;
        candidateList[_newCandidate].vote = 0;
        candidateList[_newCandidate].voted = false;
    }
    
    function getWinner() public onlyOwner{
        uint voteMax = 0;
        uint x = 0;
        address winner;
        for (uint i=0; i<candidateLength; i++){
            x = candidateList[candidateAddress[i]].vote;
            if (x > voteMax) {
                voteMax = x;
                winner = candidateAddress[i];
            }
        }
        close = true;
        emit Winner(winner, candidateList[winner].name, voteMax);
    }
    
    function startElection() public onlyOwner {
        require (start == false && candidateLength > 2,  "already started or candidate not enought" );
        start = true;
    }

    function getCandidateInfo(uint i) public view returns (address, string memory, uint) {
        return (candidateAddress[i], candidateList[candidateAddress[i]].name, candidateList[candidateAddress[i]].vote);
    }

    function getLength() public view returns (uint) {
        return candidateLength;
    }

    function getStart() public view returns (bool){
        return start;
    }

    function getClose() public view returns(bool){
        return close;
    }
}
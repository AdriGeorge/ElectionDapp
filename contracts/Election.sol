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
    uint candidateLength = 0;
    
    modifier validCandidate {
        require(candidateList[msg.sender].voted == false && 
                start == true,
                "Not valid ");
        _;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    
    constructor() public{
        owner = msg.sender;
        start = false;
    }
    
    function vote(address _candidate) public validCandidate {
        // Not allow to vote for yourself
        require (msg.sender != _candidate);
        candidateList[_candidate].vote += 1;
        candidateList[msg.sender].voted = true;
    }
    
    function addCandidate(address _newCandidate, string memory _name) public onlyOwner{
        require(start == false);
        candidateAddress[candidateLength] = _newCandidate;
        candidateLength += 1;
        candidateList[_newCandidate].name = _name;
        candidateList[_newCandidate].vote = 0;
        candidateList[_newCandidate].voted = false;
    }
    
    function getWinner() public view onlyOwner returns(address, string memory, uint){
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
        return (winner, candidateList[winner].name, voteMax);
    }
    
    function startElection() public onlyOwner {
        require (start == false&& candidateLength > 2,  "already started or candidate not enogth" );
        start = true;
    }
}
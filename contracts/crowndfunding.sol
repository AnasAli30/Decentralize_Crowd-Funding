//SPDX-License-Identifier:UNLLICENSED

pragma solidity >=0.5.0 < 0.9.0;

contract CrowdFunding{
    mapping(address=>uint) public contributors;
    address public manager;
    uint public MinimumContribution;
    uint public deadline;
    uint public target;
    uint public raisedAmount;
    uint public noOfContributor;



    struct Request{
        string description;
        address payable recipient;
        uint value;
        bool completed;
        uint noOfVoters;
        mapping(address=>bool) voters;
    }

    mapping(uint=>Request) public requests;
    uint public numRequests;






    constructor(uint _target,uint _deadline){
        target = _target;
        deadline = block.timestamp+_deadline;
        MinimumContribution = 100 wei;
        manager=msg.sender;

    }


    function sendEth() public payable{
        require(block.timestamp<deadline,"This Contribution is Already Over");
        require(msg.value>=MinimumContribution,"Minimum Contribution is not met");
        if(contributors[msg.sender]==0){
            noOfContributor++;
        }
        contributors[msg.sender]+=msg.value;
        raisedAmount+=msg.value;


    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

    function refund() public payable{
        require(block.timestamp>deadline,"This Contribution is Not Over");
        require(raisedAmount<target,"Target is archived");
        require(contributors[msg.sender]>0);
        address payable user = payable(msg.sender);
        user.transfer(contributors[msg.sender]);
        contributors[msg.sender]=0;

    }

    modifier onlyManager(){
        require(msg.sender==manager,"Only Manager Can Call this function");
        _;    }


    function CreateRequest(string memory _Description, address payable _recipient,uint _value) public onlyManager{
        Request storage newRequest =requests[numRequests];
        numRequests++;
        newRequest.description=_Description;
        newRequest.recipient=_recipient;
        newRequest.value=_value;
        newRequest.completed=false;
        newRequest.noOfVoters=0;
    }


    function voteRequest(uint _requestNo) public{
        require(contributors[msg.sender]>0,"You must be contributor");
        require(requests[_requestNo].recipient!=0x0000000000000000000000000000000000000000,"This Request not exist");
        Request storage thisRequest=requests[_requestNo];
        require(thisRequest.voters[msg.sender]==false,"You Have already voted");
        thisRequest.voters[msg.sender]=true;
        thisRequest.noOfVoters++;
    }

    function makePayment(uint _requestNo) public onlyManager{
        require(raisedAmount>=target);
        Request storage thisRequest=requests[_requestNo];
        require(thisRequest.completed==false,"This Request has been completed");
        require(thisRequest.noOfVoters>noOfContributor/2,"majority does not support");
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed=true;

    }

    


}
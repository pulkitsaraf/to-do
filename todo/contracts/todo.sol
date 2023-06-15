// SPDX-License-Identifier: Local
pragma solidity ^0.8.0;


contract Todo {
    address public admin;
    uint public taskIndex;


    constructor() {
        admin = msg.sender;
        taskIndex = 0;
    }
    struct Task {
        uint id;
        string name;
        address assignedTo;
        bool isCompleted;
    }


    event TaskCreated(uint id, string name);
    event TaskAssigned(uint id, address assignedTo);
    event TaskCompleted(uint id);


    mapping (uint => Task) public tasks;


    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }


    function createTask(string memory _name) public onlyAdmin returns(uint) {
        taskIndex++;
        tasks[taskIndex] = Task(taskIndex, _name, address(0), false);
        emit TaskCreated(taskIndex, _name);
        return taskIndex;
    }


    function assignTask(uint _taskId, address _assignAddress) public onlyAdmin {
        require(_taskId > 0 && _taskId <= taskIndex, "Invalid task ID");
        tasks[_taskId].assignedTo = _assignAddress;
        emit TaskAssigned(_taskId, _assignAddress);
    }


    function markTaskComplete(uint _taskId) public {
        require(msg.sender == tasks[_taskId].assignedTo,"Task not assigned to current user");
        tasks[_taskId].isCompleted = true;
        emit TaskCompleted(_taskId);
    }
}

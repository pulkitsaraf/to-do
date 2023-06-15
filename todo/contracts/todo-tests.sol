// SPDX-License-Identifier: Local
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Todo.sol";

contract TestTodo {
    Todo todo;

    function beforeEach() public {
        todo = new Todo();
    }

    function testCreateTask() public {
        uint taskId = todo.createTask("Task 1");
        Todo.Task memory task = todo.tasks(taskId);

        Assert.equal(task.name, "Task 1", "Task name should match");
        Assert.equal(task.isCompleted, false, "Task should not be marked as completed");
    }

     function testAssignTask() public {
        uint taskId = todo.createTask("Task 1");
        todo.assignTask(taskId, assignee);
        Todo.Task memory task = todo.tasks(taskId);

        Assert.equal(task.assignedTo, assignee, "Task should be assigned to the specified address");
    }

    function testMarkTaskComplete() public {
        uint taskId = todo.createTask("Task 1");
        todo.assignTask(taskId, assignee);
        todo.markTaskComplete(taskId);
        Todo.Task memory task = todo.tasks(taskId);

        Assert.equal(task.isCompleted, true, "Task should be marked as completed");
    }
}
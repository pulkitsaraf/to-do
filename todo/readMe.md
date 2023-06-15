# To Do Backend and Solidity Contract

This includes the backend in nodejs and the contract in solidity with test cases in solidity for the To Do Application

## Prerequisites f
Node version above 18.

Docker

Remix IDE for Solidity Contract

Solidity Smart contract is in the contracts folders of the root folder with its ABI and bytecode in TODO.json. 

todo-tests.sol includes the test cases of the contarct. 

postman-collection.json includes the APIs exposed for the three methods.

## Installing and Running the backend
### Using NPM
Go to the root directory and the following command to start the backend application.


```bash
npm install
npm start
```
### Using Docker
Check if the docker is running in the system

Run the following commands to run the app using docker

```bash
docker build -t <app_name> .
docker run <imageId>
```

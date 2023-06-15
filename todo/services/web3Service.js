var Web3 = require("web3");
const ethers = require("ethers")
const abiDecoder = require('abi-decoder');
let TODO = require('../contracts/Todo.json');
const address = require('../address.json');
const fs = require("fs");
const { resolve } = require("dns");
const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/SfSCoVI0kotSo8LfCfD5Z0CaOsTmxneG"));
let privateKey = "0x8c6a23c479b1906e56005724f5e5004aba524eb4fa3561cf4fb7fd4ebec21e91";
// let privateKey = "0x7c3859036b8dc7d5926adb512565b099ac13e61ce1aefaaf97e2635b64e78d58"; //ganache
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
let instance = new web3.eth.Contract(TODO.abi, address.todoAddress);


// deployContracts();
function deployContracts() {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {};
            let ToDocontract = await deployTODO();
            response["todoAddress"] = ToDocontract.contractAddress;
            response["todoTxHash"] = ToDocontract.transactionHash;
            console.log("final response obj is : ", response);
            fs.writeFile('address.json', JSON.stringify(response), (error) => {
                if (error) throw error;
            });
            var stream = fs.createWriteStream(".env");
            stream.once('open', function (fd) {
                stream.write(`TODO_ADDRESS=${response.nftAddress}\n`);
                stream.write(`TODO_TX_HASH=${response.nftTxHash}\n`);
                stream.end();
            });
        } catch (error) {
            reject(error);
        }
    })
}

async function deployTODO() {
    const txnCount = await web3.eth.getTransactionCount(account.address);
    const contract = new web3.eth.Contract(TODO.abi);
    const options = { data: TODO.bytecode, arguments: [] }
    const transaction = contract.deploy(options);
    let contractData = {
        nonce: web3.utils.numberToHex(txnCount),
        from: account.address,
        to: null,
        data: transaction.encodeABI(),
        // gasPrice: "0x0000000000000000000000000000000000000000000000000000000000003e80", //ETH per unit of gas 
        gasPrice: await web3.eth.getGasPrice(),
        gas: 10000000
    }
    const createTransaction = await web3.eth.accounts.signTransaction(contractData, privateKey);
    const pTx = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    return pTx;
}

function createTask(taskName) {
    return new Promise(async (resolve, reject) => {
        try {
            const txnCount = await web3.eth.getTransactionCount(account.address);
            const transaction = instance.methods.createTask(taskName).encodeABI();
            const tx = {
                nonce: web3.utils.numberToHex(txnCount),
                from: account.address,
                to: address.todoAddress,
                gasPrice: await web3.eth.getGasPrice(),
                //gas:await transaction.estimateGas({from:account.address}),
                gas: 10000000,
                data: transaction
            };
            console.log(tx.gasPrice);
            const signPromise = await web3.eth.accounts.signTransaction(tx, privateKey);
            let result = await web3.eth.sendSignedTransaction(signPromise.rawTransaction)
            console.log("result is :", result);
            resolve(result);

        } catch (error) {
            console.log("error is : ", error)
            reject(error);
        }
    })
}


function assignTask(taskId, toAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            const txnCount = await web3.eth.getTransactionCount(account.address);
            const transaction = instance.methods.assignTask(taskId, toAddress).encodeABI();
            const tx = {
                nonce: web3.utils.numberToHex(txnCount),
                from: account.address,
                to: address.todoAddress,
                gasPrice: await web3.eth.getGasPrice(),
                //gas:await transaction.estimateGas({from:account.address}),
                gas: 10000000,
                data: transaction
            };
            console.log(tx.gasPrice);
            const signPromise = await web3.eth.accounts.signTransaction(tx, privateKey);
            let result = await web3.eth.sendSignedTransaction(signPromise.rawTransaction)
            console.log("result is :", result);
            resolve(result);
        } catch (error) {
            console.log("error is : ", error)
            reject(error);
        }
    })
}

function markTaskToComplete(taskId) {
    return new Promise(async (resolve, reject) => {
        try {
            const txnCount = await web3.eth.getTransactionCount(account.address);
            const transaction = instance.methods.markTaskComplete(taskId).encodeABI();
            const tx = {
                nonce: web3.utils.numberToHex(txnCount),
                from: account.address,
                to: address.todoAddress,
                gasPrice: await web3.eth.getGasPrice(),
                //gas:await transaction.estimateGas({from:account.address}),
                gas: 10000000,
                data: transaction
            };
            console.log(tx.gasPrice);
            const signPromise = await web3.eth.accounts.signTransaction(tx, privateKey);
            let result = await web3.eth.sendSignedTransaction(signPromise.rawTransaction)
            console.log("result is :", result);
            resolve(result);
        } catch (error) {
            console.log("error is : ", error)
            reject(error);
        }
    })
}



module.exports = {
    createTask,
    assignTask,
    markTaskToComplete
}
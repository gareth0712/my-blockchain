const assert = require('assert');
// Ganache is merely for testing and development purposes
// Ganache automatically creates a set of accounts for us to use as soon as the test network boots up
// The accounts are in unlocked state => unlocked means we can send ethers between these accounts without any concern about private/public keys or security issue
// We can only deploy a contract when we have access to an account
const ganache = require('ganache-cli');
const Web3 = require('web3');
// An instance of Web3 will be created to access the accounts provided by ganache
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile')('Inbox');

// Brief syntax reference for running mocha test
// class Car {
//   park() {
//     return 'stopped';
//   }

//   drive() {
//     return 'vroom';
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe('car', () => {
//   it('can stop', () => {
//     assert.strictEqual(car.park(), 'stopped');
//   });

//   it('can drive', () => {
//     assert.strictEqual(car.drive(), 'vroom');
//   });
// });

let accounts;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts that's provided by Ganache
  // getAccounts method returns a promise that gets resolved with a list of accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract (Recall that we need an account to deploy the contract)
  // Using the first account (account[0]) in that accounts array to deploy the contract
  // Creating and deploying a contract is an asynchronous operation => await
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // ok means is this a defined value ; fail if null / undefined
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    // 2 sets of parentheses:
    // 1st one is to provide the arguments needed for the method
    // 2nd is used to customized the transaction we are attempting to send to the network.
    // It stats how the function gets call. For sending a transaction to a function
    // we then need to provide more details like who pays for the transaction and how much gas to use
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    // Have accounts[0] (same account as the one create the contract) pays for the change
    // With the amount of gas it is willing to pay
    // Point is for sending a transaction to a function, we get back the transaction hash as a returned object
    // So we need to call the message function again to have the updated message
    // Error will be thrown if the setMessage isn't run properly
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'bye');
  });
});

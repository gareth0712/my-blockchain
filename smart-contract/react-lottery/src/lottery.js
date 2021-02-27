import web3 from './web3';

const address = process.env.REACT_APP_BLOCK_ADDRESS;
console.log(process.env.REACT_APP_ABI);
const abi = JSON.parse(process.env.REACT_APP_ABI);

// The purpose of this file is to create a local contract instance
// We're going to make an object that exists only inside of our browser.
// It functions as an abstraction of our deployed contract on the blockchain.
// A local js only copy that is meant to represent what is actually occurring on the block.
// Again, the only purpose of this file is to export a complete copy of the contract
export default new web3.eth.Contract(abi, address);

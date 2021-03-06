import Web3 from 'web3';

let web3;

// Now the window.ethereum object itself is a provider type that supports the methods defined in EIP-1102 and EIP-1193.
// No more having to check window.web3 for its currentProvider — we can simply use window.ethereum as the provider itself!
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
}

export default web3;

// Traditional way
// Metamask injects web3 onto the web3 global variable
// Now we make use of the web3 module installed from npm instead of the one provided by metamask (version changes over time)
// The currentProvider property is the provider that is installed or given to that copy of Metamask web3.
// So this provider right here has been pre-configured to connect to the test network and has access to
// all of the accounts (public/private keys etc)
// So we retrieve the currentProvider from the Metamask and put it to our installed version of web3 to ensure
// We use the same web3 version every time we run the react app
// if (window.web3) {
//   const web3 = new Web3(window.web3.currentProvider);
// }

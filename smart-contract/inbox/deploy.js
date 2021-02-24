const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// First argument is the mnemonic address
// Second argument is link of network we wanna connect to, in this case the rinkeby network provided by Infura
// It connect to a node offered by Infura
const provider = new HDWalletProvider(
  'own flush dust tissue scout unlock public grocery civil vibrant trick always',
  'https://rinkeby.infura.io/v3/bb6da62468144c9ab9fe15ba03479798'
);

const web3 = new Web3(provider);

(async () => {
  // Mnemonic phrases involve a large number of accounts => we only need the first one for development purpose
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
})();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const dotenv = require('dotenv');
const path = require('path');

const configPath = path.resolve(__dirname, 'config', 'config.env');
dotenv.config({ path: configPath });

const { interface, bytecode } = require('./compile')(process.env.CONTRACT);

// First argument is the mnemonic address
// Second argument is link of network we wanna connect to, in this case the rinkeby network provided by Infura
// It connect to a node offered by Infura
const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_URL
);

const web3 = new Web3(provider);

(async () => {
  // Mnemonic phrases involve a large number of accounts => we only need the first one for development purpose
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const contract = new web3.eth.Contract(JSON.parse(interface));
  let result;

  if (process.env.CONTRACT === 'Inbox') {
    console.log('hi');
    result = await contract
      .deploy({ data: bytecode, arguments: ['Hi there!'] })
      .send({ gas: '1000000', from: accounts[0] });
  } else if (process.env.CONTRACT === 'Lottery') {
    result = await contract
      .deploy({ data: bytecode })
      .send({ gas: '1000000', from: accounts[0] });
  }

  console.log('Contract deployed to', result.options.address);
})();

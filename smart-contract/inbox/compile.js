// Build a dir path from current dir to Inbox.sol file
// It's for cross platform compatibility
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// source code and number of contracts to be compiled
module.exports = solc.compile(source, 1).contracts[':Inbox'];

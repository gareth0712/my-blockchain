const crypto = require('crypto');

// spread operator allows putting the unknown number of input into an array
const cryptoHash = (...inputs) => {
  hash = crypto.createHash('sha256');
  // hash object contains an update method that takes string to gen hash values within the object itself.
  hash.update(inputs.sort().join(' '));
  // digest: Term in cryptography that represents the result => we want it in hex form
  // from 256 bits of binary code to 64 hex code
  return hash.digest('hex');
};

module.exports = cryptoHash;

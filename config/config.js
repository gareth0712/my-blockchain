const cryptoHash = require('../util/cryptoHash');
const INITIAL_DIFFICULTY = 1;

const timestamp = 1;
const difficulty = INITIAL_DIFFICULTY;
const lastHash = '0'.repeat(64);
const nonce = 0;
const data = 'Genesis Block';
const hash = cryptoHash(difficulty, timestamp, lastHash, data, nonce);

const GENESIS_DATA = {
  timestamp,
  lastHash,
  hash,
  data,
  difficulty,
  nonce,
};

module.exports = {
  GENESIS_DATA,
};

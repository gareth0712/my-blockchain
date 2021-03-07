const { GENESIS_DATA } = require('./config/config');
const cryptoHash = require('./util/cryptoHash');

class Block {
  constructor({ timestamp, lastHash, hash, data, difficulty, nonce }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const { hash: lastHash, difficulty } = lastBlock;

    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(difficulty, lastHash, timestamp, data, nonce);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      lastHash,
      timestamp,
      data,
      hash,
      difficulty,
      nonce,
    });
  }
}

module.exports = Block;

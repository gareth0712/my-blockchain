const Block = require('../Block');
const cryptoHash = require('../util/cryptoHash');
const { GENESIS_DATA } = require('../config/config');

describe('Block', () => {
  const timestamp = Date().now;
  const lastHash = '00000000';
  const hash = 'bar-hash';
  const nonce = 1;
  const difficulty = 1;
  const data = ['blockchain', 'data'];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
  });

  it('has a timestamp, lastHash, hash, nonce, difficulty and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
  });

  describe('Genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      // Use 'toBe' method to test for true/false
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toEqual(true);
    });

    it('returns the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be the `hash` of the last Block', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('sets a `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('creates a SHA-256 `hash` based on the proper inputs', () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.nonce,
          minedBlock.difficulty,
          lastBlock.hash,
          data
        )
      );
    });

    it('sets a `hash` that matches the difficulty criteria', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty)
      );
    });
  });
});

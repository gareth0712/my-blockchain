const Block = require('../Block');

describe('Block', () => {
  const timestamp = new Date();
  const lastHash = '00000000';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];
  const block = new Block(timestamp, lastHash, hash, data);

  it('has a timestamp, lastHash, hash, and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});

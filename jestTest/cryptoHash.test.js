const cryptoHash = require('../util/cryptoHash');

describe('cryptoHash()', () => {
  const hash =
    'cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90';

  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('testing')).toEqual(hash);
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(
      cryptoHash('three', 'one', 'two')
    );
  });
});

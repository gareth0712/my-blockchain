import json
import datetime
import hashlib

# Part 1 - Building a Blockchain

class Blockchain:
  # Genesis block
  def __init__(self):
    self.chain = []
    # Each block has their own PoW and we assign arbitrary no. for Genesis block; prev_hash stores SHA256, so it's stored in String
    self.create_block(proof = 1, prev_hash = '0')

  def create_block(self, proof, prev_hash):
    # Proof we get after solving the proof of work
    block = {'index': len(self.chain) + 1, 
             'timestamp': str(datetime.datetime.now()), 
             'proof': proof, 
             'prev_hash': prev_hash}
    block.update({'hash': self.hash(block)})
    self.chain.append(block)
    return block

  def get_last_block(self):
    return self.chain[-1]

  # PoW: hash with 4 leading zeros
  # PoW defines the problem to solve and also solves the problem
  # The principle of PoW is Hard to find (to retain the value) but easy to verify (for other miners to verify)
  def proof_of_work(self, prev_proof):
    # Solve the problem by Trial and error approach starting at 1
    new_proof = 1
    check_proof = False
    while check_proof is False:
      check_proof = self.is_proof_valid(new_proof, prev_proof)
      if not check_proof:
        new_proof += 1
    return new_proof

  def is_proof_valid(self, proof, prev_proof):
    encoded_proof = str(proof**2 - prev_proof**2).encode()
    hash_operation = hashlib.sha256(encoded_proof).hexdigest()
    # Verify
    if hash_operation[:4] == '0000':
      return True
    return False

  # Hash a block of the blockchain
  def hash(self, block):
    block_without_hash = block.copy()
    if 'hash' in block_without_hash:
      block_without_hash.pop('hash')
    # Make a block a string so that it will be ready to be hashed
    encoded_block = json.dumps(block_without_hash, sort_keys = True).encode()
    return hashlib.sha256(encoded_block).hexdigest()

  def is_chain_valid(self, chain):
    prev_block = chain[0]
    block_index = 1
    while block_index < len(chain):
      block = chain[block_index]
      # 1. prev_hash of each block is equal to the hash of prev block
      if block['prev_hash'] != self.hash(prev_block):
        print(block['prev_hash'])
        print('not equal')
        return False
      # 2. proof of each block is valid
      prev_proof = prev_block['proof']
      proof = block['proof']
      if not self.is_proof_valid(proof, prev_proof):
        return False
      prev_block = block
      block_index += 1
    return True
import json
from flask import Flask, jsonify
from blockchain import Blockchain

app = Flask(__name__)

blockchain = Blockchain()

@app.route('/api/v1/', methods = ['GET'])
def init():
  return 'Welcome to my blockchain project'

@app.route('/api/v1/mine_block', methods = ['GET'])
def mine_block():
  prev_block = blockchain.get_last_block()
  prev_proof = prev_block['proof']
  proof = blockchain.proof_of_work(prev_proof)
  prev_hash = blockchain.hash(prev_block)
  block = blockchain.create_block(proof, prev_hash)
  response = { 'message': 'Congratulations, you just mined a new block!',
               'index': block['index'],
               'timestamp': block['timestamp'],
               'proof': block['proof'],
               'prev_hash': block['prev_hash'],
               'success': True }
  return jsonify(response), 200

@app.route('/api/v1/get_chain', methods = ['GET'])
def get_chain():
  response = { 'chain': blockchain.chain,
               'length': len(blockchain.chain),
               'success': True }
  return jsonify(response), 200

@app.route('/api/v1/is_valid', methods = ['GET'])
def is_valid():
  is_valid = blockchain.is_chain_valid(blockchain.chain)
  response = { 'message': f"The current blockchain {'is' if is_valid else 'is not'} valid",
               'success': True }
  return jsonify(response), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080, debug=True)
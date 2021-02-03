# my-blockchain

Create my own blockchain, cryptocurrency and smart contract

# Prerequisuites

You only need to have Docker installed if you choose to use Docker to run this project
Otherwise, you should install the following:

- You have Python v3.6 or above installed
  For Linux user
- Make sure you have run `sudo apt install python3-venv` before start

# Build Procedures (Not using Docker)

1. Create virtual environment

```
python -m venv venv
```

2. Activate virtual environment

Windows

```
activate-windows.bat
```

Mac / Linux

```
source venv/bin/activate
```

3. Install dependencies

```
pip install -r requirements.txt
```

4. Run app.py (depends on how you call Python3, in my case it is 'python'. For Mac/Linux, it is usually 'python3')

```
python app.py
```

Finally, when you are done, you can quit the server by pressing `Ctrl + C` and run `deactivate`

# API Reference

GET `/api/v1/`

- Test connection to server

GET `/api/v1/mine_block`

- Mine a block; When one successfully mines a block, the block will be added to chain

GET `/api/v1/get_chain`

- Get the whole blockchain. So that one can verify whether the mined block is added to chain

GET `/api/v1/is_valid`

- Check if the blockchain is valid with the two principles:

1. prev_hash property of each block is equal to the calculated SHA256 hash of previous block
2. proof property of each block is valid in the sense that it can be verified hashing it with my hashing algorithm to a hash with 4 leading zeros

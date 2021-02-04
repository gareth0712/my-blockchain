# my-blockchain

Create my own blockchain, cryptocurrency and smart contract

# Upcoming Development Roadmap

v2: Run the application in distributed nodes - Hopefully finished by end of March
v3: Create cryptocurrency - Hopefully finished by end of April
v4: Create smart contract - Hopefully finished by end of June

# Prerequisuites

You only need to have Docker installed if you choose to use Docker to run this project
Otherwise, you should install the following:

- You have Python v3.6 or above installed
  For Linux user
- Make sure you have run `sudo apt install python3-venv` before start

# Build Procedures (Not using Docker)

1. Create virtual environment

```
$ python -m venv venv
```

2. Activate virtual environment

Windows

```
$ activate-windows.bat
```

Mac / Linux

```
$ source venv/bin/activate
```

3. Install dependencies

```
$ pip install -r requirements.txt
```

4. Run app.py (depends on how you call Python3, in my case it is 'python'. For Mac/Linux, it is usually 'python3')

```
$ python app.py
```

5. Visit http://localhost:8080/api/v1/

Finally, when you are done, you can quit the server by pressing `Ctrl + C` and run `deactivate`

# Running in Docker

1. Build the image

Windows

```
$ docker-build.bat
```

Mac / Linux

```
$ ./docker-build.sh
```

2. Start the container

```
$ docker-compose up -d
```

3. Stop the container

```
$ docker-compose stop my-blockchain
Stopping my-blockchain_my-blockchain_1 ... done
$ docker-compose rm my-blockchain
Going to remove my-blockchain_my-blockchain_1
Are you sure? [yN] y
Removing my-blockchain_my-blockchain_1 ... done
```

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

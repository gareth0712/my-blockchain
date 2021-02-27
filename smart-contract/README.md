# Prerequisuites

You need to have the following installed:

1. Node (recommended to be latest version)
2. Yarn
3. Metamask on your Browser

# Procedures for running React Lottery application

1. `cd react-lottery` to go to React directory
2. `yarn install` to install dependencies
3. `yarn start` to start the React application
4. Open a browser with Metamask installed
5. Visit http://localhost:3000/
6. Metamask will ask you whether grant permission for it to connect to the React Lottery application, click "connect"
7. Play with the React Lottery application

Finally, when you are done, you can quit the server by pressing `Ctrl + C` and type `y` and press enter

# Procedures for deploying Lottery contract

MUST READ CAUTION: To avoid loss of any real cryptocurrency in your Metamask account, you must create a completely new Metamask account to deploy the Lottery contract in the Ropsten Test network. Since this project is still on development stage, there is no guarantee on security as I am still in stage of learning. If you insist on using your Metamask account with real cryptocurrency stored, I am not responsible for any loss of real cryptocurrency in Ethereum Mainnet as a result of using this application.

1. In "smart-contract" directory, go to "config" directory and put your Metamask mnemonic phrases in "config.env" and save the file
2. `cd ..` to go back to "smart-contract" directory
3. Run `npm run deploy` to deploy the updated lottery contract with your own account. Ensure that there is sufficient amount of Ether in your Ropsten network Ether wallet before you deploy the contract or it will fail.

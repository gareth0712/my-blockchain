import React, { useState, useEffect } from 'react';
import web3 from './web3';
import './App.css';
import lottery from './lottery';

const App = () => {
  const [manager, setManager] = useState('');
  const [value, setValue] = useState(''); // String since the input of user is always String
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(''); // The balance is init as empty String due to the result returned from web3.eth.getBalance is not a number
  const [message, setMessage] = useState(''); // The balance is init as empty String due to the result returned from web3.eth.getBalance is not a number

  const onSubmit = async (event) => {
    // We do not want the event submit works like the traditional html way
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    });

    setMessage('You have entered the lottery!');
    getStates();
  };

  const getStates = async () => {
    // .call() instead of .call({ from: accounts[0] }) because upon the declaration of lottery contract variable,
    //  lottery comes from the web3. The web3 makes use of the Metamask provider and there is default account set in
    // Metamask. And it is the first account that we signed in
    const theManager = await lottery.methods.manager().call();
    setManager(theManager);
    const thePlayers = await lottery.methods.getPlayers().call();
    setPlayers(thePlayers);
    // theBalance is actually an object: a number wrapped in a library "bignumber.js" since it will return the number in Wei
    const theBalance = await web3.eth.getBalance(lottery.options.address);
    setBalance(theBalance);
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage('A winner has been picked');
    getStates();
  };

  useEffect(() => {
    getStates();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}
        There are currently {players.length} people competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
};

export default App;

import React, { Component } from 'react';
import Contract from './contracts/Election.json';
import getWeb3 from './getWeb3';
import Manager from './components/Manager.js';

import './App.css';

class App extends Component {
  state = { web3: null, accounts: null, contract: null, candidateList: null };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Contract.networks[networkId];
      const instance = new web3.eth.Contract(
        Contract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  /*
  runExample = async () => {
    const { accounts, contract } = this.state;

    // Add 1+1
    var x = await contract.methods.get().call({ from: accounts[0] });
    console.log('App -> x', x);
    await contract.methods.set(5).send({ from: accounts[0] });

    // set 5
    x = await contract.methods.get().call({ from: accounts[0] });
    console.log('App -> x', x);
  };
  */

  addCandidate = async (address, name) => {
    const { accounts, contract } = this.state;
    await contract.methods
      .addCandidate(address, name)
      .send({ from: accounts[0] });
    console.log('New candidate added');
  };

  startElection = async () => {
    const { accounts, contract } = this.state;
  };

  vote = async (address) => {
    const { accounts, contract } = this.state;
  };

  getWinner = async () => {
    const { accounts, contract } = this.state;
  };

  getCandidate = async () => {
    const { accounts, contract, candidateList } = this.state;
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <main>
        <div className="vote">vote part</div>
        <Manager
          addCandidate={this.addCandidate}
          accounts={this.state.accounts}
        />
      </main>
    );
  }
}

export default App;

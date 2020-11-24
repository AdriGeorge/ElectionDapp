import React, { Component } from 'react';
import Contract from './contracts/Election.json';
import getWeb3 from './getWeb3';
import Manager from './components/Manager.js';
import Candidate from './components/Candidate.js';

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

  addCandidate = async (address, name) => {
    // const { accounts, contract } = this.state;
    // await contract.methods
    //   .addCandidate(address, name)
    //   .send({ from: accounts[0] });
    // console.log('New candidate added');
    console.log(address + ': ' + name);
  };

  startElection = async () => {
    console.log('clicked startElection');
    // const { accounts, contract } = this.state;
  };

  vote = async (address) => {
    const { accounts, contract } = this.state;
  };

  getWinner = async () => {
    console.log('clicked getWinner');
    // const { accounts, contract } = this.state;
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
        <Candidate />
        <Manager
          addCandidate={this.addCandidate}
          start={this.startElection}
          getWinner={this.getWinner}
          accounts={this.state.accounts}
        />
      </main>
    );
  }
}

export default App;

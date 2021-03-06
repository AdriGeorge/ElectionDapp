import React, { Component } from 'react';
import Contract from './contracts/Election.json';
import getWeb3 from './getWeb3';
import Manager from './components/Manager.js';
import Candidate from './components/Candidate.js';

import './App.css';

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    candidateList: [],
    winner: null,
    start: false,
    close: false,
  };
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
      this.setState({ web3, accounts, contract: instance }, this.getCandidate);

      const start = await this.state.contract.methods
        .getStart()
        .call({ from: accounts[0] });
      this.setState({ start: start });

      const close = await this.state.contract.methods
        .getClose()
        .call({ from: accounts[0] });
      this.setState({ close: close });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  addCandidate = async (address, name) => {
    const { accounts, contract } = this.state;
    await contract.methods
      .addCandidate(address, name)
      .send({ from: accounts[0], gas: 1000000 });
    this.getCandidate();
  };

  startElection = async () => {
    if (this.state.start) return;
    const { accounts, contract } = this.state;
    await contract.methods.startElection().send({ from: accounts[0] });
    const result = await contract.methods
      .getStart()
      .call({ from: accounts[0] });
    this.setState({ start: result });
  };

  vote = async (address) => {
    const { accounts, contract } = this.state;
    await contract.methods.vote(address).send({ from: accounts[0] });
    this.getCandidate();
  };

  getWinner = async () => {
    const { accounts, contract } = this.state;
    const result = await contract.methods
      .getWinner()
      .send({ from: accounts[0] });
    const close = await contract.methods.getClose().call({ from: accounts[0] });
    this.setState({ winner: result.events.Winner.returnValues });
    this.setState({ close: close });
  };

  getCandidate = async () => {
    const { accounts, contract } = this.state;
    var candidateLength = await contract.methods
      .getLength()
      .call({ from: accounts[0] });
    var arrayOfCandidate = [];
    for (var i = 0; i < candidateLength; i++) {
      var result = await contract.methods
        .getCandidateInfo(i)
        .call({ from: accounts[0] });
      arrayOfCandidate = [...arrayOfCandidate, result];
    }
    this.setState({ candidateList: arrayOfCandidate });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <main>
        <Candidate
          candidates={this.state.candidateList}
          voteButton={this.vote}
          start={this.state.start}
          close={this.state.close}
        />
        <Manager
          addCandidate={this.addCandidate}
          startElection={this.startElection}
          getWinner={this.getWinner}
          accounts={this.state.accounts}
          start={this.state.start}
          winner={this.state.winner}
        />
        <div className="winner">
          {this.state.winner ? (
            <div className="winner-info">
              <h3>The winner is: {this.state.winner[1]}</h3>
              <h4>{this.state.winner[0]}</h4>
              <p>with {this.state.winner[2]} votes</p>
            </div>
          ) : (
            <h3>Still in game</h3>
          )}
        </div>
      </main>
    );
  }
}

export default App;

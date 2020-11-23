import React from 'react';

const Manager = ({ addCandidate, accounts }) => {
  console.log(accounts[0]);
  return (
    <div className="manager">
      <h4>ciao manager</h4>
      <button onClick={() => addCandidate(accounts[1], 'Secondo')}>
        Clcik to add
      </button>
    </div>
  );
};

export default Manager;

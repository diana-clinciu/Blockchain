import ContractArtifact from "../artifacts/contracts/Vot.sol/Vot.json";
import React, { useState, useEffect } from 'react';

const ethers = require('ethers');

const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const provider = new ethers.BrowserProvider(window.ethereum);
const abi = ContractArtifact.abi;

export const Vot = () => {
  const [voterName1, setVoterName1] = useState('');
  const [voterName2, setVoterName2] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);


  const registerVoter = async () => {
    try {
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.connect(signer).inscrieAlegator(voterName1);
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
      setVoterName1('');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.reason);
      console.error(error);
    }
  };

  const giveVotingRights = async () => {
    try {
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.connect(signer).daDreptVot(voterName2);
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
      setVoterName2('');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.reason);
      console.error(error);
    }
  };

  const vote = async () => {
    try {
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.connect(signer).voteaza(candidateName);
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
      setCandidateName('');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.reason);
      console.error(error);
    }
  };

  return (
    <div className="container">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <label>1. Inscrie-te ca alegator</label>
      <input
        type="text"
        placeholder="Nume alegator"
        value={voterName1}
        onChange={(e) => setVoterName1(e.target.value)}
      />
      <button onClick={() => registerVoter()}>Trimite</button>

      <br />

      <label>2. Da drept de vot <small>(numai organizatorul are acest drept)</small></label>
      <input
        type="text"
        placeholder="Nume alegator"
        value={voterName2}
        onChange={(e) => setVoterName2(e.target.value)}
      />
      <button onClick={() => giveVotingRights()}>Trimite</button>

      <br />

      <label>3. Voteaza</label>
      <input
        type="text"
        placeholder="Nume candidat"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <button onClick={() => vote()}>Trimite</button>
    </div >
  );
};

export default Vot;

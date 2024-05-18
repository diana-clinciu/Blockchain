import ContractArtifact from "../artifacts/contracts/Candidat.sol/Candidat.json";
import React, { useState, useEffect } from 'react';

const ethers = require('ethers');

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
const provider = new ethers.BrowserProvider(window.ethereum);
const abi = ContractArtifact.abi;

export const Candidat = () => {
  const [candidateName1, setCandidateName1] = useState('');
  const [candidateName2, setCandidateName2] = useState('');
  const [winnerName, setWinnerName] = useState('');
  const [candidateVotes, setCandidateVotes] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const registerCandidate = async () => {
    try {
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.connect(signer).inscrieCandidat(candidateName1, { value: 100 });
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
      setCandidateName1('');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.reason);
      console.error(error);
    }
  };

  const getCandidateVotes = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const votes = await contract.getNumarVoturi(candidateName2);
      setCandidateVotes(votes.toString());
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.reason);
      console.error(error);
    }
  };

  const getWinner = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const winnerName = await contract.calculeazaCastigator();
      setWinnerName(winnerName);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.reason);
      console.error(error);
    }
  };

  return (
    <div className="container">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <label>Candideaza</label>
      <input
        type="text"
        placeholder="Nume candidat"
        value={candidateName1}
        onChange={(e) => setCandidateName1(e.target.value)}
      />
      <button onClick={() => registerCandidate()}>Trimite</button>

      <br />

      <label>Vezi numar voturi candidat</label>
      <input
        type="text"
        placeholder="Nume candidat"
        value={candidateName2}
        onChange={(e) => setCandidateName2(e.target.value)}
      />
      <button onClick={() => getCandidateVotes()}>
        Trimite
      </button>
      {candidateVotes && <p>Numar Voturi: {candidateVotes}</p>}

      <br/>

      <button onClick={() => getWinner()}>
        Afla Castigator
      </button>
      {winnerName && <p>Castigator: {winnerName}!! 🥳</p>}
    </div>
  );
};

export default Candidat;

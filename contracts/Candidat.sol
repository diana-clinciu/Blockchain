// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Candidat {

    // Structură pentru a stoca datele candidatului
    struct CandidatInfo {
        string nume;
        uint256 numarVoturi;
    }

    // Maparea numelor candidaților la datele lor
    mapping(string => CandidatInfo) public candidati;

    // Eveniment pentru a notifica creșterea numărului de voturi pentru un candidat
    event VotInregistrat(string numeCandidat, uint256 numarVoturi);

    // Funcție pentru a adăuga un candidat
    function adaugaCandidat(string memory _nume) public {
        candidati[_nume] = CandidatInfo({nume: _nume, numarVoturi: 0});
    }

    // Funcție pentru a incrementa numărul de voturi pentru un candidat
    function voteazaPentru(string memory _numeCandidat) public {
        candidati[_numeCandidat].numarVoturi++;
        emit VotInregistrat(_numeCandidat, candidati[_numeCandidat].numarVoturi);
    }

    // Funcție de vizualizare pentru a obține numărul de voturi pentru un candidat
    function numarVoturi(string memory _numeCandidat) public view returns (uint256) {
        return candidati[_numeCandidat].numarVoturi;
    }
}
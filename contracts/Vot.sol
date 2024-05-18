// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "./Candidat.sol";
import "./JetonERC20.sol";

contract Vot {

  struct Alegator {
    address adresa;
    bool aVotat;
  }

  mapping(address => Alegator) alegatori;
  mapping(string => address) adreseAlegatori;

  address ownerAddress;
  JetonERC20 jeton;
  Candidat candidat;

  constructor(address _ownerAddress, address _contractCandidat, address _jetonContract) {
    ownerAddress =_ownerAddress;
    candidat = Candidat(_contractCandidat);
    jeton = JetonERC20(_jetonContract);
  }

  event aVotatCandidatul(address alegator, string candidat);

  modifier nuAvotat(address _adresa) {
    require(!alegatori[_adresa].aVotat, "Ai votat deja");
    _;
  }

  function getOwner() public view returns (address) {
        return ownerAddress;
    }

  function inscrieAlegator(string memory nume) external {
    require(adreseAlegatori[nume] == address(0), "Te-ai inscris deja ca alegator!");
    require(alegatori[msg.sender].adresa == address(0), "Te-ai inscris deja ca alegator!");

    alegatori[msg.sender] = Alegator({adresa: msg.sender, aVotat: false});
    adreseAlegatori[nume] = msg.sender;
  }

  function daDreptVot(string memory nume) external {
    require(msg.sender == ownerAddress, "Nu aveti voie sa dati drept de vot");
    jeton.transfer(adreseAlegatori[nume], 1);
  }

  function voteaza(string memory  _numeCandidat) external nuAvotat(msg.sender) {
        require(alegatori[msg.sender].adresa != address(0), "Nu esti inscris ca alegator!");

        candidat.incrementeazaVoturi(_numeCandidat);
        alegatori[msg.sender].aVotat = true;

        jeton.transfer(ownerAddress, 1);

        emit aVotatCandidatul(msg.sender, _numeCandidat);
    }

  function aVotat(address _adresa) public view returns (bool) {
    return alegatori[_adresa].aVotat;
  }
}
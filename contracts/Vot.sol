// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Vot {

  // Structură pentru a stoca datele alegătorilor
  struct Alegator {
    address adresa;
    bool aVotat;
  }

  // Maparea alegătorilor la datele lor
  mapping(address => Alegator) public alegatori;

  // Eveniment pentru a notifica emiterea unui buletin de vot
  event BuletinDeVotEmis(address alegator, uint256 candidat);

  // Modificator pentru a verifica dacă alegătorul nu a votat deja
  modifier nuAvotat(address _adresa) {
    require(!alegatori[_adresa].aVotat, "Ai votat deja");
    _;
  }

  // Variabilă pentru taxa de vot
  uint256 public taxaVot;

  // Adresa pentru plata taxei de vot
  address public adresaPlata;

  // Constructor pentru a seta taxa inițială și adresa de plată (numai proprietar)
  constructor(uint256 _taxaVot, address _adresaPlata) {
    taxaVot = _taxaVot;
    adresaPlata = _adresaPlata;
  }

  // Funcție pentru înregistrarea unui alegător
  function inregistreazaAlegator() public {
    alegatori[msg.sender] = Alegator({adresa: msg.sender, aVotat: false});
  }

  // Funcție pentru a emite un buletin de vot
  function voteaza(uint256 _candidat) public nuAvotat(msg.sender) payable {
    require(msg.value >= taxaVot, "Fonduri insuficiente pentru vot");
    alegatori[msg.sender].aVotat = true;
    emit BuletinDeVotEmis(msg.sender, _candidat);
    // Transferă taxa către adresa de plată
    payable(adresaPlata).transfer(taxaVot);
  }

  // Funcție de vizualizare pentru a verifica dacă un alegător a votat
  function aVotat(address _adresa) public view returns (bool) {
    return alegatori[_adresa].aVotat;
  }

}
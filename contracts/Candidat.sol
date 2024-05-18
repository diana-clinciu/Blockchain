// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Candidat {

    struct _Candidat {
        address adresa;
        string nume;
        uint256 numarVoturi;
    }

    mapping(address => _Candidat) candidati;
    mapping(string => address) adreseCandidati;

    address ownerAddress;
    uint256 taxaParticipare;
    address[] adrese;

    constructor(address _ownerAddress, uint256 _taxaParticipare) {
        ownerAddress = _ownerAddress;
        taxaParticipare = _taxaParticipare;
    }

    function incrementeazaVoturi(string memory _nume) public {
        candidati[adreseCandidati[_nume]].numarVoturi++;
    }

    function getOwner() public view returns (address) {
        return ownerAddress;
    }

    function inscrieCandidat(string memory _nume) public payable {
        require(adreseCandidati[_nume] == address(0), "Exista un candidat cu acest nume!");
        require(candidati[msg.sender].adresa == address(0), "Sunteti deja inscris ca si candidat!");
        require(msg.value >= taxaParticipare, "Fonduri insuficiente!");

        candidati[msg.sender] = _Candidat({
            adresa: msg.sender,
            nume: _nume,
            numarVoturi: 0
        });
        adreseCandidati[_nume] = msg.sender;
        adrese.push(msg.sender);

        payable(ownerAddress).transfer(taxaParticipare);
    }

    function getNumarVoturi(string memory _numeCandidat) public view returns (uint256) {
        return candidati[adreseCandidati[_numeCandidat]].numarVoturi;
    }
    
    function calculeazaCastigator() external view returns (string memory){
        uint256 n = adrese.length;
        uint256 maxi = 0;
        string memory castigator = "";

        for(uint256 i=0;i < n;i++){
            if(maxi < candidati[adrese[i]].numarVoturi){
                maxi = candidati[adrese[i]].numarVoturi;
                castigator = candidati[adrese[i]].nume;
            }
        }

        return castigator;
    }
    
}

require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function interact() {
    [owner, user1, user2] = await ethers.getSigners()

    let deployedCandidatAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"
    let candidat = await ethers.getContractAt("Candidat", deployedCandidatAddress)

    // Call some methods from the token
    let owner_address = await candidat.getOwner()
    console.log("owner address: ", owner_address)


    // creaza un candidat
    // let overwrite = {
    //     value : 1,
    // }

    // let c = await candidat.connect(owner).inscrieCandidat("dddd", overwrite);
    // await c.wait();
    
    // voteaza
    let deployedVotAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"
    let vot = await ethers.getContractAt("Vot", deployedVotAddress)

    // let v = await vot.connect(user1).inscrieAlegator("diana");
    // await v.wait();

    // v = await vot.connect(owner).daDreptVot("diana");
    // await v.wait();

    // v = await vot.connect(user1).voteaza("dddd");
    // await v.wait();

    let nrVoturi = await candidat.getNumarVoturi("dddd");
    console.log(nrVoturi);

    let winner = await candidat.calculeazaCastigator();
    console.log(winner);
}

interact()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
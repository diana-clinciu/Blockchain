require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function deploy() {
    [owner] = await ethers.getSigners();

    let candidatFactory = await ethers.getContractFactory("Candidat");
    let candidat = await candidatFactory.connect(owner).deploy(owner.address, 1);
    await candidat.deployed();
    console.log("Candidat address: ", candidat.address)

    let jetonFactory = await ethers.getContractFactory("JetonERC20");
    let jeton = await jetonFactory.connect(owner).deploy(1e8);
    await jeton.deployed();
    console.log("Jeton address: ", jeton.address)

    let votFactory = await ethers.getContractFactory("Vot");
    let vot = await votFactory.connect(owner).deploy(owner.address, candidat.address, jeton.address);
    await vot.deployed();
    console.log("Vot address: ", vot.address)
}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
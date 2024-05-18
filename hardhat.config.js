require('@nomiclabs/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      gas: "auto",
      mining: {
        interval: 2000, //ms
      }
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [
        "42578096346d8f1a10f7cf1609bad4f83d9f09d9ae44975e8f87e90243a5551d",
        "9ded8146cd866920d6fa22991d02c18071b4f66db86c9ecd92cdd4324676385f",
     ]
    }
  },
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: '0.8.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000
          }
        }
      }
    ]
  }
};
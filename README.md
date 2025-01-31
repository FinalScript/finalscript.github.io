# MinerVerse

MinerVerse is a blockchain-based Web3 game that combines the excitement of NFT collectibles with the addictive mechanics of cookie-clicker style mining. Players can mint unique NFT minersaza using ETH and engage in real-time mining activities, all while leveraging the power of blockchain technology.

## Demo

Check out a live demo of MinerVerse [here](https://minerverse.vercel.app/).

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [License](#license)

## Features

- **NFT Miners:** Mint unique NFT miners using ETH to start your mining journey.
- **MetaMask Integration:** Seamlessly connect your MetaMask wallet to manage your assets and transactions.
- **Real-Time Mining Mechanics:** Engage in a dynamic mining experience with real-time updates and rewards.
- **Smart Contracts:** Secure and transparent transactions powered by Ethereum smart contracts.
- **Interactive UI:** User-friendly interface designed for an engaging gaming experience.
- **Leaderboard:** Compete with other miners and climb the leaderboard based on your mining efficiency.

## Technology Stack

- **Frontend:** React.js, Redux, Web3.js
- **Backend:** Node.js, Express.js
- **Blockchain:** Ethereum, Solidity
- **Smart Contracts:** Hardhat, Ethers.js
- **Database:** MongoDB
- **Wallet Integration:** MetaMask
- **Deployment:** AWS, IPFS

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **MetaMask** wallet installed in your browser
- **Ethereum Testnet** (e.g., Ropsten) for development

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/FinalScript/minerverse.git
   cd minerverse
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_INFURA_PROJECT_ID=your_infura_project_id
   REACT_APP_CONTRACT_ADDRESS=your_smart_contract_address
   PRIVATE_KEY=your_wallet_private_key
   ```

4. **Deploy Smart Contracts**

   Ensure you have configured your Ethereum testnet in Hardhat.

   ```bash
   npx hardhat run scripts/deploy.js --network ropsten
   ```

   Update the `REACT_APP_CONTRACT_ADDRESS` in your `.env` file with the deployed contract address.

### Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. **Connect MetaMask:** Click on the "Connect Wallet" button and authorize the connection with your MetaMask wallet.
2. **Mint a Miner:** Navigate to the "Mint" section, choose your desired miner, and confirm the transaction to mint your unique NFT miner.
3. **Start Mining:** Once minted, your miner will start generating rewards in real-time. Click on the "Mine" button to collect your earnings.
4. **Upgrade Miners:** Use your earnings to upgrade your miners, increasing your mining efficiency and rewards.
5. **Compete on Leaderboard:** Check the leaderboard to see how you rank against other miners and strive to be the top miner in MinerVerse.

## Smart Contracts

MinerVerse utilizes Ethereum smart contracts to manage NFT minting, transactions, and game mechanics.

- **Contract Address:** `0xYourContractAddress`
- **ABI:** Available in the `artifacts` directory.
- **Development:** Built with Solidity and deployed using Hardhat.

### Interacting with Smart Contracts

You can interact with the smart contracts using Web3.js or Ethers.js within the frontend application. Ensure that your MetaMask wallet is connected to the correct Ethereum network.

## License

This project is licensed under the [MIT License](LICENSE).

© 2025 MinerVerse. All rights reserved.

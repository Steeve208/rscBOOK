# RSC Chain Guides

## Overview

This section provides step-by-step guides and detailed tutorials for using RSC Chain. From initial setup to advanced application development, these guides will help you make the most of the platform.

## Quick Start Guides

### Initial Setup

#### RSC Chain Installation

```bash
# 1. Verify system requirements
rustc --version  # Must be 1.70+
cargo --version  # Must be included with Rust

# 2. Clone the repository
git clone https://github.com/rsc-chain/rsc-chain.git
cd rsc-chain

# 3. Compile the project
cargo build --release

# 4. Verify installation
./target/release/rsc-node --version
```

#### Environment Configuration

```bash
# 1. Create configuration file
cp config/default.yaml config/local.yaml

# 2. Edit local configuration
nano config/local.yaml

# Basic configuration:
network:
  name: "local"
  port: 8545
  rpc_port: 8546
  ws_port: 8547

database:
  path: "./data"
  max_size: "10GB"

consensus:
  algorithm: "hybrid"
  block_time: 15
  difficulty_adjustment: true

# 3. Create data directory
mkdir -p data
```

#### Run Local Node

```bash
# 1. Start node in development mode
./target/release/rsc-node --config config/local.yaml --dev

# 2. Verify that the node is running
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"rsc_blockNumber","params":[],"id":1}' \
  http://localhost:8546

# Expected response:
# {"jsonrpc":"2.0","result":"0x0","id":1}
```

### Create Your First Wallet

#### Using the CLI

```bash
# 1. Create new wallet
./target/release/rsc-cli wallet create

# Output:
# Wallet created successfully
# Address: 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
# Private key: 0x1234567890abcdef...
# Mnemonic phrase: word1 word2 word3 ...

# 2. Check balance
./target/release/rsc-cli wallet balance 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6

# 3. Get test tokens (testnet only)
./target/release/rsc-cli faucet request 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
```

#### Using the JavaScript SDK

```javascript
// 1. Install SDK
npm install @rsc-chain/sdk

// 2. Create wallet
import { RSCChain } from '@rsc-chain/sdk';

const rsc = new RSCChain({
    endpoint: 'http://localhost:8546',
    network: 'local'
});

// Create wallet
const wallet = await rsc.wallet.create();
console.log('Wallet created:', wallet.address);

// Get balance
const balance = await rsc.wallet.getBalance(wallet.address);
console.log('Balance:', balance.toString());

// Export wallet
const privateKey = wallet.exportPrivateKey();
const mnemonic = wallet.exportMnemonic();
console.log('Private key:', privateKey);
console.log('Mnemonic phrase:', mnemonic);
```

### Send Your First Transaction

#### Basic Transaction

```javascript
// 1. Create transaction
const transaction = await rsc.transactions.create({
    from: wallet.address,
    to: '0x1234567890123456789012345678901234567890',
    value: '1000000000000000000', // 1 RSC
    gas: '21000'
});

console.log('Transaction created:', transaction.hash);

// 2. Wait for confirmation
const receipt = await rsc.transactions.waitForConfirmation(transaction.hash);
console.log('Transaction confirmed:', receipt);

// 3. Verify on explorer
console.log(`View transaction: http://localhost:3000/tx/${transaction.hash}`);
```

#### Transaction with Data (Smart Contract)

```javascript
// 1. Create transaction with data
const contractAddress = '0x1234567890123456789012345678901234567890';
const functionSignature = 'transfer(address,uint256)';
const recipient = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
const amount = '1000000000000000000'; // 1 token

// Encode function data
const data = rsc.utils.encodeFunctionData(functionSignature, [recipient, amount]);

const transaction = await rsc.transactions.create({
    from: wallet.address,
    to: contractAddress,
    data: data,
    gas: '100000'
});

console.log('Smart contract transaction created:', transaction.hash);
```

## Development Guides

### Configure Development Environment

#### IDE Configuration

```json
// .vscode/settings.json
{
    "rust-analyzer.checkOnSave.command": "clippy",
    "rust-analyzer.cargo.buildScripts.enable": true,
    "rust-analyzer.procMacro.enable": true,
    "rust-analyzer.lens.enable": true,
    "rust-analyzer.lens.implementations.enable": true,
    "rust-analyzer.lens.references.adt.enable": true,
    "rust-analyzer.lens.references.trait.enable": true,
    "rust-analyzer.lens.references.enumVariant.enable": true,
    "rust-analyzer.lens.references.method.enable": true,
    "rust-analyzer.assist.emitMustUse": true,
    "rust-analyzer.assist.emitMustUseOrPanic": true,
    "rust-analyzer.assist.emitMustUseOrDrop": true,
    "files.associations": {
        "*.rs": "rust"
    },
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.organizeImports": true
    }
}
```

#### Git Hooks Configuration

```bash
# 1. Install pre-commit
pip install pre-commit

# 2. Create .pre-commit-config.yaml
cat > .pre-commit-config.yaml << EOF
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black

  - repo: local
    hooks:
      - id: rust-fmt
        name: rust-fmt
        entry: cargo fmt --check
        language: system
        types: [rust]
        pass_filenames: false

      - id: rust-clippy
        name: rust-clippy
        entry: cargo clippy --all-targets --all-features -- -D warnings
        language: system
        types: [rust]
        pass_filenames: false
EOF

# 3. Install hooks
pre-commit install
```

### Create Your First dApp

#### Project Structure

```bash
# 1. Create project structure
mkdir my-dapp
cd my-dapp

# 2. Initialize project
npm init -y

# 3. Install dependencies
npm install @rsc-chain/sdk ethers hardhat @openzeppelin/contracts

# 4. Configure Hardhat
npx hardhat init
```

#### Hardhat Configuration

```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    rsc_local: {
      url: "http://localhost:8546",
      accounts: ["0x1234567890abcdef..."], // Your private key
      chainId: 1337
    },
    rsc_testnet: {
      url: "https://testnet.rsc-chain.com",
      accounts: ["0x1234567890abcdef..."],
      chainId: 1337
    }
  }
};
```

#### Basic Smart Contract

```solidity
// contracts/SimpleToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) 
        ERC20(name, symbol) 
        Ownable(msg.sender) 
    {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
```

#### Deploy Contract

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // 1. Get contract
  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  
  // 2. Deploy contract
  const token = await SimpleToken.deploy("My Token", "MTK");
  await token.waitForDeployment();
  
  const address = await token.getAddress();
  console.log("Token deployed at:", address);
  
  // 3. Verify on explorer
  console.log(`View contract: http://localhost:3000/contract/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

```bash
# Deploy contract
npx hardhat run scripts/deploy.js --network rsc_local
```

#### Basic Frontend

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My dApp</title>
    <script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js"></script>
</head>
<body>
    <h1>My dApp on RSC Chain</h1>
    
    <div>
        <h2>Connect Wallet</h2>
        <button onclick="connectWallet()">Connect</button>
        <p id="wallet-address"></p>
    </div>
    
    <div>
        <h2>Token Balance</h2>
        <input type="text" id="token-address" placeholder="Token address">
        <button onclick="getBalance()">Get Balance</button>
        <p id="token-balance"></p>
    </div>
    
    <div>
        <h2>Transfer Tokens</h2>
        <input type="text" id="recipient" placeholder="Recipient address">
        <input type="number" id="amount" placeholder="Amount">
        <button onclick="transfer()">Transfer</button>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

```javascript
// app.js
let provider, signer, tokenContract;

async function connectWallet() {
    try {
        // Connect to MetaMask
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            const address = await signer.getAddress();
            document.getElementById('wallet-address').textContent = `Connected: ${address}`;
        } else {
            alert('Please install MetaMask');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

async function getBalance() {
    try {
        const tokenAddress = document.getElementById('token-address').value;
        if (!tokenAddress) {
            alert('Please enter the token address');
            return;
        }
        
        // Basic ABI for ERC20
        const abi = [
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function symbol() view returns (string)"
        ];
        
        tokenContract = new ethers.Contract(tokenAddress, abi, signer);
        
        const address = await signer.getAddress();
        const balance = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);
        document.getElementById('token-balance').textContent = 
            `Balance: ${formattedBalance} ${symbol}`;
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}

async function transfer() {
    try {
        const recipient = document.getElementById('recipient').value;
        const amount = document.getElementById('amount').value;
        
        if (!recipient || !amount) {
            alert('Please fill in all fields');
            return;
        }
        
        const decimals = await tokenContract.decimals();
        const amountWei = ethers.utils.parseUnits(amount, decimals);
        
        const tx = await tokenContract.transfer(recipient, amountWei);
        await tx.wait();
        
        alert('Transfer successful!');
        getBalance(); // Update balance
    } catch (error) {
        console.error('Error in transfer:', error);
        alert('Error in transfer: ' + error.message);
    }
}
```

### API Integration

#### Configure API Client

```javascript
// api-client.js
import { RSCChain } from '@rsc-chain/sdk';

class RSCAPIClient {
    constructor(config) {
        this.rsc = new RSCChain({
            endpoint: config.endpoint,
            apiKey: config.apiKey,
            network: config.network
        });
    }
    
    // Blockchain info
    async getBlockchainInfo() {
        return await this.rsc.blockchain.getInfo();
    }
    
    async getLatestBlock() {
        return await this.rsc.blockchain.getLatestBlock();
    }
    
    // Transactions
    async getTransaction(hash) {
        return await this.rsc.transactions.get(hash);
    }
    
    async sendTransaction(txData) {
        return await this.rsc.transactions.send(txData);
    }
    
    // Smart contracts
    async callContract(address, abi, method, params) {
        return await this.rsc.contracts.call(address, abi, method, params);
    }
    
    async deployContract(bytecode, abi, params) {
        return await this.rsc.contracts.deploy(bytecode, abi, params);
    }
    
    // Events
    async subscribeToEvents(eventType, callback) {
        return await this.rsc.events.subscribe(eventType, callback);
    }
}

export default RSCAPIClient;
```

#### Example API Usage

```javascript
// example-usage.js
import RSCAPIClient from './api-client.js';

const client = new RSCAPIClient({
    endpoint: 'https://api.rsc-chain.com',
    apiKey: 'your-api-key',
    network: 'mainnet'
});

// Get blockchain status
async function getBlockchainStatus() {
    try {
        const info = await client.getBlockchainInfo();
        console.log('Blockchain status:', info);
        
        const latestBlock = await client.getLatestBlock();
        console.log('Latest block:', latestBlock);
    } catch (error) {
        console.error('Error getting information:', error);
    }
}

// Send transaction
async function sendTransaction() {
    try {
        const tx = await client.sendTransaction({
            from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
            to: '0x1234567890123456789012345678901234567890',
            value: '1000000000000000000', // 1 RSC
            gas: '21000'
        });
        
        console.log('Transaction sent:', tx.hash);
        
        // Wait for confirmation
        const receipt = await client.waitForConfirmation(tx.hash);
        console.log('Transaction confirmed:', receipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

// Subscribe to events
async function subscribeToEvents() {
    try {
        const subscription = await client.subscribeToEvents('new_block', (block) => {
            console.log('New block:', block);
        });
        
        console.log('Subscription created:', subscription.id);
    } catch (error) {
        console.error('Error subscribing to events:', error);
    }
}

// Run examples
getBlockchainStatus();
sendTransaction();
subscribeToEvents();
```

## Advanced Guides

### Smart Contract Optimization

#### Gas Optimization

```solidity
// contracts/OptimizedToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OptimizedToken is ERC20 {
    // Use uint256 instead of uint for gas optimization
    uint256 private _totalSupply;
    
    // Pack variables into structs for gas optimization
    struct UserInfo {
        uint128 balance;
        uint128 lastUpdate;
    }
    
    mapping(address => UserInfo) private _userInfo;
    
    constructor(string memory name, string memory symbol) 
        ERC20(name, symbol) 
    {
        _totalSupply = 1000000 * 10 ** decimals();
        _userInfo[msg.sender] = UserInfo({
            balance: uint128(_totalSupply),
            lastUpdate: uint128(block.timestamp)
        });
    }
    
    // Optimized transfer function
    function transfer(address to, uint256 amount) 
        public 
        override 
        returns (bool) 
    {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        UserInfo storage fromInfo = _userInfo[msg.sender];
        UserInfo storage toInfo = _userInfo[to];
        
        require(fromInfo.balance >= amount, "Insufficient balance");
        
        // Update balances
        fromInfo.balance = uint128(fromInfo.balance - amount);
        toInfo.balance = uint128(toInfo.balance + amount);
        
        // Emit event
        emit Transfer(msg.sender, to, amount);
        
        return true;
    }
    
    // Optimized view function
    function balanceOf(address account) 
        public 
        view 
        override 
        returns (uint256) 
    {
        return _userInfo[account].balance;
    }
}
```

#### Security Best Practices

```solidity
// contracts/SecureToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SecureToken is ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }
    
    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, msg.sender), "Must have minter role");
        _;
    }
    
    modifier onlyPauser() {
        require(hasRole(PAUSER_ROLE, msg.sender), "Must have pauser role");
        _;
    }
    
    function mint(address to, uint256 amount) 
        public 
        onlyMinter 
        whenNotPaused 
    {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        _totalSupply += amount;
        _balances[to] += amount;
        
        emit Transfer(address(0), to, amount);
    }
    
    function transfer(address to, uint256 amount) 
        public 
        override 
        whenNotPaused 
        nonReentrant 
        returns (bool) 
    {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        
        return true;
    }
    
    function pause() public onlyPauser {
        _pause();
    }
    
    function unpause() public onlyPauser {
        _unpause();
    }
    
    // Emergency withdrawal
    function emergencyWithdraw(address token, address to) 
        public 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(to != address(0), "Invalid recipient");
        
        uint256 balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        
        IERC20(token).transfer(to, balance);
    }
}
```

### Advanced Testing

#### Smart Contract Testing

```javascript
// test/SecureToken.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecureToken", function () {
    let SecureToken, token, owner, user1, user2;
    
    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        
        SecureToken = await ethers.getContractFactory("SecureToken");
        token = await SecureToken.deploy("Secure Token", "SEC");
        await token.deployed();
    });
    
    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await token.hasRole(await token.DEFAULT_ADMIN_ROLE(), owner.address)).to.equal(true);
        });
        
        it("Should assign minter role to owner", async function () {
            expect(await token.hasRole(await token.MINTER_ROLE(), owner.address)).to.equal(true);
        });
    });
    
    describe("Minting", function () {
        it("Should allow minter to mint tokens", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            await token.mint(user1.address, mintAmount);
            
            expect(await token.balanceOf(user1.address)).to.equal(mintAmount);
        });
        
        it("Should not allow non-minter to mint tokens", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            
            await expect(
                token.connect(user1).mint(user2.address, mintAmount)
            ).to.be.revertedWith("Must have minter role");
        });
    });
    
    describe("Transfer", function () {
        beforeEach(async function () {
            await token.mint(user1.address, ethers.utils.parseEther("100"));
        });
        
        it("Should transfer tokens between accounts", async function () {
            const transferAmount = ethers.utils.parseEther("50");
            
            await token.connect(user1).transfer(user2.address, transferAmount);
            
            expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("50"));
            expect(await token.balanceOf(user2.address)).to.equal(transferAmount);
        });
        
        it("Should fail if sender doesn't have enough tokens", async function () {
            const transferAmount = ethers.utils.parseEther("150");
            
            await expect(
                token.connect(user1).transfer(user2.address, transferAmount)
            ).to.be.revertedWith("Insufficient balance");
        });
        
        it("Should fail when paused", async function () {
            await token.pause();
            
            await expect(
                token.connect(user1).transfer(user2.address, ethers.utils.parseEther("10"))
            ).to.be.revertedWith("Pausable: paused");
        });
    });
    
    describe("Pausing", function () {
        it("Should allow pauser to pause", async function () {
            await token.pause();
            expect(await token.paused()).to.equal(true);
        });
        
        it("Should not allow non-pauser to pause", async function () {
            await expect(
                token.connect(user1).pause()
            ).to.be.revertedWith("Must have pauser role");
        });
    });
});
```

#### Integration Testing

```javascript
// test/integration.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { RSCChain } = require("@rsc-chain/sdk");

describe("Integration Tests", function () {
    let rsc, token, owner, user1, user2;
    
    before(async function () {
        // Connect to RSC Chain
        rsc = new RSCChain({
            endpoint: "http://localhost:8546",
            network: "local"
        });
        
        [owner, user1, user2] = await ethers.getSigners();
    });
    
    beforeEach(async function () {
        // Deploy contract before each test
        const SecureToken = await ethers.getContractFactory("SecureToken");
        token = await SecureToken.deploy("Test Token", "TEST");
        await token.deployed();
    });
    
    it("Should handle complete token lifecycle", async function () {
        // 1. Mint tokens
        const mintAmount = ethers.utils.parseEther("1000");
        await token.mint(user1.address, mintAmount);
        
        // 2. Verify balance on blockchain
        const balance = await rsc.contracts.call(
            token.address,
            ["function balanceOf(address) view returns (uint256)"],
            "balanceOf",
            [user1.address]
        );
        
        expect(balance.toString()).to.equal(mintAmount.toString());
        
        // 3. Transfer tokens
        const transferAmount = ethers.utils.parseEther("100");
        await token.connect(user1).transfer(user2.address, transferAmount);
        
        // 4. Verify transfer
        const user1Balance = await token.balanceOf(user1.address);
        const user2Balance = await token.balanceOf(user2.address);
        
        expect(user1Balance).to.equal(ethers.utils.parseEther("900"));
        expect(user2Balance).to.equal(transferAmount);
        
        // 5. Verify event on blockchain
        const events = await rsc.events.getContractEvents(
            token.address,
            "Transfer",
            { fromBlock: "latest" }
        );
        
        expect(events.length).to.be.greaterThan(0);
        expect(events[0].args.from).to.equal(user1.address);
        expect(events[0].args.to).to.equal(user2.address);
        expect(events[0].args.value.toString()).to.equal(transferAmount.toString());
    });
    
    it("Should handle multiple concurrent transactions", async function () {
        // Mint tokens to multiple users
        const mintAmount = ethers.utils.parseEther("100");
        await token.mint(user1.address, mintAmount);
        await token.mint(user2.address, mintAmount);
        
        // Execute concurrent transfers
        const promises = [];
        for (let i = 0; i < 5; i++) {
            promises.push(
                token.connect(user1).transfer(user2.address, ethers.utils.parseEther("10"))
            );
        }
        
        await Promise.all(promises);
        
        // Verify final balances
        const user1Balance = await token.balanceOf(user1.address);
        const user2Balance = await token.balanceOf(user2.address);
        
        expect(user1Balance).to.equal(ethers.utils.parseEther("50")); // 100 - 5*10
        expect(user2Balance).to.equal(ethers.utils.parseEther("150")); // 100 + 5*10
    });
});
```

### Production Deployment

#### Production Configuration

```javascript
// hardhat.config.prod.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true
    }
  },
  networks: {
    rsc_mainnet: {
      url: process.env.RSC_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1,
      gasPrice: "auto",
      gas: "auto"
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

#### Deployment Script

```javascript
// scripts/deploy-prod.js
const hre = require("hardhat");

async function main() {
    console.log("Starting production deployment...");
    
    // 1. Verify configuration
    const network = await hre.ethers.provider.getNetwork();
    console.log("Network:", network.name);
    console.log("Chain ID:", network.chainId);
    
    // 2. Get balance
    const [deployer] = await hre.ethers.getSigners();
    const balance = await deployer.getBalance();
    console.log("Deployer balance:", hre.ethers.utils.formatEther(balance), "RSC");
    
    if (balance.lt(hre.ethers.utils.parseEther("0.1"))) {
        throw new Error("Insufficient balance for deployment");
    }
    
    // 3. Deploy contract
    console.log("Deploying contract...");
    const SecureToken = await hre.ethers.getContractFactory("SecureToken");
    const token = await SecureToken.deploy("Production Token", "PROD");
    
    console.log("Waiting for confirmation...");
    await token.deployed();
    
    console.log("Contract deployed at:", token.address);
    
    // 4. Verify contract
    console.log("Verifying contract...");
    try {
        await hre.run("verify:verify", {
            address: token.address,
            constructorArguments: ["Production Token", "PROD"],
        });
        console.log("Contract verified successfully");
    } catch (error) {
        console.log("Verification error:", error.message);
    }
    
    // 5. Configure roles
    console.log("Configuring roles...");
    const minterRole = await token.MINTER_ROLE();
    const pauserRole = await token.PAUSER_ROLE();
    
    // Assign roles to multiple addresses for redundancy
    const backupAddresses = process.env.BACKUP_ADDRESSES?.split(",") || [];
    
    for (const address of backupAddresses) {
        await token.grantRole(minterRole, address);
        await token.grantRole(pauserRole, address);
        console.log("Roles assigned to:", address);
    }
    
    // 6. Mint initial tokens
    const initialSupply = hre.ethers.utils.parseEther("1000000"); // 1M tokens
    await token.mint(deployer.address, initialSupply);
    console.log("Initial tokens minted");
    
    console.log("Deployment completed successfully!");
    console.log("Contract:", token.address);
    console.log("Explorer:", `https://explorer.rsc-chain.com/contract/${token.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

#### Production Monitoring

```javascript
// scripts/monitor.js
const { ethers } = require("hardhat");
const { RSCChain } = require("@rsc-chain/sdk");

class ProductionMonitor {
    constructor(config) {
        this.rsc = new RSCChain(config);
        this.contracts = new Map();
        this.alerts = [];
    }
    
    async addContract(address, name, abi) {
        this.contracts.set(address, { name, abi, address });
    }
    
    async startMonitoring() {
        console.log("Starting production monitoring...");
        
        // Monitor contract events
        for (const [address, contract] of this.contracts) {
            await this.monitorContractEvents(address, contract);
        }
        
        // Monitor suspicious transactions
        await this.monitorSuspiciousTransactions();
        
        // Monitor network metrics
        await this.monitorNetworkMetrics();
    }
    
    async monitorContractEvents(address, contract) {
        console.log(`Monitoring ${contract.name} events...`);
        
        this.rsc.events.subscribe('contract_event', (event) => {
            if (event.address.toLowerCase() === address.toLowerCase()) {
                this.handleContractEvent(contract, event);
            }
        });
    }
    
    async handleContractEvent(contract, event) {
        console.log(`Event in ${contract.name}:`, event);
        
        // Check critical events
        if (event.event === 'Transfer' && event.args.value > ethers.utils.parseEther("10000")) {
            this.alert('Large Transfer', {
                contract: contract.name,
                from: event.args.from,
                to: event.args.to,
                value: ethers.utils.formatEther(event.args.value)
            });
        }
        
        if (event.event === 'Paused') {
            this.alert('Contract Paused', {
                contract: contract.name,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    async monitorSuspiciousTransactions() {
        this.rsc.events.subscribe('transaction', (tx) => {
            // Check transactions with very high gas
            if (tx.gasUsed > 1000000) {
                this.alert('High Gas Transaction', {
                    hash: tx.hash,
                    gasUsed: tx.gasUsed,
                    from: tx.from
                });
            }
            
            // Check failed transactions
            if (tx.status === 0) {
                this.alert('Failed Transaction', {
                    hash: tx.hash,
                    from: tx.from,
                    error: tx.error
                });
            }
        });
    }
    
    async monitorNetworkMetrics() {
        setInterval(async () => {
            try {
                const info = await this.rsc.blockchain.getInfo();
                
                // Check network latency
                if (info.blockTime > 20) {
                    this.alert('High Network Latency', {
                        blockTime: info.blockTime,
                        timestamp: new Date().toISOString()
                    });
                }
                
                // Check peer count
                if (info.peers < 10) {
                    this.alert('Low Peer Count', {
                        peers: info.peers,
                        timestamp: new Date().toISOString()
                    });
                }
            } catch (error) {
                this.alert('Network Monitoring Error', {
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        }, 60000); // Every minute
    }
    
    alert(type, data) {
        const alert = {
            type,
            data,
            timestamp: new Date().toISOString()
        };
        
        this.alerts.push(alert);
        console.log('ALERT:', alert);
        
        // Send notification (email, Slack, etc.)
        this.sendNotification(alert);
    }
    
    async sendNotification(alert) {
        // Implement notification sending
        // Email, Slack, Discord, etc.
        console.log('Sending notification:', alert);
    }
}

// Use the monitor
async function main() {
    const monitor = new ProductionMonitor({
        endpoint: process.env.RSC_MAINNET_URL,
        network: 'mainnet'
    });
    
    // Add contracts to monitor
    await monitor.addContract(
        process.env.TOKEN_CONTRACT_ADDRESS,
        "Production Token",
        ["event Transfer(address indexed from, address indexed to, uint256 value)"]
    );
    
    // Start monitoring
    await monitor.startMonitoring();
}

if (require.main === module) {
    main().catch(console.error);
}
```

---

*These guides provide a solid foundation for getting started with RSC Chain. Remember to consult the official documentation for more detailed and up-to-date information.*

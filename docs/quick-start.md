# 🚀 Quick Start

> **Start with RSC Chain in less than 5 minutes**

## 🎯 What will you learn?

In this guide you will learn to:
- ✅ Install RSC Chain on your system
- ✅ Configure the development environment
- ✅ Start your first node
- ✅ Create your first wallet
- ✅ Send your first transaction
- ✅ Explore AI capabilities

## 📋 Prerequisites

### Operating System
- **Windows**: Windows 10/11 (64-bit)
- **macOS**: macOS 10.15 or higher
- **Linux**: Ubuntu 20.04+, CentOS 8+, or similar

### Minimum Hardware
- **CPU**: 4 cores (8 cores recommended)
- **RAM**: 8GB (16GB recommended)
- **Storage**: 100GB SSD
- **Network**: Stable internet connection

### Required Software
- **Rust**: 1.70+ ([Install Rust](https://rustup.rs/))
- **Git**: 2.30+ ([Install Git](https://git-scm.com/))
- **Docker**: 20.10+ (optional, for development)

## ⚙️ Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/rsc-chain/rsc-chain.git
cd rsc-chain

# Verify you're on the correct branch
git checkout main
```

### 2. Install Dependencies

```bash
# Install Rust dependencies
cargo build --release

# Verify installation
cargo run -- --help
```

### 3. Initial Configuration

```bash
# Create configuration file
cp config.example.json config.json

# Edit configuration (optional)
nano config.json
```

## 🚀 First Steps

### 1. Start the System

```bash
# Start RSC Chain
cargo run -- start

# Verify it's working
cargo run -- status
```

**Expected output:**
```
🚀 Starting ultra-advanced blockchain system...
✅ Storage manager started
✅ Blockchain initialized
✅ Consensus engine started
✅ Security system started
✅ AI system started
✅ P2P network started
✅ API server started
✅ Ultra-advanced blockchain system started successfully!
```

### 2. Create Your First Wallet

```bash
# Create a new wallet
cargo run -- wallet create "My First Wallet" --password "my_secure_password"

# List wallets
cargo run -- wallet list
```

**Expected output:**
```
✅ Wallet created successfully!
Address: 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
Balance: 0 RSC
Staked: 0 RSC
```

### 3. Get RSC Tokens (Testnet)

```bash
# Request test tokens
cargo run -- faucet request --address 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6

# Verify balance
cargo run -- wallet info --address 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
```

### 4. Send Your First Transaction

```bash
# Send transaction
cargo run -- wallet send \
  --from 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6 \
  --to 0x1234567890123456789012345678901234567890 \
  --amount 100 \
  --password "my_secure_password"

# Verify transaction
cargo run -- transaction info --hash <transaction_hash>
```

## 🤖 Explore AI Capabilities

### 1. Check AI Status

```bash
# Check AI system status
cargo run -- ai status

# List available models
cargo run -- ai models list
```

### 2. Run Predictive Analysis

```bash
# Analyze transaction patterns
cargo run -- ai predict --input "transaction_patterns" --data "recent_transactions.json"

# Optimize network performance
cargo run -- ai optimize --target "network_performance"
```

### 3. Train Custom Model

```bash
# Train model with custom data
cargo run -- ai train \
  --model "custom_anomaly_detector" \
  --data "my_data.csv" \
  --epochs 100 \
  --learning-rate 0.001
```

## 🔍 Explore the Network

### 1. Check Network Status

```bash
# Check network information
cargo run -- network status

# List connected peers
cargo run -- network peers
```

### 2. Explore Blockchain

```bash
# View latest block
cargo run -- blockchain latest

# View chain statistics
cargo run -- blockchain stats

# Search transactions
cargo run -- transaction search --address 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
```

## 📊 Monitoring and Metrics

### 1. View Real-Time Metrics

```bash
# View system metrics
cargo run -- monitor --realtime

# View specific metrics
cargo run -- monitor --metrics cpu,memory,network
```

### 2. Configure Alerts

```bash
# Configure CPU alert
cargo run -- monitor alert --metric cpu --threshold 80 --action email

# List active alerts
cargo run -- monitor alerts list
```

## 🔧 Development

### 1. Configure Development Environment

```bash
# Install development tools
cargo install cargo-watch
cargo install cargo-audit

# Configure pre-commit hooks
cargo run -- dev setup
```

### 2. Run Tests

```bash
# Run all tests
cargo test

# Run specific tests
cargo test --test consensus_tests

# Run tests with coverage
cargo run -- dev test --coverage
```

### 3. Debugging

```bash
# Run in debug mode
RUST_LOG=debug cargo run -- start

# Analyze logs
cargo run -- logs --level debug --follow
```

## 🌐 Web Interface

### 1. Access the API

```bash
# The API will be available at:
# http://localhost:3000

# OpenAPI Documentation:
# http://localhost:3000/docs

# Block Explorer:
# http://localhost:3000/explorer
```

### 2. Use WebSocket

```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:3000/ws');

// Subscribe to events
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'blocks'
}));

// Receive events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('New block:', data);
};
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Port in Use Error
```bash
# Change port
cargo run -- start --port 3001
```

#### 2. Permission Error
```bash
# On Linux/macOS
sudo chown -R $USER:$USER ~/.rsc-chain
```

#### 3. Memory Error
```bash
# Reduce memory usage
cargo run -- start --memory-limit 4gb
```

#### 4. Network Error
```bash
# Verify connectivity
cargo run -- network test

# Restart network
cargo run -- network restart
```

### Get Help

```bash
# View general help
cargo run -- --help

# View specific command help
cargo run -- wallet --help

# View detailed logs
cargo run -- logs --level trace
```

## 🎉 Congratulations!

You have completed the Quick Start of RSC Chain! You now have:

- ✅ A running RSC Chain node
- ✅ Your first wallet created
- ✅ A transaction sent
- ✅ Explored AI capabilities
- ✅ Monitored the system

## 🚀 Next Steps

Now that you have the basics, you can:

1. **[🏗️ Explore Architecture](architecture/overview.md)** - Understand how it works internally
2. **[🤖 Deepen in AI](ai/overview.md)** - Learn about AI capabilities
3. **[🔐 Security](security/overview.md)** - Learn about advanced security measures
4. **[⚡ Consensus](consensus/overview.md)** - Understand the hybrid consensus mechanism
5. **[🌐 P2P Network](p2p/overview.md)** - Explore the distributed network
6. **[🛠️ Development](development/overview.md)** - Contribute to the project

## 📞 Support

If you have problems or questions:

- **📖 Documentation**: [docs.rsc-chain.com](https://docs.rsc-chain.com)
- **💬 Discord**: [RSC Chain Community](https://discord.gg/rsc-chain)
- **🐦 Twitter**: [@RSCChain](https://twitter.com/RSCChain)
- **📧 Email**: support@rsc-chain.com

---

**Welcome to the future of blockchain!** 🚀✨

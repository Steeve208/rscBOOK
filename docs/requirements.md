# 📋 System Requirements

## Minimum Requirements

### Hardware
- **CPU**: 64-bit processor, 2 cores or more
- **RAM**: Minimum 4GB, recommended 8GB or more
- **Storage**: 50GB free disk space
- **Network**: Stable internet connection

### Software
- **Operating System**: 
  - Windows 10/11 (64-bit)
  - macOS 10.15 or higher
  - Linux (Ubuntu 20.04+, CentOS 8+, Debian 11+)
- **Rust**: Version 1.70.0 or higher
- **Git**: Version 2.30.0 or higher

## Recommended Requirements

### Hardware
- **CPU**: 64-bit processor, 4 cores or more
- **RAM**: 16GB or more
- **Storage**: 100GB SSD or more
- **Network**: High-speed connection (100 Mbps+)

### Software
- **Rust**: Latest stable version
- **Docker**: For container execution
- **Node.js**: Version 18.0.0 or higher (for development tools)

## Requirements Verification

### Verify Rust
```bash
rustc --version
cargo --version
```

### Verify Git
```bash
git --version
```

### Verify Disk Space
```bash
# Windows
dir

# Linux/macOS
df -h
```

## Dependency Installation

### Windows
```powershell
# Install Rust
winget install Rustlang.Rust.MSVC

# Install Git
winget install Git.Git
```

### macOS
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Git
brew install git
```

### Linux (Ubuntu/Debian)
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Git
sudo apt update
sudo apt install git
```

## Initial Configuration

### Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Configure Rust
```bash
rustup default stable
rustup update
```

## Troubleshooting

### Error: "rustc is not recognized as a command"
- Restart terminal after installing Rust
- Verify Rust is in the system PATH

### Error: "git is not recognized as a command"
- Restart terminal after installing Git
- Verify Git is in the system PATH

### Error: "Insufficient disk space"
- Free up space by removing temporary files
- Consider using a disk with more capacity

## Next Steps

Once you've verified that your system meets all requirements, you can proceed with the [Installation](installation.md) of RSC Chain.

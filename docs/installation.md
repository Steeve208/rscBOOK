# ⚙️ Installation

## Quick Installation

### Clone the Repository
```bash
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
```

### Installation with Cargo
```bash
cargo build --release
```

## Detailed Installation

### 1. Prepare the Environment
```bash
# Verify Rust is installed
rustc --version

# Update Rust if necessary
rustup update
```

### 2. Clone and Configure
```bash
# Clone the repository
git clone https://github.com/Steeve208/rscBOOK.git

# Enter the directory
cd rscBOOK

# Verify the structure
ls -la
```

### 3. Compile the Project
```bash
# Development compilation
cargo build

# Production compilation
cargo build --release

# Run tests
cargo test
```

## Docker Installation

### Use Docker Compose
```bash
# Clone the repository
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK

# Build and run with Docker
docker-compose up --build
```

### Build Custom Image
```bash
# Build the image
docker build -t rsc-chain .

# Run the container
docker run -p 8080:8080 rsc-chain
```

## Installation on Different Systems

### Windows
```powershell
# Use PowerShell
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
cargo build --release
```

### macOS
```bash
# Use Terminal
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
cargo build --release
```

### Linux
```bash
# Use Terminal
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
cargo build --release
```

## Installation Verification

### Verify Binaries
```bash
# Verify that binaries were created
ls target/release/

# Verify version
./target/release/rsc-chain --version
```

### Verify Dependencies
```bash
# Verify Rust dependencies
cargo tree

# Verify system dependencies
cargo check
```

## Post-Installation Configuration

### Environment Variables
```bash
# Create configuration file
cp env.example .env

# Edit configuration
nano .env
```

### Network Configuration
```bash
# Configure ports
export RSC_CHAIN_PORT=8080
export RSC_CHAIN_HOST=0.0.0.0
```

## Troubleshooting

### Compilation Error
```bash
# Clean previous build
cargo clean

# Update dependencies
cargo update

# Retry compilation
cargo build
```

### Dependency Error
```bash
# Verify Rust version
rustc --version

# Update Rust
rustup update

# Verify toolchain
rustup show
```

### Permission Error (Linux/macOS)
```bash
# Give execution permissions
chmod +x target/release/rsc-chain

# Verify permissions
ls -la target/release/
```

## Next Steps

Once the installation is complete, you can proceed with the [Configuration](configuration.md) of the system.

## Useful Commands

### Development
```bash
cargo run          # Run in development mode
cargo test         # Run tests
cargo clippy       # Check code
cargo fmt          # Format code
```

### Production
```bash
cargo build --release  # Compile for production
cargo install --path . # Install globally
```

### Maintenance
```bash
cargo clean        # Clean builds
cargo update       # Update dependencies
cargo audit        # Check security
```

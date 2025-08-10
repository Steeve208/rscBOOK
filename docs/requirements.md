# 📋 Requisitos del Sistema

## Requisitos Mínimos

### Hardware
- **CPU**: Procesador de 64 bits, 2 núcleos o más
- **RAM**: Mínimo 4GB, recomendado 8GB o más
- **Almacenamiento**: 50GB de espacio libre en disco
- **Red**: Conexión a Internet estable

### Software
- **Sistema Operativo**: 
  - Windows 10/11 (64-bit)
  - macOS 10.15 o superior
  - Linux (Ubuntu 20.04+, CentOS 8+, Debian 11+)
- **Rust**: Versión 1.70.0 o superior
- **Git**: Versión 2.30.0 o superior

## Requisitos Recomendados

### Hardware
- **CPU**: Procesador de 64 bits, 4 núcleos o más
- **RAM**: 16GB o más
- **Almacenamiento**: SSD de 100GB o más
- **Red**: Conexión de alta velocidad (100 Mbps+)

### Software
- **Rust**: Última versión estable
- **Docker**: Para ejecución en contenedores
- **Node.js**: Versión 18.0.0 o superior (para herramientas de desarrollo)

## Verificación de Requisitos

### Verificar Rust
```bash
rustc --version
cargo --version
```

### Verificar Git
```bash
git --version
```

### Verificar Espacio en Disco
```bash
# Windows
dir

# Linux/macOS
df -h
```

## Instalación de Dependencias

### Windows
```powershell
# Instalar Rust
winget install Rustlang.Rust.MSVC

# Instalar Git
winget install Git.Git
```

### macOS
```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Instalar Git
brew install git
```

### Linux (Ubuntu/Debian)
```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Instalar Git
sudo apt update
sudo apt install git
```

## Configuración Inicial

### Configurar Git
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

### Configurar Rust
```bash
rustup default stable
rustup update
```

## Solución de Problemas

### Error: "rustc no se reconoce como comando"
- Reinicia la terminal después de instalar Rust
- Verifica que Rust esté en el PATH del sistema

### Error: "git no se reconoce como comando"
- Reinicia la terminal después de instalar Git
- Verifica que Git esté en el PATH del sistema

### Error: "Espacio insuficiente en disco"
- Libera espacio eliminando archivos temporales
- Considera usar un disco con más capacidad

## Próximos Pasos

Una vez que hayas verificado que tu sistema cumple con todos los requisitos, puedes proceder con la [Instalación](installation.md) de RSC Chain.

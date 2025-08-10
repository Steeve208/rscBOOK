# ⚙️ Instalación

## Instalación Rápida

### Clonar el Repositorio
```bash
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
```

### Instalación con Cargo
```bash
cargo build --release
```

## Instalación Detallada

### 1. Preparar el Entorno
```bash
# Verificar que Rust esté instalado
rustc --version

# Actualizar Rust si es necesario
rustup update
```

### 2. Clonar y Configurar
```bash
# Clonar el repositorio
git clone https://github.com/Steeve208/rscBOOK.git

# Entrar al directorio
cd rscBOOK

# Verificar la estructura
ls -la
```

### 3. Compilar el Proyecto
```bash
# Compilación de desarrollo
cargo build

# Compilación de producción
cargo build --release

# Ejecutar tests
cargo test
```

## Instalación con Docker

### Usar Docker Compose
```bash
# Clonar el repositorio
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK

# Construir y ejecutar con Docker
docker-compose up --build
```

### Construir Imagen Personalizada
```bash
# Construir la imagen
docker build -t rsc-chain .

# Ejecutar el contenedor
docker run -p 8080:8080 rsc-chain
```

## Instalación en Diferentes Sistemas

### Windows
```powershell
# Usar PowerShell
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
cargo build --release
```

### macOS
```bash
# Usar Terminal
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
cargo build --release
```

### Linux
```bash
# Usar Terminal
git clone https://github.com/Steeve208/rscBOOK.git
cd rscBOOK
cargo build --release
```

## Verificación de la Instalación

### Verificar Binarios
```bash
# Verificar que se crearon los binarios
ls target/release/

# Verificar la versión
./target/release/rsc-chain --version
```

### Verificar Dependencias
```bash
# Verificar dependencias de Rust
cargo tree

# Verificar dependencias del sistema
cargo check
```

## Configuración Post-Instalación

### Variables de Entorno
```bash
# Crear archivo de configuración
cp env.example .env

# Editar configuración
nano .env
```

### Configuración de Red
```bash
# Configurar puertos
export RSC_CHAIN_PORT=8080
export RSC_CHAIN_HOST=0.0.0.0
```

## Solución de Problemas

### Error de Compilación
```bash
# Limpiar build anterior
cargo clean

# Actualizar dependencias
cargo update

# Reintentar compilación
cargo build
```

### Error de Dependencias
```bash
# Verificar versión de Rust
rustc --version

# Actualizar Rust
rustup update

# Verificar toolchain
rustup show
```

### Error de Permisos (Linux/macOS)
```bash
# Dar permisos de ejecución
chmod +x target/release/rsc-chain

# Verificar permisos
ls -la target/release/
```

## Próximos Pasos

Una vez completada la instalación, puedes proceder con la [Configuración](configuration.md) del sistema.

## Comandos Útiles

### Desarrollo
```bash
cargo run          # Ejecutar en modo desarrollo
cargo test         # Ejecutar tests
cargo clippy       # Verificar código
cargo fmt          # Formatear código
```

### Producción
```bash
cargo build --release  # Compilar para producción
cargo install --path . # Instalar globalmente
```

### Mantenimiento
```bash
cargo clean        # Limpiar builds
cargo update       # Actualizar dependencias
cargo audit        # Verificar seguridad
```

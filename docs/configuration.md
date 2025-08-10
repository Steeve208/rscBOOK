# 🔧 Configuración

## Configuración Básica

### Archivo de Configuración Principal
```yaml
# config/default.yaml
network:
  host: "0.0.0.0"
  port: 8080
  max_peers: 50

consensus:
  algorithm: "hybrid"
  pow_difficulty: 1000000
  pos_min_stake: 1000

storage:
  engine: "rocksdb"
  path: "./data"
  max_size: "100GB"

ai:
  enabled: true
  model_path: "./models"
  inference_threads: 4
```

### Variables de Entorno
```bash
# .env
RSC_CHAIN_NETWORK_HOST=0.0.0.0
RSC_CHAIN_NETWORK_PORT=8080
RSC_CHAIN_CONSENSUS_ALGORITHM=hybrid
RSC_CHAIN_STORAGE_ENGINE=rocksdb
RSC_CHAIN_AI_ENABLED=true
```

## Configuración de Red

### Configuración P2P
```yaml
p2p:
  discovery:
    enabled: true
    bootstrap_nodes:
      - "node1.rscchain.com:8080"
      - "node2.rscchain.com:8080"
  
  transport:
    protocol: "quic"
    noise_enabled: true
    max_connections: 100
```

### Configuración de Firewall
```yaml
firewall:
  l7_enabled: true
  rate_limiting:
    requests_per_minute: 1000
    burst_size: 100
  
  blacklist:
    - "192.168.1.100"
    - "10.0.0.50"
```

## Configuración de Consenso

### Proof of Work
```yaml
pow:
  algorithm: "sha256"
  target_difficulty: 1000000
  block_time: 10
  max_nonce: 4294967295
```

### Proof of Stake
```yaml
pos:
  min_stake: 1000
  max_validators: 100
  staking_period: 86400
  reward_rate: 0.05
```

### VRF (Verifiable Random Function)
```yaml
vrf:
  enabled: true
  algorithm: "ed25519"
  threshold: 0.6
  epoch_length: 100
```

## Configuración de Almacenamiento

### RocksDB
```yaml
rocksdb:
  compression: "lz4"
  block_size: "64KB"
  cache_size: "1GB"
  max_open_files: 1000
  
  write_buffer_size: "64MB"
  max_write_buffer_number: 4
```

### Caché TTL
```yaml
cache:
  ttl: 3600
  max_size: "2GB"
  eviction_policy: "lru"
  
  levels:
    l1: "256MB"
    l2: "1GB"
    l3: "2GB"
```

## Configuración de IA

### Modelos de Machine Learning
```yaml
ai:
  models:
    consensus:
      path: "./models/consensus"
      type: "neural_network"
      input_size: 1000
      output_size: 100
    
    security:
      path: "./models/security"
      type: "anomaly_detection"
      threshold: 0.8
```

### Federated Learning
```yaml
federated_learning:
  enabled: true
  aggregation_rounds: 10
  min_participants: 5
  privacy_budget: 1.0
```

## Configuración de API

### REST API
```yaml
api:
  rest:
    enabled: true
    cors:
      allowed_origins: ["*"]
      allowed_methods: ["GET", "POST", "PUT", "DELETE"]
    
    rate_limiting:
      requests_per_minute: 1000
      burst_size: 100
```

### WebSocket
```yaml
websocket:
  enabled: true
  max_connections: 1000
  heartbeat_interval: 30
  max_message_size: "1MB"
```

## Configuración de Monitoreo

### Métricas
```yaml
monitoring:
  metrics:
    enabled: true
    interval: 60
    exporters:
      - "prometheus"
      - "influxdb"
  
  logging:
    level: "info"
    format: "json"
    output: "stdout"
```

### Alertas
```yaml
alerts:
  enabled: true
  channels:
    - type: "email"
      recipients: ["admin@rscchain.com"]
    - type: "slack"
      webhook: "https://hooks.slack.com/..."
  
  rules:
    - name: "high_cpu_usage"
      condition: "cpu_usage > 80%"
      severity: "warning"
```

## Configuración de Seguridad

### Criptografía
```yaml
crypto:
  post_quantum:
    enabled: true
    algorithms:
      - "xmss"
      - "sphincs+"
      - "dilithium"
  
  zero_knowledge:
    enabled: true
    proving_system: "plonk"
    curve: "bn254"
```

### Autenticación
```yaml
auth:
  jwt:
    secret: "${JWT_SECRET}"
    expiration: 3600
  
  api_keys:
    enabled: true
    max_keys_per_user: 5
```

## Configuración de Desarrollo

### Testing
```yaml
testing:
  unit_tests: true
  integration_tests: true
  performance_tests: true
  
  coverage:
    enabled: true
    threshold: 80
```

### Debugging
```yaml
debug:
  enabled: false
  log_level: "debug"
  profiling: false
  trace: false
```

## Validación de Configuración

### Verificar Configuración
```bash
# Validar archivo de configuración
cargo run -- validate-config

# Verificar variables de entorno
cargo run -- check-env

# Probar configuración
cargo run -- test-config
```

### Configuración por Entorno
```bash
# Desarrollo
cp config/development.yaml config/default.yaml

# Producción
cp config/production.yaml config/default.yaml

# Testing
cp config/testing.yaml config/default.yaml
```

## Próximos Pasos

Una vez configurado el sistema, puedes proceder con los [Primeros Pasos](first-steps.md).

## Comandos de Configuración

### Ver Configuración Actual
```bash
cargo run -- config show
cargo run -- config validate
cargo run -- config test
```

### Modificar Configuración
```bash
cargo run -- config set network.port 9090
cargo run -- config set consensus.algorithm pos
cargo run -- config reload
```

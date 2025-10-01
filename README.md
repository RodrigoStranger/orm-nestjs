# NestJS ORM University API

Una API REST completa desarrollada con NestJS, TypeORM y PostgreSQL para gestión de universidades, con Docker, Nginx y PM2 para producción.

## 🏗️ Arquitectura

- **Backend**: NestJS con TypeScript
- **Base de datos**: PostgreSQL 15
- **ORM**: TypeORM con sincronización automática
- **Proxy reverso**: Nginx con rate limiting
- **Gestor de procesos**: PM2 en modo cluster
- **Contenedores**: Docker con Docker Compose
- **Validación**: class-validator y class-transformer
- **Normalización**: lodash y slugify

## 🚀 Configuración y Ejecución

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)

### Ejecución con Docker (Recomendado)

```bash
# Clonar y navegar al proyecto
cd orm-nestjs

# Iniciar todos los servicios
docker-compose up -d --build

# Verificar que los contenedores están ejecutándose
docker-compose ps

# Ver logs de la aplicación
docker-compose logs nestjs-app

# Ver logs de todos los servicios
docker-compose logs

# Detener servicios
docker-compose down
```

### Servicios Disponibles

| Servicio | Puerto | URL | Descripción |
|----------|--------|-----|-------------|
| API Principal | 80 | http://localhost | API REST con Nginx |
| Aplicación Directa | 3000 | http://localhost:3000 | NestJS sin proxy |
| PostgreSQL | 5432 | localhost:5432 | Base de datos |
| Adminer | 8080 | http://localhost:8080 | Administrador de BD |

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar en modo producción
npm run build
npm run start:prod
```

## 📋 API Endpoints

### Health Check
- `GET /health` - Verificar estado de la aplicación

### Universidades
- `GET /universities` - Obtener todas las universidades
- `GET /universities/:id` - Obtener universidad por ID
- `POST /universities` - Crear nueva universidad
- `PUT /universities/:id` - Actualizar universidad
- `DELETE /universities/:id` - Eliminar universidad

### Ejemplos de Uso

#### Crear Universidad
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost/universities -Method POST -ContentType "application/json" -Body '{"name": "Universidad Nacional"}'

# cURL (Git Bash/Linux)
curl -X POST http://localhost/universities -H "Content-Type: application/json" -d '{"name": "Universidad Nacional"}'
```

#### Obtener Universidades
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost/universities -Method GET

# cURL
curl -X GET http://localhost/universities
```

## 🧪 Testing con Postman

### Importar Colección
1. Abrir Postman
2. Click en "Import"
3. Seleccionar `postman/NestJS-ORM-Universities.postman_collection.json`
4. Importar environment: `postman/Development.postman_environment.json`

### Casos de Prueba Incluidos
- ✅ Health check
- ✅ CRUD completo de universidades
- ✅ Validaciones de campos
- ✅ Manejo de errores 404
- ✅ Duplicados y normalización
- ✅ Casos límite de validación

## 🗃️ Esquema de Base de Datos

### Tabla: universities
```sql
CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);
```

### Configuración TypeORM
- **Synchronize**: `true` (desarrollo) - Crea tablas automáticamente
- **Drop Schema**: `true` (desarrollo) - Recrear schema en cada inicio
- **Logging**: Queries en desarrollo, solo errores en producción

## 🔧 Funcionalidades Especiales

### Normalización de Texto
```typescript
// Entrada: "  UNIVERSIDAD   javériana   "
// Salida: "Universidad Javériana"
```

### Validaciones
- Nombre requerido
- Mínimo 3 caracteres
- Máximo 255 caracteres
- Sin duplicados (normalizado)

### Respuestas Estructuradas
```json
{
  "status": 200,
  "mensaje": "Universidad creada exitosamente",
  "university": {
    "id": 1,
    "name": "Universidad Nacional"
  }
}
```

## 🐳 Configuración Docker

### Servicios en docker-compose.yml
1. **postgres**: Base de datos PostgreSQL 15
2. **nestjs-app**: Aplicación NestJS con PM2
3. **nginx**: Proxy reverso con rate limiting
4. **adminer**: Interfaz web para PostgreSQL

### Variables de Entorno
```env
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=university_db
PORT=3000
```

## 📊 Monitoreo y Logs

### Health Checks
- **PostgreSQL**: `pg_isready`
- **NestJS**: HTTP health endpoint
- **Nginx**: wget health endpoint

### PM2 Cluster
- 16 instancias en modo cluster
- Auto-restart en fallos
- Balanceador de carga interno

### Logs Útiles
```bash
# Logs específicos de la aplicación
docker-compose logs nestjs-app

# Logs de base de datos
docker-compose logs postgres

# Logs de Nginx
docker-compose logs nginx

# Logs en tiempo real
docker-compose logs -f nestjs-app
```

## 🛡️ Seguridad

### Nginx Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

### Rate Limiting
- 10 requests por minuto por IP
- Burst de hasta 20 requests

### Validación de Entrada
- class-validator para DTOs
- Sanitización automática
- Manejo seguro de errores

## 🚨 Troubleshooting

### Problema: Contenedores no inician
```bash
# Verificar logs
docker-compose logs

# Reconstruir contenedores
docker-compose down
docker-compose up -d --build
```

### Problema: Base de datos no conecta
```bash
# Verificar estado de PostgreSQL
docker-compose exec postgres pg_isready -U postgres

# Reiniciar solo base de datos
docker-compose restart postgres
```

### Problema: Puerto en uso
```bash
# Verificar puertos ocupados
netstat -an | findstr :80
netstat -an | findstr :5432

# Cambiar puertos en docker-compose.yml
```

## 📈 Rendimiento

### PM2 Configuración
- Modo cluster con todas las CPUs disponibles
- Reinicio automático en errores
- Balanceador de carga interno

### Nginx Optimización
- Compresión gzip habilitada
- Cache de archivos estáticos
- Keep-alive connections

### TypeORM Optimización
- Conexión pool configurada
- Logging condicional por ambiente
- Índices automáticos en campos únicos

## 🔄 CI/CD Ready

### Docker Multi-stage Build
- Stage de construcción con dependencias de desarrollo
- Stage de producción optimizado
- Usuario no-root para seguridad

### Environment Variables
- Configuración por environment
- Secrets manejados por Docker
- Variables de desarrollo y producción separadas

## 📚 Próximos Pasos

1. **Testing**: Implementar tests unitarios y e2e
2. **Autenticación**: Agregar JWT y roles
3. **Pagination**: Implementar paginación en listados
4. **Swagger**: Documentación automática de API
5. **Metrics**: Prometheus y Grafana
6. **Cache**: Redis para optimización
7. **Events**: Sistema de eventos asincrónicos

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar logs con `docker-compose logs`
2. Verificar health checks
3. Consultar esta documentación
4. Probar endpoints con Postman

**¡La API está lista para uso en desarrollo y producción!** 🎉
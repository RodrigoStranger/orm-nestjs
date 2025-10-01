### Ejecución con Docker

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
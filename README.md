### Ejecución con Docker

#### Iniciar todos los servicios
```bash
docker-compose up -d --build
```

#### Verificar que los contenedores están ejecutándose
```bash
docker-compose ps
```

#### Ver logs de la aplicación
```bash
docker-compose logs nestjs-app
```

#### Ver logs de todos los servicios
```bash
docker-compose logs
```

#### Detener servicios
```bash
docker-compose down
```

#### Detener servicios y borrar volúmenes (datos)
```bash
docker-compose down -v
```

#### Verificar variables de entorno
```bash
docker-compose logs nestjs-app | grep "NODE_ENV"
```

#### Ver logs de TypeORM schema
```bash
docker-compose logs nestjs-app | grep -i "drop|schema"
```
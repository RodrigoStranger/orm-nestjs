### Ejecución con Docker (Producción)

#### Inicializar base de datos y servicios
```bash
docker-compose down -v && docker-compose up -d --build
```

#### Verificar que los contenedores están ejecutándose
```bash
docker-compose ps
```

#### Ver logs de la aplicación
```bash
docker-compose logs nestjs-app
```

#### Ver logs de inicialización de base de datos
```bash
docker-compose logs postgres
```

#### Ver logs de todos los servicios
```bash
docker-compose logs
```

#### Detener servicios
```bash
docker-compose down
```

#### Resetear base de datos (borra datos y recrea con script SQL)
```bash
docker-compose down -v
```

#### Verificar variables de entorno (producción)
```bash
docker-compose logs nestjs-app | grep "NODE_ENV"
```

#### Verificar que las tablas se crearon correctamente
```bash
docker-compose exec postgres psql -U postgres -d university_db -c "\dt"
```

#### Ver datos iniciales
```bash
docker-compose exec postgres psql -U postgres -d university_db -c "SELECT * FROM universities;"
```

### Pruebas de API

#### Crear universidad (curl)
```bash
curl -X POST http://localhost/universities \
  -H "Content-Type: application/json" \
  -d '{"name": "  UNIVERSIDAD   javériana   "}'
```

#### Obtener todas las universidades (curl)
```bash
curl -X GET http://localhost/universities
```

#### Obtener universidad por ID (curl)
```bash
curl -X GET http://localhost/universities/1
```

#### Actualizar universidad (curl)
```bash
curl -X PUT http://localhost/universities/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Universidad Javeriana Actualizada"}'
```

#### Eliminar universidad (curl)
```bash
curl -X DELETE http://localhost/universities/1
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UniversityModule } from './university/university.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'university_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Siempre sincronizar para desarrollo
      dropSchema: process.env.NODE_ENV === 'development', // Recrear schema en desarrollo
      logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    }),
    UniversityModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
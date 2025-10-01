import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UniversityModule } from './university/university.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Especificar explícitamente el archivo .env
      cache: true, // Cache de variables para mejor rendimiento
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    }),
    UniversityModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
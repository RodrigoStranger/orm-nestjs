import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UniversityModule } from './university/university.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Nunca sincronizar en producción
      dropSchema: false, // Nunca borrar schema en producción
      logging: ['error'], // Solo errores en producción
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: false, // Las migraciones se ejecutan manualmente
    }),
    UniversityModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
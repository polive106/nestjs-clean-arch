import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeormModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    schema: config.getDatabaseSchema(),
    synchronize: false,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../**/migrations/*{.ts,.js}'],
    ssl: {
      rejectUnauthorized: false,
    },
  }) as TypeOrmModuleOptions;

@Module({})
export class TypeormModule {}

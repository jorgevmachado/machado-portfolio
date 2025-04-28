import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'localhost',
  password: 'localhost',
  database: 'portfolio',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
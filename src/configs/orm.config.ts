import { ArticleEntity } from '../entities/article.entity';
import { UserEntity } from '../entities/user.entity';
import {
  PostgresConnectionOptions
} from 'typeorm/driver/postgres/PostgresConnectionOptions';

// destructure process.env for readability and to avoid repeating process.env
const {
  POSTGRES_HOST = 'localhost', // Default value 'localhost' if POSTGRES_HOST is not defined
  POSTGRES_PORT = '5432', // Default value '5432' if POSTGRES_PORT is not defined
  POSTGRES_USER = 'postgres', // Default value 'postgres' if POSTGRES_USER is not defined
  POSTGRES_PASSWORD = 'postgres', // Default value 'postgres' if POSTGRES_PASSWORD is not defined
  POSTGRES_DB = 'connectme', // Default value 'postgres' if POSTGRES_DB is not defined
} = process.env;

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [
    UserEntity, ArticleEntity
  ]
};

export { typeOrmConfig };
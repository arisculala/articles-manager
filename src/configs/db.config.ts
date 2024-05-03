import { createConnection, Connection } from 'typeorm';
import { typeOrmConfig } from './orm.config';
import Logger from '../lib/logger';

let connection: Connection;

export async function connectToDatabase(): Promise<void> {
  try {
    connection = await createConnection(typeOrmConfig);
    Logger.info(`Database successfully connected!`);
  } catch (error) {
    Logger.error(`Error encountered connecting to database`);
    Logger.error(error);
    throw error;
  }
}

export function getDBConnection(): Connection {
    if (!connection) {
        throw new Error('Database connection not established. Make sure to call connectToDatabase() first');
    }
    return connection;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await connection.query('SELECT 1');
    return true; // If the query executes successfully, the connection is okay
  } catch (error) {
    return false; // If an error occurs during the query execution, the connection is not okay
  }
}
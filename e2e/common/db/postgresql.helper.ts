import { Client } from "pg";
import { config } from "../../config";

const postgresqlDb = new Client({
  host: config.postgresql.host,
  port: config.postgresql.port,
  user: config.postgresql.username,
  database: config.postgresql.database,
  password: config.postgresql.password
});

export const connectPostgresqlDb = async (): Promise<void> => {
  await postgresqlDb.connect();
  await resetPostgresqlDb();
};

export const resetPostgresqlDb = async (): Promise<void> => {
  await runPostgresqlQuery("TRUNCATE story");
};

export const closePostgresqlDb = async (): Promise<void> => {
  await postgresqlDb.close();
};

export const runPostgresqlQuery = async <T>(query): Promise<QueryResponse<T>> => {
  return <QueryResponse<T>>postgresqlDb.query(query);
};

export interface QueryResponse<T> {
  command: string;
  rowCount: number;
  rows: T[];
}
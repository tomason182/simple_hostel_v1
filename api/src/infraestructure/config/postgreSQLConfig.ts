import { PoolConfig } from "pg";


export function postgreSQLConfig(): PoolConfig {
  const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    NODE_ENV,
  } = process.env;

  if (!DB_HOST) throw new Error("DB_HOST is not defined.");
  if (!DB_PORT) throw new Error("DB_PORT is not defined.");
  if (!DB_NAME) throw new Error("DB_NAME is not defined.");
  if (!DB_USER) throw new Error("DB_USER is not defined.");
  if (!DB_PASSWORD) throw new Error("DB_PASSWORD is not defined.");

  return {
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,

    max: 20,      // maximo de conexiones en el pool.
    idleTimeoutMillis: 30_000,      // Cierra conexiones inactivas luego de 30 segundos.
    connectionTimeoutMillis: 5_000,

    ssl:
      NODE_ENV === "production"
        ? { rejectUnauthorized: true }
        : false,
  }
}

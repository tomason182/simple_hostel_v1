import { Pool, PoolClient, QueryResult } from "pg";

export class UnitOfWork {
  private connection: PoolClient | null = null;
  private transactionActive = false;

  constructor(private readonly pool: Pool) {
    this.pool = pool
  }

  // 1. Asegurar tener conexion.
  public async getConnection(): Promise<PoolClient> {
    if (!this.connection) {
      this.connection = await this.pool.connect();
    }
    return this.connection;
  }

  // 2. Inicar transaccion.
  public async begin() {
    const connection = await this.getConnection();


    if (this.transactionActive) return;

    await connection.query("BEGIN");
    this.transactionActive = true;
  }

  public async commit() {
    if (!this.connection || !this.transactionActive) return;

    await this.connection.query("COMMIT");
    this.transactionActive = false;
  }

  public async rollback() {
    if (!this.connection || !this.transactionActive) return;

    await this.connection.query("ROLLBACK");
    this.transactionActive = false;
  }

  public release() {
    if (!this.connection) return;

    this.connection.release();
    this.connection = null;
    this.transactionActive = false;
  }

  async query<T = any>(
    sql: string,
    params?: unknown[]
  ): Promise<QueryResult<T>> {
    const connection = await this.getConnection();
    return connection.query(sql, params)
  }

  // ALTERNATIVA AL PROXY: En lugar de usar el Proxy se puede usar la siguiente funcion con callback.
  async execute<T>(callback: () => Promise<T>, needTransaction = false) {
    await this.getConnection();

    try {
      if (needTransaction) {
        await this.begin();
      }

      const result = await callback();

      if (needTransaction) {
        await this.commit();
      }

      return result;

    } catch (e) {
      await this.rollback();
      throw e;
    } finally {
      this.release();
    }
  }
}

import { Pool } from "pg";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const cs = process.env.DATABASE_URL;
    if (!cs) {
      throw new Error("Missing DATABASE_URL env var");
    }

    pool = new Pool({
      connectionString: cs,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });

    pool.on("error", (err: Error) => {
      console.error("Postgres pool error:", err);
    });
  }

  return pool;
}

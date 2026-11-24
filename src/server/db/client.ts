import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/server/env";
import * as schema from "./schema";

export type Db = ReturnType<typeof createDb>;

export function createDb(url = env().DATABASE_URL) {
  const sql = postgres(url, { max: 10, onnotice: () => {} });
  return drizzle(sql, { schema });
}

// One pool per process. Next.js dev reloads modules, so keep it on globalThis.
const g = globalThis as unknown as { __leaflystDb?: Db };

export function db(): Db {
  g.__leaflystDb ??= createDb();
  return g.__leaflystDb;
}

export { schema };

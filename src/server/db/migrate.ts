import { migrate } from "drizzle-orm/postgres-js/migrator";
import { createDb } from "./client";

export async function runMigrations(url?: string) {
  const database = createDb(url);
  await migrate(database, { migrationsFolder: new URL("./migrations", import.meta.url).pathname });
  await database.$client.end();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => console.log("migrations applied"))
    .catch((error: unknown) => {
      console.error(error);
      process.exit(1);
    });
}

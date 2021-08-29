import { createConnection, getConnectionOptions } from "typeorm";

export async function initDatabase() {
  await createConnection();
}

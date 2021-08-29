import "reflect-metadata";
import "dotenv/config";

import { join } from "path";
import { Express } from "express";
import { createExpressServer } from "routing-controllers";
import { initDatabase } from "./database";

const PORT = `${process.env.APP_PORT}`;

initDatabase();

const app: Express = createExpressServer({
  controllers: [join(__dirname, "controllers", "**/*.controller.{js,ts}")],
  middlewares: [
    join(__dirname, "config", "middlewares", "*.middleware.{ts,js}"),
  ],
  defaultErrorHandler: false,
  cors: true,
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);

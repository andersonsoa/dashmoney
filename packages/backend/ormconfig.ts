export default {
  type: "sqlite",
  database: "src/database/database.sqlite",
  synchronize: false,
  logging: true,
  entities: ["**/src/models/*.model{.ts,.js}"],
  migrations: ["src/database/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/database/migration",
  },
};

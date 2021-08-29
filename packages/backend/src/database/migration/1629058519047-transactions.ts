import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class transactions1629058519047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "value",
            type: "decimal",
          },
          {
            name: "period_id",
            type: "varchar",
          },
          {
            name: "card_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "periods",
            referencedColumnNames: ["id"],
            columnNames: ["period_id"],
          },
          {
            referencedTableName: "cards",
            referencedColumnNames: ["id"],
            columnNames: ["card_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("transactions");
  }
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class cards1629058255913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cards",
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
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "limit",
            type: "decimal",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cards");
  }
}

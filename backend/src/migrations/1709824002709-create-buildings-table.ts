import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBuildingsTable1709824002709 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "buildings",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "room_number",
                        type: "varchar",
                        length: "10",
                        isNullable: false
                    },
                    {
                        name: "building_name",
                        type: "varchar",
                        length: "10",
                        isNullable: false
                    },
                    {
                        name: "tenants",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["available", "occupied", "maintenance"],
                        default: "'available'"
                    }
                ]
            }),
            true
        );

        // Initial building data with rooms will be added through seed_buildings.sql
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buildings");
    }
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBuildingsTable1709824002709 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "buildings",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "start_room",
                        type: "varchar",
                    },
                    {
                        name: "end_room", 
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            }),
            true
        );

        // Insert initial building data
        await queryRunner.query(`
            INSERT INTO buildings (id, name, start_room, end_room) VALUES
            (uuid(), 'A', '9101', '9025'),
            (uuid(), 'B', '8101', '8025'),
            (uuid(), 'C', '7101', '7025'),
            (uuid(), 'E', '5101', '5025'),
            (uuid(), 'F', '1101', '1025')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buildings");
    }
}

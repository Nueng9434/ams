import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTenantsTable1709824002708 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tenants",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "fullName",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "phoneNumber",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "address",
                        type: "text",
                    },
                    {
                        name: "idCardNumber",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "documentPath",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "tenantType",
                        type: "char",
                        length: "1",
                        comment: "R = Reservation, C = Contract",
                    },
                    {
                        name: "profileImage",
                        type: "text",
                        isNullable: true,
                        comment: "Base64 encoded image",
                    },
                    {
                        name: "reservationStartDate",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "reservationEndDate",
                        type: "timestamp", 
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tenants");
    }
}

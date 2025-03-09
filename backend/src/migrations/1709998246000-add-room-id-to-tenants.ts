import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddRoomIdToTenants1709998246000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tenants",
            new TableColumn({
                name: "room_id",
                type: "int",
                isNullable: true
            })
        );

        await queryRunner.createForeignKey(
            "tenants",
            new TableForeignKey({
                columnNames: ["room_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "buildings",
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tenants");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("room_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("tenants", foreignKey);
        }
        await queryRunner.dropColumn("tenants", "room_id");
    }
}

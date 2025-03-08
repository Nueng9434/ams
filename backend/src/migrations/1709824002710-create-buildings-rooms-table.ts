import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBuildingsRoomsTable1709824002710 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "buildings_rooms",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "room_number",
                        type: "varchar",
                    },
                    {
                        name: "building_name",
                        type: "varchar",
                    },
                    {
                        name: "tenants",
                        type: "varchar",
                        isNullable: true
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

        // Insert initial room data for each building
        // Building A (9101-9925 and 9001-9025)
        const buildingARooms = generateRoomNumbers('A', 9, 1, 25, 10);
        await queryRunner.query(
            `INSERT INTO buildings_rooms (id, room_number, building_name, status) VALUES ${buildingARooms}`
        );

        // Building B (8101-8925 and 8001-8025)
        const buildingBRooms = generateRoomNumbers('B', 8, 1, 25, 10);
        await queryRunner.query(
            `INSERT INTO buildings_rooms (id, room_number, building_name, status) VALUES ${buildingBRooms}`
        );

        // Building C (7101-7925 and 7001-7025)
        const buildingCRooms = generateRoomNumbers('C', 7, 1, 25, 10);
        await queryRunner.query(
            `INSERT INTO buildings_rooms (id, room_number, building_name, status) VALUES ${buildingCRooms}`
        );

        // Building E (5101-5925 and 5001-5025)
        const buildingERooms = generateRoomNumbers('E', 5, 1, 25, 10);
        await queryRunner.query(
            `INSERT INTO buildings_rooms (id, room_number, building_name, status) VALUES ${buildingERooms}`
        );

        // Building F (1101-1925 and 1001-1025)
        const buildingFRooms = generateRoomNumbers('F', 1, 1, 25, 10);
        await queryRunner.query(
            `INSERT INTO buildings_rooms (id, room_number, building_name, status) VALUES ${buildingFRooms}`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buildings_rooms");
    }
}

function generateRoomNumbers(
    buildingName: string,
    prefix: number,
    startFloor: number,
    roomsPerFloor: number,
    totalFloors: number
): string {
    const values: string[] = [];
    
    // Generate rooms for floors 1-9
    for (let floor = startFloor; floor <= 9; floor++) {
        for (let room = 1; room <= roomsPerFloor; room++) {
            const roomNumber = `${prefix}${floor}${room.toString().padStart(2, '0')}`;
            values.push(`(uuid(), '${roomNumber}', '${buildingName}', 'available')`);
        }
    }
    
    // Generate rooms for floor 10 (using 0)
    for (let room = 1; room <= roomsPerFloor; room++) {
        const roomNumber = `${prefix}0${room.toString().padStart(2, '0')}`;
        values.push(`(uuid(), '${roomNumber}', '${buildingName}', 'available')`);
    }
    
    return values.join(',');
}

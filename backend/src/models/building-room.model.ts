import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("buildings_rooms")
export class BuildingRoom {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "room_number" })
    roomNumber!: string;

    @Column({ name: "building_name" })
    buildingName!: string;

    @Column({ nullable: true })
    tenants?: string;

    @Column({
        type: "enum",
        enum: ["available", "occupied", "maintenance"],
        default: "available"
    })
    status!: "available" | "occupied" | "maintenance";
}

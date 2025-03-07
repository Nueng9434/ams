import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("tenants")
export class Tenant {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 20 })
    title!: string;

    @Column({ length: 255 })
    fullName!: string;

    @Column({ length: 20 })
    phoneNumber!: string;

    @Column("text")
    address!: string;

    @Column({ length: 20 })
    idCardNumber!: string;

    @Column({ length: 255, nullable: true })
    documentPath?: string;

    @Column({ length: 1, comment: "R = Reservation, C = Contract" })
    tenantType!: "R" | "C";

    @Column({ type: "text", nullable: true, comment: "Base64 encoded image" })
    profileImage?: string;

    @Column({ type: "timestamp", nullable: true })
    reservationStartDate?: Date;

    @Column({ type: "timestamp", nullable: true })
    reservationEndDate?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

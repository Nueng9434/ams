import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Building } from './building.entity';
import { Tenant } from './tenant.entity';
import { RoomAdditionalService } from './additional-service.entity';
import { FinancialTransaction } from './financial-transaction.entity';
import { Utility } from './utility.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Building, building => building.rooms)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @Column()
  floorNumber: number;

  @Column({ length: 10 })
  roomNumber: string;

  @Column({ 
    type: 'enum', 
    enum: ['vacant', 'booked', 'occupied'], 
    default: 'vacant' 
  })
  status: string;

  @ManyToOne(() => Tenant, tenant => tenant.currentRooms, { nullable: true })
  @JoinColumn({ name: 'current_tenant_id' })
  currentTenant: Tenant;

  @ManyToOne(() => Tenant, tenant => tenant.bookedRooms, { nullable: true })
  @JoinColumn({ name: 'booked_tenant_id' })
  bookedTenant: Tenant;

  @Column({ type: 'date', nullable: true })
  bookingStartDate: Date;

  @Column({ type: 'date', nullable: true })
  bookingEndDate: Date;

  @Column({ nullable: true })
  contractFilePath: string;

  @OneToMany(() => RoomAdditionalService, service => service.room)
  additionalServices: RoomAdditionalService[];

  @OneToMany(() => FinancialTransaction, transaction => transaction.room)
  transactions: FinancialTransaction[];

  @OneToMany(() => Utility, utility => utility.room)
  utilities: Utility[];
}

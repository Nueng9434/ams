import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany 
} from 'typeorm';
import { Room } from './room.entity';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  roomNumber: string;

  @Column({ length: 10 })
  buildingName: string;

  @Column({ type: 'text', nullable: true })
  tenants: string;

  @Column({ 
    type: 'enum', 
    enum: ['available', 'occupied', 'maintenance'], 
    default: 'available' 
  })
  status: string;

  @Column({ default: 0 })
  airConditioningRooms: number;

  @Column({ default: 0 })
  fanRooms: number;

  @OneToMany(() => Room, room => room.building)
  rooms: Room[];
}

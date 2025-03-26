import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Room } from './room.entity';

@Entity('utilities')
export class Utility {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, room => room.utilities)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  previousWaterReading: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  currentWaterReading: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  waterCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  previousElectricityReading: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  currentElectricityReading: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  electricityCost: number;
}

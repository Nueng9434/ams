import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Room } from './room.entity';

@Entity('additional_services')
export class AdditionalService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  serviceName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  servicePrice: number;

  @OneToMany(() => RoomAdditionalService, roomService => roomService.service)
  roomServices: RoomAdditionalService[];
}

@Entity('room_additional_services')
export class RoomAdditionalService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, room => room.additionalServices)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => AdditionalService, service => service.roomServices)
  @JoinColumn({ name: 'service_id' })
  service: AdditionalService;
}

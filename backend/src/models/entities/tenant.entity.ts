import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany 
} from 'typeorm';
import { Room } from './room.entity';
import { FinancialTransaction } from './financial-transaction.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'enum', 
    enum: ['mr', 'mrs', 'miss', 'other'], 
    nullable: true 
  })
  prefix: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  profileImagePath: string;

  @OneToMany(() => Room, room => room.currentTenant)
  currentRooms: Room[];

  @OneToMany(() => Room, room => room.bookedTenant)
  bookedRooms: Room[];

  @OneToMany(() => FinancialTransaction, transaction => transaction.tenant)
  transactions: FinancialTransaction[];
}

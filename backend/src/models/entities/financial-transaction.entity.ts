import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Room } from './room.entity';
import { Tenant } from './tenant.entity';

@Entity('financial_transactions')
export class FinancialTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, room => room.transactions)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Tenant, tenant => tenant.transactions)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ 
    type: 'enum', 
    enum: ['rent', 'booking', 'additional_service'] 
  })
  transactionType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;

  @Column({ 
    type: 'enum', 
    enum: ['cash', 'other'], 
    default: 'cash' 
  })
  paymentMethod: string;

  @Column({ length: 50, unique: true })
  invoiceNumber: string;

  @Column({ nullable: true })
  receiptFilePath: string;
}

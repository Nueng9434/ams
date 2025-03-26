import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity('employee_roles')
export class EmployeeRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  roleName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Employee, employee => employee.role)
  employees: Employee[];
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @ManyToOne(() => EmployeeRole, role => role.employees)
  @JoinColumn({ name: 'role_id' })
  role: EmployeeRole;
}

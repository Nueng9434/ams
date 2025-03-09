import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { UserSession } from './user-session.model';
import bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'employee'],
    default: 'employee'
  })
  role!: 'admin' | 'employee';

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserSession, session => session.user)
  sessions!: UserSession[];

  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Repository methods
  static async findByUsername(username: string): Promise<User | null> {
    return this.findOne({ where: { username } });
  }

  static async findById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData) as User;
    await user.hashPassword();
    await user.save();
    return user;
  }

  static async listUsers(): Promise<User[]> {
    return this.find({
      select: ['id', 'username', 'name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt']
    });
  }
}

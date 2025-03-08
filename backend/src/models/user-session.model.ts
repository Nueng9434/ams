import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';

@Entity('user_sessions')
export class UserSession {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @Column({ name: 'login_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    loginTime: Date = new Date();

    @Column({ name: 'logout_time', type: 'timestamp', nullable: true })
    logoutTime: Date | null = null;

    @Column({ name: 'ip_address', length: 45 })
    ipAddress!: string;

    @Column({ name: 'user_agent', length: 255 })
    userAgent!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    // Helper method to create a new session
    static create(data: {
        userId: number;
        ipAddress: string;
        userAgent: string;
    }): UserSession {
        const session = new UserSession();
        session.userId = data.userId;
        session.ipAddress = data.ipAddress;
        session.userAgent = data.userAgent;
        return session;
    }

    // Helper method to end the session
    endSession(): void {
        this.logoutTime = new Date();
    }
}

import { Request, Response } from 'express';
import { UserSession } from '../models/user-session.model';
import { User } from '../models/user.model';
import { AppDataSource } from '../config/database';

export class SessionController {
    getAllSessions = async (req: Request, res: Response) => {
        try {
            const sessionRepository = AppDataSource.getRepository(UserSession);
            const query = sessionRepository
                .createQueryBuilder('session')
                .leftJoinAndSelect('session.user', 'user')
                .select([
                    'session.id',
                    'session.loginTime',
                    'session.logoutTime',
                    'session.ipAddress',
                    'session.userAgent',
                    'session.createdAt',
                    'user.id',
                    'user.username',
                    'user.email',
                    'user.role'
                ])
                .orderBy('session.loginTime', 'DESC');

            // Date range filtering
            const { startDate, endDate } = req.query;
            if (startDate) {
                query.andWhere('session.loginTime >= :startDate', { startDate });
            }
            if (endDate) {
                query.andWhere('session.loginTime <= :endDate', { endDate });
            }

            const sessions = await query.getMany();
            
            // Calculate duration for each session
            const sessionsWithDuration = sessions.map(session => {
                const duration = session.logoutTime 
                    ? Math.floor((new Date(session.logoutTime).getTime() - new Date(session.loginTime).getTime()) / 1000)
                    : null;
                
                return {
                    ...session,
                    duration: duration ? duration : 'Active'
                };
            });

            res.json(sessionsWithDuration);
        } catch (error) {
            console.error('Error fetching sessions:', {
                error: error instanceof Error ? {
                    message: error.message,
                    stack: error.stack
                } : error
            });
            res.status(500).json({ 
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }
}

import { User } from '../models/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}

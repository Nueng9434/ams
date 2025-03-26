import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/entities/user.entity';
import { AppDataSource } from '../config/database';

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  /**
   * Register a new user
   */
  public async register(userData: Partial<User>): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findOne({
        where: { username: userData.username }
      });

      if (existingUser) {
        throw new Error('Username already exists');
      }

      // Hash password
      if (!userData.password) {
        throw new Error('Password is required');
      }
      
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      // Create new user
      const user = userRepository.create(userData);
      await userRepository.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login a user
   */
  public async login(username: string, password: string): Promise<{ user: Partial<User>, token: string }> {
    try {
      // Find user
      const user = await userRepository.findOne({
        where: { username }
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account has been deactivated');
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Create token
      const token = this.generateToken(user);

      // Return user (without password) and token
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate JWT token
   */
  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const options: jwt.SignOptions = { expiresIn: '1d' };

    return jwt.sign(payload, secret, options);
  }

  /**
   * Verify JWT token
   */
  public verifyToken(token: string): any {
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export default new AuthService();

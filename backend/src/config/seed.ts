import { User } from '../models/user.model';
import { initializeDatabase } from './database';

const seedDatabase = async () => {
  try {
    await initializeDatabase();

    // Check if admin user exists
    const existingAdmin = await User.findByUsername('admin');
    if (!existingAdmin) {
      // Create admin user
      await User.createUser({
        username: 'admin',
        password: 'password',
        name: 'Administrator',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true
      });
      console.log('Admin user created successfully');
    }

    // Create demo employee if doesn't exist
    const existingEmployee = await User.findByUsername('employee1');
    if (!existingEmployee) {
      await User.createUser({
        username: 'employee1',
        password: 'password123',
        name: 'John Employee',
        email: 'john@example.com',
        role: 'employee',
        isActive: true
      });
      console.log('Demo employee created successfully');
    }

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

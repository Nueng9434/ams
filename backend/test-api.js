/**
 * Simple script to test the API routes registration
 * Run with: node test-api.js
 */

const express = require('express');
const app = express();

// Mock the auth routes - just to test the route registration
const router = express.Router();
router.post('/login', (req, res) => {
  res.json({ message: 'Login route works!' });
});
router.post('/register', (req, res) => {
  res.json({ message: 'Register route works!' });
});
router.get('/me', (req, res) => {
  res.json({ message: 'Get current user route works!' });
});

// Register the routes
app.use('/api/auth', router);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`- POST http://localhost:${PORT}/api/auth/login`);
  console.log(`- POST http://localhost:${PORT}/api/auth/register`);
  console.log(`- GET http://localhost:${PORT}/api/auth/me`);
  console.log('\nPress Ctrl+C to stop');
});

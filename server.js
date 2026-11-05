
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { pool, initializeDatabase } = require('./db');

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  })
);

app.use(express.json({ limit: '10kb' }));

// Check that the backend is running.
app.get('/', (req, res) => {
  res.json({ message: 'AI Workflow API is running.' });
});

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (
      typeof name !== 'string' ||
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Please provide all registration fields.',
      });
    }

    const cleanName = name.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
      !cleanName ||
      cleanName.length > 100 ||
      !/^[a-zA-Z0-9_]{3,50}$/.test(cleanUsername) ||
      cleanEmail.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      password.length < 8 ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      return res.status(400).json({
        message:
          'Check your details. Username must be 3–50 letters, numbers or underscores; password must be 8–72 bytes.',
      });
    }

    // Check for an existing username or email.
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [cleanUsername, cleanEmail]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: 'Username or email is already registered.',
      });
    }

    // Never store the plain-text password.
    const passwordHash = await bcrypt.hash(password, 12);

    // Store the new user in MySQL.
    await pool.execute(
      `INSERT INTO users
        (name, username, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [cleanName, cleanUsername, cleanEmail, passwordHash]
    );

    return res.status(201).json({
      message: 'Registration successful. Please log in.',
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'Username or email is already registered.',
      });
    }

    console.error('Registration error:', error.message);

    return res.status(500).json({
      message: 'Server error during registration.',
    });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Enter your username and password.',
      });
    }

    const [users] = await pool.execute(
      `SELECT id, name, username, email, password_hash
       FROM users
       WHERE username = ?`,
      [username.trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: 'Invalid username or password.',
      });
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid username or password.',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured.');
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);

    return res.status(500).json({
      message: 'Server error during login.',
    });
  }
});

// AUTHENTICATION MIDDLEWARE
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      message: 'Please log in to continue.',
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: 'Authentication is not configured.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({
        message: 'Session expired. Please log in again.',
      });
    }

    req.userId = payload.id;
    next();
  });
}

// GET LOGGED-IN USER PROFILE
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      `SELECT id, name, username, email, created_at
       FROM users
       WHERE id = ?`,
      [req.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    return res.json({ user: users[0] });
  } catch (error) {
    console.error('Profile error:', error.message);

    return res.status(500).json({
      message: 'Unable to load profile.',
    });
  }
});

// Create the table before accepting requests.
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
  console.error('Database initialization failed:');
  console.error(error);
  process.exit(1);
}
}

startServer();

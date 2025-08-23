---
title: "Building Scalable Backend APIs with Node.js and Express"
date: "2024-01-10"
tags: ["Node.js", "Express", "Backend", "API", "JavaScript"]
excerpt: "Learn how to build robust and scalable backend APIs using Node.js and Express.js with best practices and security considerations."
image: 'https://rjryt.github.io/images/projects/ncrp.png'
featured: true
---

# Building Scalable Backend APIs with Node.js and Express

Node.js has become the go-to choice for building scalable backend services. Combined with Express.js, it provides a powerful platform for creating robust APIs that can handle thousands of concurrent connections.

## Why Choose Node.js for Backend Development?

1. **JavaScript Everywhere**: Use the same language for both frontend and backend
2. **Non-blocking I/O**: Excellent performance for I/O-intensive applications
3. **Rich Ecosystem**: NPM provides access to hundreds of thousands of packages
4. **Real-time Applications**: Perfect for chat apps, gaming, and live updates

## Setting Up Your Express Server

Start by creating a new Node.js project:

```bash
mkdir my-api
cd my-api
npm init -y
npm install express cors helmet morgan dotenv
```

Create your basic server:

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Database Integration with MongoDB

Connect to MongoDB using Mongoose:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

## Building RESTful Routes

Create a complete CRUD API:

```javascript
// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Authentication with JWT

Implement JWT-based authentication:

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
```

## Error Handling and Validation

Implement proper error handling:

```javascript
// Validation middleware
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      error: 'Name, email, and password are required' 
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ 
      error: 'Password must be at least 6 characters' 
    });
  }
  
  next();
};

// Global error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});
```

## Best Practices

1. **Environment Variables**: Store sensitive data in `.env` files
2. **Rate Limiting**: Prevent abuse with `express-rate-limit`
3. **Data Validation**: Use libraries like Joi or express-validator
4. **Logging**: Implement proper logging with Winston
5. **Testing**: Write unit and integration tests
6. **Documentation**: Use tools like Swagger for API documentation

## Conclusion

Building scalable APIs with Node.js and Express requires careful consideration of architecture, security, and performance. Start with a solid foundation and gradually add complexity as your application grows.

Remember to always validate input, handle errors gracefully, and keep security as a top priority throughout development.
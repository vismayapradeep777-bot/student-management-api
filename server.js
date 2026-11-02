const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Built-in and Third-Party Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder (useful for browser debugging demo)
app.use(express.static(path.join(__dirname, 'public')));

// Root / Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Student Management System API',
    endpoints: {
      getAllStudents: 'GET /api/students',
      createStudent: 'POST /api/students',
      getStudentById: 'GET /api/students/:id',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
      browserDebugDemo: 'GET /debug-demo.html',
    },
    version: '1.0.0',
    status: 'Server is running smoothly',
  });
});

// Mount Student Routes
app.use('/api/students', require('./routes/studentRoutes'));

// 404 Handler for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`👉 Test the server in your browser: http://localhost:${PORT}`);
});

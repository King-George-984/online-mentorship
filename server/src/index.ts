require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Initialize Express app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON parsing

// Load environment variables
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
});

// Route registration
app.use('/auth', require('./routes/auth'));
app.use('/mentors', require('./routes/mentors'));
app.use('/mentees', require('./routes/mentees'));
app.use('/matches', require('./routes/matches'));
app.use('/sessions', require('./routes/sessions'));
app.use('/progress', require('./routes/progress'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

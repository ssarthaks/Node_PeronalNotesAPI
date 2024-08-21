const express = require('express');
const notesRouter = require('./routes/notes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/notes', notesRouter);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;

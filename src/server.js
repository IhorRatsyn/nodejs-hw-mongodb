// src/server.js

const express = require('express');
const cors = require('cors');
const pino = require('pino');
const contactsRouter = require('./routes/contacts');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Реєстрація роута для контактів
  app.use('/contacts', contactsRouter);

  // Обробка неіснуючих роутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
}

module.exports = setupServer;

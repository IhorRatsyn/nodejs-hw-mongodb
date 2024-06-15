const express = require('express');
const cors = require('cors');
const pino = require('pino');
const contactsRouter = require('./routers/contacts');
const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFoundHandler');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.get('/', (req, res) => {
    res.send('MAIN PAGE');
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler); // Middleware для обробки неіснуючих маршрутів
  app.use(errorHandler); // Middleware для обробки помилок

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
}

module.exports = setupServer;

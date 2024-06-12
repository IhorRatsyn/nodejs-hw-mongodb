require('dotenv').config();
const express = require('express');
const initMongoConnection = require('./db/initMongoConnection');

const startServer = async () => {
  await initMongoConnection();

  const app = express();

  app.use(express.json());

  app.get('/contacts', require('./routes/contacts'));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

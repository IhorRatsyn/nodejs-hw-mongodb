const mongoose = require('mongoose');
require('dotenv').config();

const initMongoConnection = async () => {
  const connectionString = process.env.MONGODB_URL;

  if (!connectionString) {
    console.error(
      'MongoDB connection string is missing in environment variables.'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = initMongoConnection;

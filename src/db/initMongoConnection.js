const mongoose = require('mongoose');
require('dotenv').config();

const initMongoConnection = async () => {
  const connectionString = process.env.MONGODB_URL;
  const databaseName = process.env.MONGODB_DB;

  if (!connectionString || !databaseName) {
    console.error(
      'MongoDB connection string or database name is missing in environment variables.'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(`${connectionString}/${databaseName}`);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = initMongoConnection;

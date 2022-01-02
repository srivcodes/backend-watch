const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const dbConnection = await mongoose.connect(
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_MONGO_URI
        : process.env.DEV_MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    );
    console.log(
      `MongoDB is connected successfully: ${dbConnection.connection.host}`
    );
  } catch (err) {
    console.error('Mongoose connection failed', err);
  }
};

module.exports = dbConnection;

const mongoose = require('mongoose');


// MONGODB_URI="add your mongodb atlas url"

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

module.exports = connectDb;

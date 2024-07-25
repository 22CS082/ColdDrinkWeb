const mongoose = require('mongoose');


MONGODB_URI="mongodb+srv://suvariyayashvi77:TRnQ6oKzY6IDmRxG@cluster0.80cxpxt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
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

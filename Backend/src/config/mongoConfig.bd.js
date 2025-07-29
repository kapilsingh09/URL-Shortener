import mongoose from "mongoose";

// MongoDB URL
const MONGO_URI = 'mongodb://localhost:27017/urlshort';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, //  5s if no server found
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:');
    console.error(`Message: ${error.message}`);
    

    if (error.name === 'MongoNetworkError') {
      console.error('Check if MongoDB is running and accessible.');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('Unable to connect to any servers in your MongoDB Atlas cluster.');
    } else if (error.name === 'MongoParseError') {
      console.error('Check your MongoDB URI format.');
    }

    process.exit(1); // Exit process with failure
  }
};

// Catch unhandled promise rejections globally
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

export default connectDB;

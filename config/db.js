const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas cluster
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Please make sure:');
    console.error('   1. You set MONGO_URI in your .env file');
    console.error('   2. Your database password is correct');
    console.error('   3. IP Address 0.0.0.0/0 is allowed in MongoDB Atlas Network Access');
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

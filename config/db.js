const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas cluster
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
      console.log('⚠️  MongoDB Notice: Placeholder MONGO_URI detected in .env.');
      console.log('👉 Complete your free MongoDB Atlas setup and update MONGO_URI to connect your database.');
      return;
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Troubleshooting Checklist:');
    console.error('   1. Check that your MongoDB Atlas username and password in .env are correct.');
    console.error('   2. In MongoDB Atlas -> Network Access, ensure IP Address 0.0.0.0/0 (Allow from Anywhere) is enabled.');
    console.error('   3. Check that your cluster is active and not paused.');
  }
};

module.exports = connectDB;


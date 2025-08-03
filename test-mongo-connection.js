const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI || 'NOT SET');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log('Database name:', mongoose.connection.db.databaseName);
    console.log('Connection state:', mongoose.connection.readyState);
    
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  }
}

testConnection(); 
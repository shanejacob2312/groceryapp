#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Grocery Store Deployment Setup');
console.log('=====================================\n');

// Check if we're in the right directory
if (!fs.existsSync('server') || !fs.existsSync('client')) {
  console.error('❌ Error: Please run this script from the project root directory');
  process.exit(1);
}

// Check server files
console.log('📋 Checking server configuration...');
const serverFiles = [
  'server/package.json',
  'server/index.js',
  'server/railway.json',
  'server/seed-products.js'
];

serverFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
  }
});

// Check client files
console.log('\n📋 Checking client configuration...');
const clientFiles = [
  'client/package.json',
  'client/netlify.toml',
  'client/src/services/api.js'
];

clientFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
  }
});

// Check for .env files
console.log('\n📋 Checking environment files...');
const envFiles = [
  'server/.env',
  'client/.env.local',
  'client/.env.production'
];

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`⚠️  ${file} - Not found (will be set in deployment)`);
  }
});

// Generate deployment checklist
console.log('\n📝 Deployment Checklist:');
console.log('========================');

console.log('\n🔧 Backend (Railway):');
console.log('1. Create MongoDB Atlas cluster');
console.log('2. Get connection string');
console.log('3. Deploy to Railway:');
console.log('   - Connect GitHub repo');
console.log('   - Select server directory');
console.log('   - Set environment variables:');
console.log('     * MONGODB_URI');
console.log('     * JWT_SECRET');
console.log('     * CLIENT_URL (after Netlify deployment)');
console.log('     * NODE_ENV=production');
console.log('4. Get Railway URL');
console.log('5. Seed database: railway run node seed-products.js');
console.log('6. Create admin user: railway run node create-admin-user.js');

console.log('\n🌐 Frontend (Netlify):');
console.log('1. Update REACT_APP_API_URL in client/src/services/api.js');
console.log('2. Deploy to Netlify:');
console.log('   - Connect GitHub repo');
console.log('   - Set base directory: client');
console.log('   - Set build command: npm run build');
console.log('   - Set publish directory: build');
console.log('3. Set environment variable: REACT_APP_API_URL');
console.log('4. Get Netlify URL');

console.log('\n🔄 Final Steps:');
console.log('1. Update CLIENT_URL in Railway with Netlify URL');
console.log('2. Test the application');
console.log('3. Test admin login (admin@grocerystore.com / admin123)');

console.log('\n📚 Useful Commands:');
console.log('====================');
console.log('# Check Railway logs');
console.log('railway logs');
console.log('');
console.log('# Test API health');
console.log('curl https://your-railway-app.railway.app/api/health');
console.log('');
console.log('# Seed database');
console.log('railway run node seed-products.js');
console.log('');
console.log('# Create admin user');
console.log('railway run node create-admin-user.js');

console.log('\n🔗 Useful Links:');
console.log('================');
console.log('Railway Dashboard: https://railway.app/dashboard');
console.log('Netlify Dashboard: https://app.netlify.com');
console.log('MongoDB Atlas: https://cloud.mongodb.com');
console.log('Deployment Guide: DEPLOYMENT.md');

console.log('\n✅ Setup check complete!');
console.log('Follow the checklist above to deploy your application.'); 
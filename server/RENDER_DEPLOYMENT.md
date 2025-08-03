# Render Deployment Guide

## Prerequisites
1. A Render account (sign up at https://render.com)
2. Your code pushed to a GitHub repository
3. A MongoDB database (you can use MongoDB Atlas for free)

## Deployment Steps

### 1. Connect Your Repository
1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub account and select your repository
4. Choose the `server` directory as the root directory

### 2. Configure the Service
- **Name**: `grocery-delivery-api` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### 3. Environment Variables
Set these environment variables in your Render service:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grocery-app
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://your-frontend-domain.com
```

### 4. MongoDB Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `username`, `password`, and `cluster` in the MONGODB_URI

### 5. JWT Secret
Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 6. Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Your API will be available at: `https://your-service-name.onrender.com`

## API Endpoints
Your deployed API will have these endpoints:
- Health check: `GET /api/health`
- Auth: `POST /api/auth/login`, `POST /api/auth/register`
- Products: `GET /api/products`, `POST /api/products`
- Orders: `GET /api/orders`, `POST /api/orders`
- Users: `GET /api/users`

## Important Notes
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- Environment variables marked as `sync: false` in render.yaml need to be set manually
- Update your frontend's API base URL to point to your Render service

## Troubleshooting
- Check the logs in your Render dashboard for any errors
- Ensure all environment variables are set correctly
- Verify your MongoDB connection string is correct
- Make sure your JWT_SECRET is at least 32 characters long 
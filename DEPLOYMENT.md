# Deployment Guide

This guide will help you deploy the Grocery Store application to Railway (backend) and Netlify (frontend).

## Prerequisites

- GitHub account
- Railway account (https://railway.app)
- Netlify account (https://netlify.com)
- MongoDB Atlas account (https://mongodb.com/atlas)

## Backend Deployment (Railway)

### Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Get your connection string
4. Add your IP address to the whitelist (or use 0.0.0.0/0 for Railway)

### Step 2: Deploy to Railway

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect Railway to GitHub**:
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `server` directory as the source

3. **Configure Environment Variables**:
   In Railway dashboard, go to your project → Variables tab and add:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grocery-app
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL=https://your-netlify-app.netlify.app
   NODE_ENV=production
   ```

4. **Deploy**:
   - Railway will automatically detect the Node.js app
   - It will use the `railway.json` configuration
   - The health check endpoint `/api/health` will be used

5. **Get your Railway URL**:
   - After deployment, Railway will provide a URL like: `https://your-app-name.railway.app`
   - Note this URL for the frontend configuration

## Frontend Deployment (Netlify)

### Step 1: Update API Configuration

1. **Update the API base URL** in `client/src/services/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL || 'https://your-railway-app.railway.app',
     timeout: 10000,
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

2. **Create environment file** `client/.env.production`:
   ```
   REACT_APP_API_URL=https://your-railway-app.railway.app
   ```

### Step 2: Deploy to Netlify

1. **Push updated code to GitHub**:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```

2. **Connect Netlify to GitHub**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - **Base directory**: `client`
     - **Build command**: `npm run build`
     - **Publish directory**: `build`

3. **Set Environment Variables**:
   In Netlify dashboard, go to Site settings → Environment variables:
   ```
   REACT_APP_API_URL=https://your-railway-app.railway.app
   ```

4. **Deploy**:
   - Netlify will automatically build and deploy your site
   - The `netlify.toml` file will handle redirects for React Router

## Post-Deployment Setup

### Step 1: Seed the Database

After Railway deployment, you need to seed the database with products:

1. **Option A: Use Railway CLI**:
   ```bash
   npm install -g @railway/cli
   railway login
   railway link
   railway run node seed-products.js
   ```

2. **Option B: Use Railway Dashboard**:
   - Go to your Railway project
   - Click on your service
   - Go to "Deployments" tab
   - Click "Deploy" and it will run the seed script

### Step 2: Create Admin User

Create an admin user for the admin dashboard:

1. **Option A: Use Railway CLI**:
   ```bash
   railway run node create-admin-user.js
   ```

2. **Option B: Use Railway Dashboard**:
   - Same process as seeding products

### Step 3: Test the Application

1. **Test Backend**:
   - Visit: `https://your-railway-app.railway.app/api/health`
   - Should return: `{"status":"OK","message":"Grocery Delivery API is running"}`

2. **Test Frontend**:
   - Visit your Netlify URL
   - Test user registration/login
   - Test admin login (admin@grocerystore.com / admin123)
   - Test product browsing and ordering

## Environment Variables Reference

### Backend (Railway)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grocery-app
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://your-netlify-app.netlify.app
NODE_ENV=production
PORT=5000 (auto-set by Railway)
```

### Frontend (Netlify)
```
REACT_APP_API_URL=https://your-railway-app.railway.app
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `CLIENT_URL` in Railway matches your Netlify URL exactly
   - Check that the URL includes `https://` protocol

2. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Build Failures**:
   - Check Railway logs for Node.js version issues
   - Verify all dependencies are in `package.json`
   - Check for syntax errors in code

4. **React Router Issues**:
   - The `netlify.toml` file should handle redirects
   - If not working, add redirect rules in Netlify dashboard

### Useful Commands

```bash
# Check Railway logs
railway logs

# Check Netlify build logs
# (Available in Netlify dashboard)

# Test API locally
curl https://your-railway-app.railway.app/api/health

# Check environment variables
railway variables
```

## Security Considerations

1. **JWT Secret**: Use a strong, random string for JWT_SECRET
2. **MongoDB**: Use strong passwords and limit IP access
3. **Environment Variables**: Never commit secrets to Git
4. **HTTPS**: Both Railway and Netlify provide HTTPS by default

## Monitoring

- **Railway**: Monitor logs and resource usage in Railway dashboard
- **Netlify**: Check build logs and form submissions in Netlify dashboard
- **MongoDB Atlas**: Monitor database performance and connections

## Cost Optimization

- **Railway**: Free tier includes 500 hours/month
- **Netlify**: Free tier includes 100GB bandwidth/month
- **MongoDB Atlas**: Free tier includes 512MB storage

## Support

- Railway Documentation: https://docs.railway.app
- Netlify Documentation: https://docs.netlify.com
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com 
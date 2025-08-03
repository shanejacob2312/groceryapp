#!/bin/bash

echo "🚀 Grocery Store Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch. Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    git status --short
    read -p "Commit changes before deployment? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_message
        git add .
        git commit -m "$commit_message"
    fi
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "🔧 Backend Deployment (Railway):"
echo "1. Go to https://railway.app/dashboard"
echo "2. Create new project from GitHub"
echo "3. Select your repository"
echo "4. Set root directory to 'server'"
echo "5. Add environment variables:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - NODE_ENV=production"
echo "6. Deploy and get your Railway URL"
echo ""
echo "🌐 Frontend Deployment (Netlify):"
echo "1. Go to https://app.netlify.com"
echo "2. Create new site from GitHub"
echo "3. Select your repository"
echo "4. Set build settings:"
echo "   - Base directory: client"
echo "   - Build command: npm run build"
echo "   - Publish directory: build"
echo "5. Add environment variable:"
echo "   - REACT_APP_API_URL (your Railway URL)"
echo ""
echo "🔄 After both deployments:"
echo "1. Update CLIENT_URL in Railway with your Netlify URL"
echo "2. Seed the database: railway run node seed-products.js"
echo "3. Create admin user: railway run node create-admin-user.js"
echo "4. Test your application!"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md" 
to login as admin:
admin@grocerystore.com
admin123

# Grocery Store Application

A full-stack grocery delivery application built with React (frontend) and Node.js/Express (backend).

## Features

### Customer Features
- Browse products by category
- Search products
- Add items to cart
- Place orders with delivery information
- Track order status
- User authentication and profile management

### Admin Features
- Admin dashboard with statistics
- Manage products (add, edit, delete)
- Manage orders (view, update status)
- Manage users
- View sales analytics

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Icons
- React Query for data fetching

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation
- CORS for cross-origin requests

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd groceryapp
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   
   Create `server/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/grocery-app
   JWT_SECRET=your-secret-key
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   # Start backend (from server directory)
   cd server
   npm start
   
   # Start frontend (from client directory)
   cd client
   npm start
   ```

5. **Seed the database**
   ```bash
   cd server
   node seed-products.js
   node create-admin-user.js
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Deployment

### Quick Deployment

1. **Run the deployment setup**
   ```bash
   node deploy-setup.js
   ```

2. **Push to GitHub**
   ```bash
   # On Windows
   deploy.bat
   
   # On Linux/Mac
   ./deploy.sh
   ```

3. **Deploy to Railway (Backend)**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Create new project from GitHub
   - Select `server` directory
   - Add environment variables (see DEPLOYMENT.md)

4. **Deploy to Netlify (Frontend)**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Create new site from GitHub
   - Set base directory to `client`
   - Add environment variables (see DEPLOYMENT.md)

### Detailed Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get product categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Admin (Protected)
- `GET /api/products/admin/all` - Get all products (admin)
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)
- `GET /api/users/admin/all` - Get all users (admin)

## Environment Variables

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (auto-set by Railway)

### Frontend
- `REACT_APP_API_URL` - Backend API URL

## Admin Access

Default admin credentials:
- Email: `admin@grocerystore.com`
- Password: `admin123`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md) or check the troubleshooting section. 
